import React from 'react';
import { connect } from "react-redux";

import SignIn from '../../components/SignIn';
import Home from '../home';

function Auth(props) {
     if (!props.isAuthenticated) {
        return  <SignIn />
    } else { 
        return  <Home />
    }
}

const mapStateToProps = (appReducers) => {
    return {
        isAuthenticated: appReducers.authReducer.isAuthenticated
    };;
}

export default (connect(mapStateToProps)(Auth));

