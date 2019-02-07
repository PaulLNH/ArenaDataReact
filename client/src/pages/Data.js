import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MapWLStackedBar from '../components/charts/bar/MapWLStackedBar';
import DivergingStacked from '../components/charts/bar/divergingStacked';
import { Typography } from '@material-ui/core';
import ImportBtn from '../components/ImportBtn';
import axios from 'axios';

const styles = theme => ({
  root: {
    height: '500px',
    width: '500px',
    flexGrow: 1,
    float: 'left',
  },
  title: {
    // flex: 1,
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    fontWeight: 'bold',
    // display: 'flex',
    // justifyContent: "center",
    marginLeft: '-22%',
  },
});

class Data extends Component {
    constructor(props) {
        super(props);
        this.getDivergingMapData = this.getDivergingMapData.bind(this);
        this.state = {
            clientID: this.props.id,
            divergingMapData: [],
        };
    };

    async componentDidMount() {
        console.log(`======================= App.js =======================`);
        console.log(`ID is set to ${this.state.clientID}`);
        await this.getDivergingMapData(this.state.clientID);
    };

    getDivergingMapData(id) {
        console.log(`Sending get request w/ id: ${id}`);
        axios.get("http://localhost:3001/api/mapdata", {
            params: {
                id: id,
            }
            })
            .then(res => {
                console.log(res.data);
                if (res.data.success) {
                    this.setState({ divergingMapData: res.data, loading: false });
                }
        });
    };

    render() {
        const { classes, id } = this.props;
        console.log(id);
        return (
            <div>
            {id ? (
                <Grid
                    container
                    spacing={0}
                    direction="row"
                    alignItems="center"
                    justify="center"
                >
                    <div className={classes.root} >
                        <DivergingStacked data={this.state.data} />
                    </div>
                    <div className={classes.root} >
                    </div>
                </Grid>

            ) :

                <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '50vh' }}
                >
                
                    <Grid item xs={3}>
                    <Typography variant="h1" className={classes.title} >No Data Loaded, please import csv...</Typography>
                    <br />
                    <ImportBtn />
                    </Grid>   
                
                </Grid> 

            }
            </div>

        );
    }
}


export default withStyles(styles)(Data);