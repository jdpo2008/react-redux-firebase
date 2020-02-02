import React from 'react';
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Settings, PowerOff, AccountCircle } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import * as authActions from '../../store/actions';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
}));




function Home(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const menuId = 'primary-search-account-menu';
    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = event => {
        setAnchorEl(event.currentTarget);
    };
    console.log(props);
    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleLogout = () => {
        props.logoutUser();
    }

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
            className="menu-top"
            >
            <MenuItem onClick={handleMenuClose}><Settings className={classes.menuButton} color="primary"/><span className={classes.menuButton}>Perfil</span> </MenuItem>
            <MenuItem onClick={handleLogout}><PowerOff className={classes.menuButton} color="primary"/><span className={classes.menuButton}>Salir</span></MenuItem>
        </Menu>
    );

    return (
        <div>
             <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                    Home
                    </Typography>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="primary-search-account-menu"
                        aria-haspopup="true"
                        color="inherit"
                        onClick={handleProfileMenuOpen}
                        >
                        <AccountCircle /> 
                        <span className="user-name">{props.user.displayName}</span> 
                    </IconButton>
                </Toolbar>
            </AppBar>
            {renderMenu}
        </div>
       
        // <div>
        //     <h1> Ya estas logueado, {props.user.displayName}</h1>
        // </div>
    )
}

const mapStateToProps = (appReducers) => {
    return {
        user: appReducers.authReducer.user
    };;
}

export default (connect(mapStateToProps, authActions)(Home));

