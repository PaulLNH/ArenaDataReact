import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DivergingStacked from '../components/charts/bar/divergingStacked';
import MMRLine from '../components/charts/line/MMRLine';
import { Typography } from '@material-ui/core';
import ImportBtn from '../components/ImportBtn';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  root: {
    height: '500px',
    width: '500px',
    flexGrow: 1,
    float: 'left',
  },
  line: {
      width: '600px',
      height: '400px',
      float: 'right',
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
  progress: {
    // margin: theme.spacing.unit * 2,
    size: 40,
    left: -10,
    top: 10,
    thickness: 6,
    marginLeft: '49%',
    color: 'white',
  },
  chartTitle: {
    flex: 1,
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: "center",
  },
});

class Data extends Component {
    constructor(props) {
        super(props);
        this.getDivergingMapData = this.getDivergingMapData.bind(this);
        this.getMMRLineData = this.getMMRLineData.bind(this);
        this.state = {
            clientID: this.props.id || localStorage.getItem("clientID"),
            divergingMapData: [],
            divergingMapLoading: true,
            MMRLineData: [],
            MMRLineLoading: true,
        };
    };

    async componentWillMount() {
        this.setState({ divergingMapLoading: true });
        console.log(`======================= App.js =======================`);
        console.log(`ID is set to ${this.state.clientID}`);
        await this.getDivergingMapData(this.state.clientID);
        await this.getMMRLineData(this.state.clientID);
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
                    this.setState({ divergingMapData: res.data, divergingMapLoading: false });
                }
        });
    };

    getMMRLineData(id) {
        console.log(`Sending get request w/ id: ${id}`);
        axios.get("http://localhost:3001/api/mmrdata", {
            params: {
                id: id,
            }
            })
            .then(res => {
                console.log(res.data);
                if (res.data.success) {
                    this.setState({ MMRLineData: res.data, MMRLineLoading: false });
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
                        {this.state.divergingMapLoading ? (
                            <div style={{position: 'relative'}} >
                                <Typography variant="h1" className={classes.chartTitle} >Loading Data...</Typography>
                                <br />
                                <CircularProgress className={classes.progress} />
                            </div>
                        )
                        : 
                            <DivergingStacked data={this.state.divergingMapData} />
                        }
                        
                    </div>
                    <div className={classes.line} >
                    {this.state.MMRLineLoading ? (
                        <div style={{position: 'relative'}} >
                            <Typography variant="h1" className={classes.chartTitle} >Loading Data...</Typography>
                            <br />
                            <CircularProgress className={classes.progress} />
                        </div>
                    )
                    : 
                        <MMRLine data={this.state.MMRLineData}/>
                    }
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