import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Import from '../pages/Import';
import Dashboard from '../pages/Dashboard';

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


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientID: this.props.id,
    };
  }

  // This imports local CSV seed data for development, beta release will need to get csv from the Import.js component
  componentDidMount() {
    console.log(`======================= Home.js =======================`);
    // await this.setState({ clientID: this.props.id });
    console.log(`ID is set to ${this.state.clientID}`);
  }

  render() {
    const { classes, id } = this.props;
    return <div className={classes.root}>
                { id ? 
                    <Dashboard 
                    id={id} 
                    /> 
                : 
                    <Import
                    id={id} 
                    /> 
                }
            </div>
  }
};

// Timestamp;Map;PlayersNumber;TeamComposition;EnemyComposition;Duration;Victory;KillingBlows;Damage;Healing;Honor;RatingChange;MMR;EnemyMMR;Specialization;isRated

export default withStyles(styles)(Home);