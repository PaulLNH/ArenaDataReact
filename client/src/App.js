import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

// import AppHeader from './components/NavBar';
import AppHeader from './components/AppHeader';
import Home from './pages/Home';
import TwoVsTwo from './pages/2v2';
import ThreeVsThree from './pages/3v3';
import Dashboard from './pages/Dashboard';
import Data from './pages/Data';
import RBG from './pages/RBG';
import Import from './pages/Import';
import { withStyles, MultiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

const styles = theme => ({
    main: {
        padding: 3 * theme.spacing.unit,
        [theme.breakpoints.down('xs')]: {
            padding: 2 * theme.spacing.unit,
        },
    },
});



const App = ({ classes }) => (
    <Fragment>
        <CssBaseline />

            <AppHeader />
            <main className={classes.main}>
                <Route exact path="/" component={Home} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/data" component={Data} />
                <Route exact path="/2v2" component={TwoVsTwo} />
                <Route exact path="/3v3" component={ThreeVsThree} />
                <Route exact path="/RBG" component={RBG} />
                <Route exact path="/import" component={Import} />
            </main>

    </Fragment>
);

export default withStyles(styles)(App);
