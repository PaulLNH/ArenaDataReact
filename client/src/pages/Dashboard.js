import React from 'react';
import { withStyles } from '@material-ui/core';
import Home from './Home';
import Import from './Import';

const styles = {
    root: {
        flexGrow: 1,
    },
};

class Dashboard extends React.Component {
    state = {
        data: ['test'],
      };

      handleChange = data => event => {
        this.setState({
          data: event.target.value,
        });
      };

    render() {
        const { classes } = this.props;
        const { data } = this.state;
    
        return (
            <div className={classes.root}>
                {data === [] ? <Home /> : <Import />}
            </div>
        );
    }
};

export default withStyles(styles)(Dashboard);