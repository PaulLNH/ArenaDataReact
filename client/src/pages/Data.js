import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DivergingStacked from '../components/charts/bar/divergingStacked';
import MMRLine from '../components/charts/line/MMRLine';
import { Typography } from '@material-ui/core';
import ImportBtn from '../components/ImportBtn';
import GameStatsTable from '../components/GameStatsTable';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import ReactSpeedometer from 'react-d3-speedometer';

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
  App: {
    position: 'relative',
    height: '400px',
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100%',
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
            currentMMR: undefined,
            GameStatsTable: {
                maxMMR: undefined,
                minMMR: undefined,
                total: undefined,
                wins: undefined,
                losses: undefined,
            }
        };
    };

    async componentWillMount() {
        console.log(`======================= Data.js =======================`);
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
                console.log(`mapdata - API Response:`);
                console.log(res.data);
                if (res.data.success) {
                    let total = res.data.total;
                    let wins = res.data.wins;
                    let losses = res.data.losses;
                    this.setState(prevState => ({ 
                        GameStatsTable: {
                            ...prevState.GameStatsTable,
                            total: total,
                            wins: wins,
                            losses: losses,
                        },
                        divergingMapData: res.data, 
                        divergingMapLoading: false, 
                    }));
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
                console.log(`mmrdata - API Response:`);
                console.log(res.data);
                if (res.data.success) {
                    let games = res.data.data[0].data;
                    let currentMMR = res.data.data[0].data[res.data.data[0].data.length - 1].y;
                    let maxMMR = 0;
                    let minMMR = 0;
                    for (let i = 0; i < games.length; i++ ) {
                        if (res.data.data[0].data[i].y > maxMMR) {
                            maxMMR = res.data.data[0].data[i].y;
                        } 
                        if (res.data.data[0].data[i].y < minMMR || minMMR === 0) {
                            minMMR = res.data.data[0].data[i].y;
                        }
                    }
                    this.setState(prevState => ({ 
                        GameStatsTable: {
                            ...prevState.GameStatsTable,
                            maxMMR: maxMMR,
                            minMMR: minMMR,
                        },
                        MMRLineData: res.data, 
                        MMRLineLoading: false,
                        currentMMR: currentMMR,
                    }));
                }
        });
    };

    render() {
        const { classes, id } = this.props;

        return (
            <div>
            {id ? (
                <Grid
                    container
                    spacing={16}
                    direction="row"
                    alignItems="center"
                    justify="center"
                >
                    <div style={{ width: '100vw', display: 'flex', padding: '10px 5%'}} >


                        <Grid
                        container
                        spacing={16}
                        direction="row"
                        alignItems="center"
                        justify="center"
                        >
                            <Grid item md={2}></Grid>

                            <Grid item item xs={12} sm={12} md={3}>
                                <div style={{ margin: '0 20px'}} >
                                    <ReactSpeedometer 
                                        height={200}
                                        width={300}
                                        value={parseInt(this.state.currentMMR)}
                                        minValue={1400}
                                        maxValue={2800}
                                        segments={8}
                                        startColor={'green'}
                                        endColor={'#d43c3c'}
                                        textColor={'#ffffff'}
                                        needleTransition={"easeElastic"}
                                        needleTransitionDuration={4000}
                                    />
                                </div>

                            </Grid>
                            <Grid item item xs={12} sm={12} md={5} >
                                <GameStatsTable data={this.state.GameStatsTable} />
                            </Grid>

                            <Grid item md={2}></Grid>
                        </Grid>
                    </div>

                <div>
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

                    <div className={classes.root} >
                        {this.state.MMRLineLoading ? (
                            <div style={{position: 'relative', height: '400px', width: '600px'}} >
                                <Typography variant="h1" className={classes.chartTitle} >Loading Data...</Typography>
                                <br />
                                <CircularProgress className={classes.progress} />
                            </div>
                        )
                        : 
                            <MMRLine data={this.state.MMRLineData} />
                        }
                    </div>
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