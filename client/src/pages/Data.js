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
  },
});

function Data(props) {
  const { classes } = props;
  return (
    <div>
        <Typography variant="display1">Data Visualization</Typography>
        <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh', minWidth: '100vw' }}
        >
            <Grid item xs={6} sm={6} md={6} className={classes.root} >
                <MapWLStackedBar />
            </Grid>   
        </Grid>
    </div>
  );
}

Data.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Data);