import * as authTypes from "../types/authTypes";

import { auth, db } from '../../constants/firebase';

const requestLogin = () => {
  return {
    type: authTypes.LOGIN_REQUEST
  };
};

const receiveLogin = user => {
  return {
    type: authTypes.LOGIN_SUCCESS,
    user
  };
};

const loginError = error => {
  return {
    type: authTypes.LOGIN_FAILURE,
    error
  };
};

const requestLogout = () => {
  return {
    type: authTypes.LOGOUT_REQUEST
  };
};

const receiveLogout = () => {
  return {
    type: authTypes.LOGOUT_SUCCESS
  };
};

const logoutError = error => {
  return {
    type: authTypes.LOGOUT_FAILURE,
    error
  };
};

const verifyRequest = () => {
  return {
    type: authTypes.VERIFY_REQUEST
  };
};

const verifySuccess = () => {
  return {
    type: authTypes.VERIFY_SUCCESS
  };
};

const requestSignUp = () => {
  return {
    type: authTypes.SIGNUP_REQUEST,
  };
};

const receiveSignUp = () => {
  return {
    type: authTypes.SIGNUP_SUCCESS
  };
};

const signUpError = error => {
  return {
    type: authTypes.SIGNUP_FAILURE,
    error
  };
};

export const signupUser = (displayName, email, password) => async dispatch => {
   dispatch(requestSignUp());
   await auth
    .createUserWithEmailAndPassword(email, password)
    .then(userRecord =>  {
      const user =  userRecord.user;
      user.sendEmailVerification();
      user.updateProfile(displayName, user.photoURL);
      return db.collection('users').doc(`${user.uid}`).set({
        uid: user.uid,
        createAt: Date().toString,
        displayName,
        email: user.email,
        dissabled: false,
        emailVerified: user.emailVerified,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
        providerId: user.providerId
      })
    })
    .catch(error => {
      //Do something with the error if you want!
      dispatch(signUpError(error));
    })
    .then(() => {
      dispatch(receiveSignUp());
    })
    .catch(error => {
      //Do something with the error if you want!
      dispatch(signUpError(error));
    });

}

export const loginUser = (email, password) => async dispatch => {
  dispatch(requestLogin());
  await auth
    .signInWithEmailAndPassword(email, password)
    .then(user => {
      dispatch(receiveLogin(user));
    })
    .catch(error => {
      //Do something with the error if you want!
      dispatch(loginError(error));
    });
};

export const logoutUser = () => dispatch => {
  dispatch(requestLogout());
  auth
    .signOut()
    .then(() => {
      dispatch(receiveLogout());
    })
    .catch(error => {
      //Do something with the error if you want!
      dispatch(logoutError(error));
    });
};

export const verifyAuth = () => dispatch => {
  dispatch(verifyRequest());
  auth.onAuthStateChanged(user => {
    if (user !== null) {
      dispatch(receiveLogin(user));
    }
    dispatch(verifySuccess());
  });
};