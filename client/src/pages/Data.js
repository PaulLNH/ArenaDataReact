import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MapWLStackedBar from '../components/charts/bar/MapWLStackedBar';

const styles = theme => ({
  root: {
    height: '500px',
    width: '500px',
    flexGrow: 1,
    float: 'left',
  },
});

function Data(props) {
  const { classes } = props;
  return (
    <Grid
    container
    spacing={0}
    direction="row"
    alignItems="center"
    justify="center"
    >
        <div className={classes.root} >
            <MapWLStackedBar />
        </div>
        <div className={classes.root} >
            <MapWLStackedBar />
        </div>
    </Grid>
  );
}

Data.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Data);