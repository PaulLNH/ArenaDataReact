import React from 'react';
import {
  Typography,
  withStyles,
} from '@material-ui/core';
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
  });

  const UUID = "ddeb27fb-d9a0-4624-be4d-4615062daed4";
  



class Import extends React.Component {
    constructor(props) {
        super(props);
        this.handleImport = this.handleImport.bind(this);
        this.state = {
            multiline: '',
            clientID: '',
            csvData: '',
            jsonData: [],
        };
    }
    // state = {
    //     multiline: '',
    //     clientID: '',
    //     csvData: '',
    //     jsonData: [],
    //   };

    componentDidMount() {
        // if (!localStorage.getItem("clientID").length) {
        //     localStorage.setItem(UUID, JSON.stringify(this.state.clientID));
        // } else {
        //     const clientID = JSON.parse( localStorage.getItem( "clientID " ) );
        //     this.setState( { clientID } );
        // }
    };

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };

      // Import CSV
    putDataToDB = message => {
        let currentIds = this.state.data.map(data => data.id);
        let idToBeAdded = 0;
        while (currentIds.includes(idToBeAdded)) {
            ++idToBeAdded;
        }

        axios.post("http://localhost:3001/api/putData", {
        id: idToBeAdded,
        message: message
        });
    };


    handleImport(formEvent) {
        formEvent.preventDefault();
        console.log(this.state.multiline);
        // const csv = formEvent.target.elements.csv.value.trim();
        // console.log(csv);
        // this.setState(() => ({ csv }));
    }

    render() {
        const { classes } = this.props;
        // const { value } = this.state;
    
        return (
            <div className={classes.root}>
                <Typography variant="display1" className={classes.title}>
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
                                <ListItemText
                                primary="Step 1" component="a" href="https://www.google.com"
                                secondary={'Install the REFlex - Arena/Battleground Historian addon from https://wow.curseforge.com'}
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
                                primary="Step 1"
                                secondary={'Click on IMPORT'}
                                />
                            </ListItem>
                            
                        </List>
                        </div>
                    </Grid>
                    <Grid item xs={false} md={1}>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <form onSubmit={this.handleImport}>
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
