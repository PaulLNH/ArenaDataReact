import React, { Component } from 'react';
import Moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
  });


class Home extends Component {

  constructor(props) {
    // Call super class
    super(props);

    // Bind this to function updateData (This eliminates the error)
    this.updateData = this.updateData.bind(this);
  }

  state = {
    data: [],
    loaded: false,
  };

  componentWillMount() {

    // Your parse code, but not seperated in a function
    var csvFilePath = require("../seed.csv");
    var Papa = require("papaparse/papaparse.min.js");
    Papa.parse(csvFilePath, {
      header: true,
      delimiter: ';',
      download: true,
      skipEmptyLines: true,
      // Here this is also available. So we can call our custom class method
      complete: this.updateData
    });
  }

  updateData(result) {
    const data = result.data;
    // Here this is available and we can call this.setState (since it's binded in the constructor)
    this.setState({
        data: data,
        loaded: true,
    }); // or shorter ES syntax: this.setState({ data });
  }

  render() {
    const { classes } = this.props;
    // Your render function
    return <div>
                {this.state.loaded ? 
                    <Paper className={classes.root}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                <TableCell>Time of Match</TableCell>
                                <TableCell align="right">Map</TableCell>
                                <TableCell align="right">Type</TableCell>
                                <TableCell align="right">Team</TableCell>
                                <TableCell align="right">Enemy</TableCell>
                                <TableCell align="right">Duration</TableCell>
                                <TableCell align="right">Outcome</TableCell>
                                <TableCell align="right">Kills</TableCell>
                                <TableCell align="right">Damage</TableCell>
                                <TableCell align="right">Healing</TableCell>
                                <TableCell align="right">Rating</TableCell>
                                <TableCell align="right">Your MMR</TableCell>
                                <TableCell align="right">Enemy MMR</TableCell>
                                <TableCell align="right">Spec</TableCell>
                                <TableCell align="right">Rated</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.data.map(match => (
                                <TableRow key={match.Timestamp}>
                                    <TableCell component="th" scope="row">
                                    {Moment.unix(match.Timestamp).format("HH:mm")}
                                    <br />
                                    {Moment.unix(match.Timestamp).format("ddd YYYY-MM-DD")}
                                    </TableCell>
                                    <TableCell align="right">{match.Map}</TableCell>
                                    <TableCell align="right">{match.PlayersNumber}</TableCell>
                                    <TableCell align="right">{match.TeamComposition}</TableCell>
                                    <TableCell align="right">{match.EnemyComposition}</TableCell>
                                    <TableCell align="right">{match.Duration}</TableCell>
                                    <TableCell align="right">{match.Victory}</TableCell>
                                    <TableCell align="right">{match.KillingBlows}</TableCell>
                                    <TableCell align="right">{match.Damage}</TableCell>
                                    <TableCell align="right">{match.Healing}</TableCell>
                                    <TableCell align="right">{match.RatingChange}</TableCell>
                                    <TableCell align="right">{match.MMR}</TableCell>
                                    <TableCell align="right">{match.EnemyMMR}</TableCell>
                                    <TableCell align="right">{match.Specialization}</TableCell>
                                    <TableCell align="right">{match.isRated}</TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                : 'Loading Data...'}
            </div>
  }
}

// Timestamp;Map;PlayersNumber;TeamComposition;EnemyComposition;Duration;Victory;KillingBlows;Damage;Healing;Honor;RatingChange;MMR;EnemyMMR;Specialization;isRated

export default withStyles(styles)(Home);