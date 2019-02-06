import React from 'react';
import { withStyles } from '@material-ui/core/styles';
// import CircularProgress from '@material-ui/core/CircularProgress';
import Loading from '../components/Loading';
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
        margin: theme.spacing.unit * 2,
      },
  });

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        // this.updateData = this.updateData.bind(this);
        this.getDataFromDB = this.getDataFromDB.bind(this);
        this.state = {
            data: [],
            clientID: this.props.id,
            loading: true,
        };
    };

    async componentDidMount() {
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

    // updateData(result) {
    //     const data = result.data;
    //     this.setState({
    //         data: data,
    //         loaded: true,
    //     }); 
    // }

    render() {
    const { classes } = this.props;
    return <div className={classes.root}>
                {this.state.loading ? 
                        <Loading />
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

// return (
//     <div className={classes.root}>
//         {data === [] ? <Home /> : <Import />}
//     </div>
// );
export default withStyles(styles)(Dashboard);