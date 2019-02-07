import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ReactLoading from 'react-loading';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

function CircularIndeterminate(props) {
//   const { classes } = props;
  return (
        <ReactLoading type={'spinningBubbles'} color={'#ffffff'} height={'20%'} width={'20%'} />
  );
}

CircularIndeterminate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircularIndeterminate);

// Examples of loaders used with React-Loading npm package
// const list = [
//     {
//       prop: "balls",
//       name: "Balls"
//     },
//     {
//       prop: "bars",
//       name: "Bars"
//     },
//     {
//       prop: "bubbles",
//       name: "Bubbles"
//     },
//     {
//       prop: "cubes",
//       name: "Cubes"
//     },
//     {
//       prop: "cylon",
//       name: "Cylon"
//     },
//     {
//       prop: "spin",
//       name: "Spin"
//     },
//     {
//       prop: "spinningBubbles",
//       name: "SpinningBubbles"
//     },
//     {
//       prop: "spokes",
//       name: "Spokes"
//     }
//   ];