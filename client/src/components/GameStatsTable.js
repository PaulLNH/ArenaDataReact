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
    maxWidth: 600,
    marginTop: theme.spacing.unit * 3,
    overflowX: 'none',
  },
});

function GameStatsTable(props) {
  const { classes } = props;
  const { total, wins, losses, maxMMR, minMMR } = props.data;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell align="center">Total Games</TableCell>
            <TableCell align="center">Wins</TableCell>
            <TableCell align="center">Losses</TableCell>
            <TableCell align="center">MMR High</TableCell>
            <TableCell align="center">MMR Low</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow key={total}>
              <TableCell align="center">{total}</TableCell>
              <TableCell align="center">{wins}</TableCell>
              <TableCell align="center">{losses}</TableCell>
              <TableCell align="center">{maxMMR}</TableCell>
              <TableCell align="center">{minMMR}</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}

GameStatsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GameStatsTable);