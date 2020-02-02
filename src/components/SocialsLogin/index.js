import React from 'react';
import { withStyles } from "@material-ui/styles";
import firebase from "firebase/app";
import {auth} from '../../constants/firebase';

import Button from "@material-ui/core/Button";
import Icon from '@material-ui/core/Icon';
import google from '../../assets/images/social/google.svg';
import facebook from '../../assets/images/social/facebook_icon.svg';
import twitter from '../../assets/images/social/Twitter_icon.svg';

const styles = theme => ({
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


export class SocialsLogins extends React.Component {

     doSignInWithGoogle = () =>
        auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

    doSignInWithFacebook = () =>
        auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());

    doSignInWithTwitter = () =>
        auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());

    
    render() {
        const { classes } = this.props;
        return (
           <div className={classes.social}>
                <Button
                    type="button"
                    variant="text"
                    color="default"
                    startIcon={<Icon classes={{root: classes.iconRoot}}><img className={classes.imageIcon} src={google} alt=""/></Icon>}
                    onClick={this.doSignInWithGoogle()}
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
}

export default  withStyles(styles)(SocialsLogins);

