import React, { Component } from 'react';
import { connect } from "react-redux";

import { Grid, FormControlLabel, Checkbox } from '@material-ui/core';
import { LockOpen, Email, Save as SaveIcon, LockOutlined as LockOutlinedIcon } from '@material-ui/icons';
import { withStyles } from "@material-ui/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Icon from '@material-ui/core/Icon';
import LinearProgress from '@material-ui/core/LinearProgress';

import google from '../../assets/images/social/google.svg';
import facebook from '../../assets/images/social/facebook_icon.svg';
import twitter from '../../assets/images/social/Twitter_icon.svg';

import * as authActions from '../../store/actions';

const styles = theme => ({
    "@global": {
        body: {
        backgroundColor: "#fff"
        }
    },
    paper: {
        marginTop: 35,
        display: "flex",
        padding: 20,
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "#f50057"
    },
    form: {
        marginTop: 1
    },
    errorText: {
        color: "#f50057",
        marginTop: 5,
        textAlign: "center",
        fontSize: 12
    },
    imageIcon: {
        height: '100%'
    },
    iconRoot: {
        textAlign: 'start'
    },
    social: {
        width: '80%',
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    }
});

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount() {
        this.props.verifyAuth();
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        const { username, password } = this.state;
        this.props.loginUser(username, password);
    }

    socialsLogin() {
        const { classes } = this.props;
        return (
            <div className={classes.social}>
                  <Button
                    variant="text"
                    color="default"
                    startIcon={<Icon classes={{root: classes.iconRoot}}><img className={classes.imageIcon} src={google} alt=""/></Icon>}
                >
                    Google
                </Button>
                 <Button
                    variant="text"
                    color="default"
                    startIcon={<Icon classes={{root: classes.iconRoot}}><img className={classes.imageIcon} src={facebook} alt=""/></Icon>}
                >
                    Facebook
                </Button>
                  <Button
                    variant="text"
                    color="default"
                    startIcon={<Icon classes={{root: classes.iconRoot}}><img className={classes.imageIcon} src={twitter} alt=""/></Icon>}
                >
                    Twitter
                </Button>
            </div>
        )
    }

    getErrorMessage(code) {
        switch(code) {
            case 'auth/user-not-found' :
                return 'Usuario y/o Password incorrectos verifica e intenta nuevamente';
            default : 
                return ''
        }
    }

    render() {
        const { username, password } = this.state;
        const { classes, isLoggingIn, loginError, isAuthenticated } = this.props;
        if (isAuthenticated) {
        return  <h1>Is isAuthenticated </h1>;//<Redirect to="/" />;
        } else {
             return (
                <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col-md-4">
                            
                        </div>
                    </div>
                    <br />
                    <Container component="main" maxWidth="sm">
                        <Paper className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Iniciar Sesión
                            </Typography>
                            <form name="form" style={{ width: '80%' }} onSubmit={this.handleSubmit}> 
                                <br />
                                <Grid container spacing={1} alignItems="flex-end">
                                    <Grid item>
                                        <Email color="primary" />
                                    </Grid>
                                    <Grid item md={true} sm={true} xs={true}>
                                        <TextField id="username" label="Username" type="email" fullWidth autoFocus required name="username" value={username} onChange={this.handleChange}/>
                                    </Grid>
                                </Grid>
                                <br />
                                <Grid container spacing={1} alignItems="flex-end">
                                    <Grid item>
                                        <LockOpen color="primary" />
                                    </Grid>
                                    <Grid item md={true} sm={true} xs={true}>
                                        <TextField id="password" label="Password" type="password" fullWidth required name="password" value={password} onChange={this.handleChange}/>
                                    </Grid>
                                </Grid>
                                {loginError && (
                                    <Typography component="p" className={classes.errorText}>
                                        {this.getErrorMessage(this.props.error.code)}
                                    </Typography>
                                )}
                                <br />
                                <Grid container alignItems="center" justify="space-between">
                                    <Grid item>
                                        <FormControlLabel control={
                                            <Checkbox
                                                color="primary"
                                            />
                                        } label="Remember me" />
                                    </Grid>
                                    <Grid item>
                                        <Button disableFocusRipple disableRipple style={{ textTransform: "none" }} variant="text" color="primary">Forgot password?</Button>
                                    </Grid>
                                </Grid>
                                <Grid container justify="center" style={{ marginTop: '10px' }}>
                                     <Button
                                        variant="contained"
                                        color="primary"
                                        className={classes.button}
                                        startIcon={<SaveIcon />}
                                        disabled={isLoggingIn}
                                        type="submit"
                                        >
                                        Iniciar
                                    </Button>
                                </Grid>
                                <br />
                                <Grid container alignItems="center" justify="space-between">
                                    <Grid item>
                                        <Typography style={{ fontSize: '15px' }} component="h5" variant="h6">
                                            No Tienes Cuenta?
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Button disableFocusRipple disableRipple style={{ textTransform: "none" }} variant="text" color="primary">Registrate</Button>
                                    </Grid>
                                </Grid>
                                <br />
                                {isLoggingIn && (
                                    <LinearProgress />   
                                )}
                                 <Grid container alignItems="center" justify="center">
                                    <Grid item>
                                         <Typography  style={{ fontSize: '15px' }} component="h5" variant="h6">
                                            ------------------------------------- ó -------------------------------------
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </form>
                            <br />
                            {this.socialsLogin()}
                        </Paper>
                    </Container>
                </div>
            )
        }
    }
}
const mapStateToProps = (appReducers) => {
    return appReducers.authReducer;
}

export default withStyles(styles)(connect(mapStateToProps, authActions)(SignIn));