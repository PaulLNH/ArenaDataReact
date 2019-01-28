import React from 'react';
import PropTypes from 'prop-types';
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
    marginTop: "0",
    overflowX: 'none',
  },
  table: {
    // minWidth: 500,
    align: 'center',
    justifyContent: 'center',
  },
});


function personalStats(props) {
  const { classes } = props;
  const { match } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead fontWeight="bold">
          <TableRow>
            <TableCell>Spec</TableCell>
            <TableCell align="right">Damage</TableCell>
            <TableCell align="right">Healing</TableCell>
            <TableCell align="right">Killing Blows</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow key={match.Timestamp}>
              <TableCell component="th" scope="row">
                {match.Specialization}
              </TableCell>
              <TableCell align="right">{match.Damage}</TableCell>
              <TableCell align="right">{match.Healing}</TableCell>
              <TableCell align="right">{match.KillingBlows}</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}

// Timestamp;Map;;TeamComposition;EnemyComposition;Duration;Victory
// PlayersNumber;KillingBlows;Damage;Healing;Honor;RatingChange;MMR;EnemyMMR;Specialization;isRated

personalStats.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(personalStats);