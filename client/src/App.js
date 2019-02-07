import React, { Fragment, Component } from 'react';
import { Route } from 'react-router-dom';

import AppHeader from './components/AppHeader';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Data from './pages/Data';
import Import from './pages/Import';
import { withStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

const styles = theme => ({
    main: {
        padding: 3 * theme.spacing.unit,
        [theme.breakpoints.down('xs')]: {
            padding: 2 * theme.spacing.unit,
        },
    },
});

class App extends Component {
    state = {
        clientId: localStorage.getItem("clientID") || undefined,  
    };
    async componentWillMount() {
        console.log(`======================= App.js =======================`);
        console.log(`ID is set to ${this.state.clientId}`);
    }

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <CssBaseline />
        
                    <AppHeader id={this.state.clientId} />
                    <main className={classes.main}>
                        <Route exact path="/" render={(props) => <Home {...props} id={this.state.clientId} />} />
                        <Route exact path="/dashboard" component={Dashboard} />
                        <Route exact path="/data" render={(props) => <Data {...props} id={this.state.clientId} />} />
                        <Route exact path="/import" component={Import} />
                    </main>
        
            </Fragment>
        )
    }
};

export default withStyles(styles)(App);
