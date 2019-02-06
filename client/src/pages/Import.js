import React from 'react';
import {
  Typography,
  withStyles,
} from '@material-ui/core';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Check from '@material-ui/icons/Check';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import axios from 'axios';
import Papa from 'papaparse';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    instructions: {
        flexGrow: 1,
        borderRight: '0.1em solid black', 
        padding: '0.5em',
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
      },
    textField: {
        flexGrow: 1,
        width: "100%",
    },
    title: {
        margin: `${theme.spacing.unit * 2}px 0 ${theme.spacing.unit * 4}px`,
        justify: 'center',
      },
      links: {
          paddingLeft: "16px",
      }
  });

//   const UUID = "ddeb27fb-d9a0-4624-be4d-4615062daed4";

class Import extends React.Component {
    constructor(props) {
        super(props);
        this.handleImport = this.handleImport.bind(this);
        this.submitDataToDB = this.submitDataToDB.bind(this);
        this.parseCSV = this.parseCSV.bind(this);
        this.state = {
            multiline: '',
            clientID: undefined,
            csvData: '',
            jsonData: [],
        };
    }

    componentDidMount() {
        if (localStorage.hasOwnProperty("clientID")) {
            let clientID = localStorage.getItem("clientID");
            this.setState( { clientID } );
        }
    };

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };

    parseCSV(csv) {
        console.log(`Parsing data...`);
        console.log(csv);
        Papa.parse(csv, {
            header: true,
            delimiter: ';',
            // download: true,
            skipEmptyLines: true,
            dynamicTyping: true,
            // step: function(row) {
            //     console.log("Row:", row.data);
            //     updateDBFromCSV(id, row.data);
            // },
            complete: async (results) => {
                console.log("All done!");
                await this.setState({ jsonData: results.data });
                console.log(this.state.jsonData);
            }
          });
    };

    // Import CSV
    async submitDataToDB(dataToImport) {
        // console.log(dataToImport);
        await this.parseCSV(dataToImport);
        // console.log(`Submitting request to API: ${dataToImport}`);
        axios.put("http://localhost:3001/api/import", {
            id: this.state.clientID,
            games: this.state.jsonData,
            })
            .then(res => {
                console.log(res);
                if (this.state.clientID === undefined) {
                    console.log(`Setting clientID to: ${res.data._id}`);
                    localStorage.setItem('clientID', res.data._id);
                    this.setState({ clientID: res.data._id });
                }
            });
    };

    handleImport(formEvent) {
        formEvent.preventDefault();
        this.submitDataToDB(this.state.multiline);
    };

    render() {
        const { classes } = this.props;
    
        return (
            <div className={classes.root}>
                <Typography variant="h4" className={classes.title}>
                    How to Import your data from REFlex:
                </Typography>
                <Divider />
                <br />
                <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
                >
                    <Grid item xs={false} md={1}>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <div className={classes.demo}>
                        <List>
                            
                            <ListItem>
                                <ListItemAvatar>
                                <Avatar>
                                    <Check />
                                </Avatar>
                                </ListItemAvatar>
                                <Link
                                href="https://wow.curseforge.com/projects/reflex-battleground-historian"
                                color="inherit"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={classes.links}
                                >
                                    <ListItemText
                                    primary="Step 1" 
                                    secondary={'Install the REFlex - Arena/Battleground Historian addon from https://wow.curseforge.com'}
                                    />
                                </Link>
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemAvatar>
                                <Avatar>
                                    <Check />
                                </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                primary="Step 2"
                                secondary={'Dominate in the arena (or battlegrounds, if you\'re into that sort of thing)'}
                                />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemAvatar>
                                <Avatar>
                                    <Check />
                                </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                primary="Step 3"
                                secondary={'Click on the REFlex icon by your minimap and click on the [D] button to open the csv data'}
                                />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemAvatar>
                                <Avatar>
                                    <Check />
                                </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                primary="Step 4"
                                secondary={'Select all (control + a) and then copy to your clipboard (control + c)'}
                                />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemAvatar>
                                <Avatar>
                                    <Check />
                                </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                primary="Step 5"
                                secondary={'Come back to this window and paste (control + p) into the text box labeled "Paste CSV here"'}
                                />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemAvatar>
                                <Avatar>
                                    <Check />
                                </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                primary="Step 6"
                                secondary={'Click on IMPORT'}
                                />
                            </ListItem>
                            
                        </List>
                        </div>
                    </Grid>
                    <Grid item xs={false} md={1}>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <form  >
                            <TextField
                            id="outlined-multiline-flexible"
                            label="Paste CSV here"
                            multiline
                            name="csv"
                            rowsMax="10"
                            value={this.state.multiline}
                            onChange={this.handleChange('multiline')}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            />
                            <br />
                            <Button variant="contained" color="default" className={classes.button} onClick={this.handleImport}>
                                Import &nbsp;
                                <CloudUploadIcon className={classes.rightIcon} />
                            </Button>
                        </form>
                    </Grid>
                    <Grid item xs={false} md={1}>
                    </Grid>
                </Grid>
            </div>
            );
        }
};

export default withStyles(styles)(Import);
