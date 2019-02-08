import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
// import Loading from '../components/Loading';
import axios from 'axios';

import Match from '../components/Match';

const styles = theme => ({
    root: {
      width: '100%',
      flexGrow: 1,
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
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
      title: {
        flex: 1,
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: "center",
      },
  });

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.getDataFromDB = this.getDataFromDB.bind(this);
        this.state = {
            data: [],
            clientID: this.props.id || localStorage.getItem("clientID"),
            loading: true,
        };
    };

    async componentWillMount() {
        console.log(`======================= Dashboard.js =======================`);
        console.log(this.state.data);
        console.log(`ID is set to ${this.state.clientID}`);
        await this.getDataFromDB(this.state.clientID);
    };
    
    getDataFromDB(id) {
        console.log(`Sending get request w/ id: ${id}`);
        axios.get("http://localhost:3001/api/games", {
            params: {
                id: id,
            }
            })
            .then(res => {
                console.log(res.data.data.games);
                if (res.data.success) {
                    this.setState({ data: res.data.data.games, loading: false });
                }
        });
    };

    render() {
    const { classes } = this.props;
    return <div className={classes.root}>
                {this.state.loading ? (
                    <div style={{position: 'relative'}} >
                        <Typography variant="h1" className={classes.title} >Loading Data...</Typography>
                        <br />
                        <CircularProgress className={classes.progress} />
                    </div>
                )
                : 
                    this.state.data.map(match => (
                        <Match 
                        key={match.Timestamp} 
                        id={match.Timestamp}
                        match={match}
                        />
                    ))
                }
            </div>
    }
};

export default withStyles(styles)(Dashboard);