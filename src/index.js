import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";

import './assets/css/index.css';
import './assets/vendor/bootstrap/css/bootstrap.css';
import './assets/vendor/font-awesome/css/all.css';
import './assets/vendor/md-bootstrap/css/mdb.css';

import App from './components/App';
import * as serviceWorker from './serviceWorker';

import Store from './store';
const store = Store();

ReactDOM.render( 
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
    );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
