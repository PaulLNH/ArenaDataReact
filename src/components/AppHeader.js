import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  withStyles,
} from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import LoginButton from './LoginButton';
import ImportBtn from '../components/ImportBtn';

const styles = {
    root: {
      flexGrow: 1,
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
    title: {
      textAlign: 'left',
      flexGrow: 1,
    },
    tabs: {
        textAlign: 'center',
        flexGrow: 1,
    },
  };

class AppHeader extends React.Component {
    state = {
        value: 0,
        clientID: this.props.id || localStorage.getItem("clientID"),
    };

    handleTabChange = (event, value) => {
        this.setState({ value });
      };

    render() {
        const { classes } = this.props;
        const { value } = this.state;
    
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" color="inherit" className={classes.title}>
                            Arena Data
                        </Typography>
                        <Tabs value={value} onChange={this.handleTabChange} className={classes.tabs}>
                            <Tab label="Matches" component={Link} to="/" />
                            <Tab label="Data" component={Link} to="/data" />
                        </Tabs>
                        <ImportBtn />
                    </Toolbar>
                </AppBar>
            </div>
            );
        }
    };

export default withStyles(styles)(AppHeader);
