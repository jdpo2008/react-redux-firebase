import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { Grid, FormControlLabel, Checkbox } from '@material-ui/core';
import { LockOpen, Email, LockOutlined as LockOutlinedIcon } from '@material-ui/icons';
import { withStyles } from "@material-ui/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import LinearProgress from '@material-ui/core/LinearProgress';
import SocialLogin from '../../components/SocialsLogin';
import * as authActions from '../../store/actions';

import Home from '../home';

const styles = theme => ({
    "@global": {
        body: {
            backgroundColor: "#191919"
        }
    },
    paper: {
        marginTop: 40,
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
        color: "#FF0000",
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
            submitted: false,
            isRegister: false
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

    handleRegister() {
        this.setState({ isRegister: true });
    }

    getErrorMessage(code) {
        switch(code) {
            case 'auth/user-not-found' :
                return 'Usuario y/o Password incorrectos verifica e intenta nuevamente';
            case 'auth/user-disabled' :
                return 'La Cuenta se encuentra deshabilitada consulte con el administrador';
            case 'auth/wrong-password' :
                return 'Usuario y/o Password incorrectos verifica e intenta nuevamente';
            case 'auth/invalid-email' :
                return 'El Email es invalido';
            default : 
                return ''
        }
    }

    render() {
        const { username, password } = this.state;
        const { classes, isLoggingIn, loginError, isAuthenticated } = this.props;
        if (isAuthenticated) {
        return  <Home />;//<Redirect to="/" />;
        } else {
             return (
                <div className="container">
                    <Container component="main" maxWidth="sm">
                        <Paper className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Iniciar Sesión
                            </Typography>
                            <form name="form" style={{ width: '75%' }} onSubmit={this.handleSubmit}> 
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
                                        disabled={isLoggingIn}
                                        type="submit"
                                        fullWidth
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
                                        <Link to="/signup" style={{ textTransform: "none" }} >Registrate</Link>
                                    </Grid>
                                </Grid>
                                <br />
                                {isLoggingIn && (
                                    <LinearProgress />   
                                )}
                                 <Grid container alignItems="center" justify="center">
                                    <Grid item>
                                         <Typography  style={{ fontSize: '15px' }} component="h5" variant="h6">
                                            ----------------------------------- ó -----------------------------------
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </form>
                            <br />
                            <SocialLogin />
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

