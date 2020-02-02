import React, { Component } from 'react';
import { Grid, FormControlLabel, Checkbox } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons';
import { withStyles } from "@material-ui/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import SaveIcon from '@material-ui/icons/Save';
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Icon from '@material-ui/core/Icon';
import LinearProgress from '@material-ui/core/LinearProgress';
import google from '../../assets/images/social/google.svg';
import facebook from '../../assets/images/social/facebook_icon.svg';
import twitter from '../../assets/images/social/Twitter_icon.svg';

const styles = theme => ({
    "@global": {
        body: {
        backgroundColor: "#fff"
        }
    },
    paper: {
        marginTop: 100,
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
        marginBottom: 5,
        textAlign: "center"
    },
    imageIcon: {
        height: '100%'
    },
    iconRoot: {
        textAlign: 'start'
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
    

    handleChange(e) {
        // const { loggingIn } = this.props;
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password, submitted } = this.state;

        console.log('La informacion es: ', this.state);
        // if (username && password) {
        //     this.props.login(username, password);
        // }
    }

    socialsLogin() {
        const { classes } = this.props;
        return (
            <div>
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

    render() {
        const { username, password, submitted } = this.state;
        const { classes, loginError, isAuthenticated } = this.props;
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
                    <Container component="main" maxWidth="xs">
                        <Paper className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Iniciar Sesión
                            </Typography>
                            <form name="form" onSubmit={this.handleSubmit}> 
                                <br />
                                <Grid container spacing={1} alignItems="flex-end">
                                    <Grid item>
                                        <Face />
                                    </Grid>
                                    <Grid item md={true} sm={true} xs={true}>
                                        <TextField id="username" label="Username" type="email" fullWidth autoFocus required name="username" value={username} onChange={this.handleChange}/>
                                    </Grid>
                                </Grid>
                                <br />
                                <Grid container spacing={1} alignItems="flex-end">
                                    <Grid item>
                                        <Fingerprint />
                                    </Grid>
                                    <Grid item md={true} sm={true} xs={true}>
                                        <TextField id="password" label="Password" type="password" fullWidth required name="password" value={password} onChange={this.handleChange}/>
                                    </Grid>
                                </Grid>
                                {loginError && (
                                    <Typography component="p" className={classes.errorText}>
                                        Incorrect email or password.
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
                                        disabled={submitted}
                                        type="submit"
                                        >
                                        Iniciar
                                    </Button>
                                </Grid>
                                <br />
                                {submitted && (
                                    <LinearProgress />   
                                )}
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

export default withStyles(styles)(SignIn);