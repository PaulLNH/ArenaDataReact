import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuListComposition from './MenuListComposition';
// import Tabs from './Tabs';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import NoteAdd from '@material-ui/icons/NoteAdd';
import Settings from '@material-ui/icons/Settings';
import ExitToApp from '@material-ui/icons/ExitToApp';

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
  login: {
    textAlign: 'right',
    flexGrow: 1,
  },
  tabs: {
      textAlign: 'center',
      flexGrow: 1,
  },
};

function TabContainer(props) {
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {props.children}
      </Typography>
    );
  }
  
  TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
  };

class MenuAppBar extends React.Component {
  state = {
    auth: false,
    anchorEl: null,
    value: 0,
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
    const { value } = this.state;

    return (
        <div className={classes.root}>
            <AppBar position="static">
            <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.title}>
                Arena Data
            </Typography>
                    <Tabs value={value} onChange={this.handleTabChange} className={classes.tabs}>
                        <Tab label="2v2" />
                        <Tab label="3v3" />
                        <Tab label="RBG" />
                    </Tabs>
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
                                <MenuItem onClick={this.handleClose}><NoteAdd /> &nbsp; Import CSV</MenuItem>
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
                            >
                                <Typography variant="subtitle1" color="inherit" className={classes.grow} onClick={this.handleLogin}>
                                    Login
                                </Typography>
                            </IconButton>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
        );
    }
}
// <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
// <MenuIcon />
// </IconButton>
// <FormGroup>
//     <FormControlLabel
//         control={
//             <Switch checked={auth} onChange={this.handleChange} aria-label="LoginSwitch" />
//         }
//         label={auth ? 'Logout' : 'Login'}
//     />
// </FormGroup>

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);