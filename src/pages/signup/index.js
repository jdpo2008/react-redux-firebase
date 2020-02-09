import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { Grid, FormControlLabel, Checkbox } from '@material-ui/core';
import { LockOpen, Email, LockOutlined as LockOutlinedIcon, People } from '@material-ui/icons';
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import LinearProgress from '@material-ui/core/LinearProgress';
import * as authActions from '../../store/actions';

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
    }
});


export class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName: '',
            username: '',
            password: '',
            acepto: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // componentDidMount() {
    //     this.props.verifyAuth();
    // }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { displayName, username, password, acepto} = this.state;
        if (acepto) {
            this.props.signupUser(displayName, username, password);
        } else {
            alert('debe aceptar los terminos');
        }
    }

     getErrorMessage(code) {
        switch(code) {
            case 'auth/email-already-in-use' :
                return 'El email ya se encuentra registrado';
            case 'auth/invalid-email' :
                return 'El Email es invalido';
            case 'auth/operation-not-allowed' :
                 return 'El Email es invalido';
             case 'auth/weak-password' :
                 return 'La contraseña es muy debil para crear la cuenta';
            default : 
                return ''
        }
    }

    render() {
        const { displayName, username, password, acepto } = this.state;
        const { classes, isLoggingIn, loginError } = this.props;
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
                                    <People color="primary" />
                                </Grid>
                                <Grid item md={true} sm={true} xs={true}>
                                    <TextField id="displayName" label="Nombre" type="text" fullWidth autoFocus required name="displayName" value={displayName} onChange={this.handleChange}/>
                                </Grid>
                            </Grid>
                            <br />
                            <Grid container spacing={1} alignItems="flex-end">
                                <Grid item>
                                    <Email color="primary" />
                                </Grid>
                                <Grid item md={true} sm={true} xs={true}>
                                    <TextField id="username" label="Username" type="email" fullWidth required name="username" value={username} onChange={this.handleChange}/>
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
                                            name="acepto"
                                            value={acepto} 
                                            onChange={this.handleChange}
                                        />
                                    } label="Aceptar Términos" />
                                </Grid>
                                <Grid item>
                                    <Button disableFocusRipple disableRipple style={{ textTransform: "none" }} variant="text" color="primary">Security Policy</Button>
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
                                    Registrarse
                                </Button>
                            </Grid>
                            <br />
                            <Grid container alignItems="center" justify="space-between">
                                <Grid item>
                                    <Typography style={{ fontSize: '15px' }} component="h5" variant="h6">
                                        Ya Tienes Cuenta?
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Link to="/signin" style={{ textTransform: "none" }} >Iniciar Sesión</Link>
                                </Grid>
                            </Grid>
                            <br />
                            {isLoggingIn && (
                                <LinearProgress />   
                            )}
                        </form>
                    </Paper>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = (appReducers) => {
    return appReducers.authReducer;
}

export default withStyles(styles)(connect(mapStateToProps, authActions)(SignUp));