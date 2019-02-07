import React, { Component } from 'react';
import NoteAdd from '@material-ui/icons/NoteAdd';
import Settings from '@material-ui/icons/Settings';
import ExitToApp from '@material-ui/icons/ExitToApp';
import {
  IconButton,
  Menu,
  MenuItem,
  Typography,
  withStyles,
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const styles = {
    login: {
      textAlign: 'right',
      flexGrow: 1,
    },
  };

class LoginButton extends Component {
  state = {
    auth: true,
    user: null,
    menuAnchorEl: null,
  };

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleTabChange = (event, value) => {
    this.setState({ value });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogout = () => {
    this.setState({ 
        auth: false, 
        anchorEl: null
    });
  };

  handleLogin = () => {
      this.setState({ auth: true });
  };

  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
      {auth ? (
        <div>
            <IconButton
                aria-owns={open ? 'menu-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
            >
                <AccountCircle />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                onClose={this.handleClose}
            >
                <MenuItem onClick={this.handleClose}><Settings /> &nbsp; Account Settings</MenuItem>
                <MenuItem onClick={this.handleClose} component={Link} to="/import"><NoteAdd /> &nbsp; Import CSV</MenuItem>
                <MenuItem onClick={this.handleLogout}><ExitToApp /> &nbsp; Log Out</MenuItem>
            </Menu>
        </div>
    ) :
    (
        <div>
            <IconButton
                aria-owns={open ? 'menu-appbar' : undefined}
                aria-haspopup="true"
                color="inherit"
                onClick={this.handleLogin}
            >
                <Typography variant="subtitle1" color="inherit" className={classes.grow}>
                    Login
                </Typography>
            </IconButton>
        </div>
    )}
      </div>
    );
  }
}

export default withStyles(styles)(LoginButton);
