import React, { Component } from 'react';
import Moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Match from '../components/Match';

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
                    this.state.data.map(match => (
                        <Match 
                            key={match.Timestamp} 
                            id={match.Timestamp}
                            match={match}
                        />
                    ))
                : 'Loading Data...'}
            </div>
  }
}

// Timestamp;Map;PlayersNumber;TeamComposition;EnemyComposition;Duration;Victory;KillingBlows;Damage;Healing;Honor;RatingChange;MMR;EnemyMMR;Specialization;isRated

export default withStyles(styles)(Home);