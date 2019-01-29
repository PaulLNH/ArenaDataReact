import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';

// import AppHeader from './components/NavBar';
import AppHeader from './components/AppHeader';
import Home from './pages/Home';
import TwoVsTwo from './pages/2v2';
import ThreeVsThree from './pages/3v3';
import Dashboard from './pages/Dashboard';
import Data from './pages/Data';
import RBG from './pages/RBG';
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


const App = ({ classes }) => (
    state = {
        data: [],
        id: 0,
        message: null,
        intervalIsSet: false,
        idToDelete: null,
        idToUpdate: null,
        objectToUpdate: null,   
    };

    // when component mounts, first thing it does is fetch all existing data in our db
    // then we incorporate a polling logic so that we can easily see if our db has 
    // changed and implement those changes into our UI
    componentDidMount() {
        this.getDataFromDb();
        if (!this.state.intervalIsSet) {
        let interval = setInterval(this.getDataFromDb, 1000);
        this.setState({ intervalIsSet: interval });
        }
    }

    // never let a process live forever 
    // always kill a process everytime we are done using it
    componentWillUnmount() {
        if (this.state.intervalIsSet) {
        clearInterval(this.state.intervalIsSet);
        this.setState({ intervalIsSet: null });
        }
    }

    // just a note, here, in the front end, we use the id key of our data object 
    // in order to identify which we want to Update or delete.
    // for our back end, we use the object id assigned by MongoDB to modify 
    // data base entries

    // CRUD FUNCTIONS
    // CREATE
    putDataToDB = message => {
        let currentIds = this.state.data.map(data => data.id);
        let idToBeAdded = 0;
        while (currentIds.includes(idToBeAdded)) {
            ++idToBeAdded;
        }

        axios.post("http://localhost:3001/api/putData", {
        id: idToBeAdded,
        message: message
        });
    };

    // READ
    getDataFromDb = () => {
        fetch("http://localhost:3001/api/getData")
        .then(data => data.json())
        .then(res => this.setState({ data: res.data }));
    };

    // UPDATE
    updateDB = (idToUpdate, updateToApply) => {
        let objIdToUpdate = null;
        this.state.data.forEach(dat => {
          if (dat.id == idToUpdate) {
            objIdToUpdate = dat._id;
          }
        });
    
        axios.post("http://localhost:3001/api/updateData", {
          id: objIdToUpdate,
          update: { message: updateToApply }
        });
      };

    // DELETE
    deleteFromDB = idTodelete => {
        let objIdToDelete = null;
        this.state.data.forEach(dat => {
        if (dat.id == idTodelete) {
            objIdToDelete = dat._id;
        }
        });

        axios.delete("http://localhost:3001/api/deleteData", {
        data: {
            id: objIdToDelete
        }
        });
    };

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
