import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import SignIn from '../../pages/signin';
import SingUp from '../../pages/signup';
import Home from '../../pages/home';

function App() {
  return (
    <HashRouter>
      <Switch>
          <Route exact path="/" component={Home}>
            <Home />
          </Route>
          <Route exact path="/signup" component={SingUp}>
            <SingUp />
          </Route>
          <Route exact path="/signin" component={SignIn}>
            <SignIn />
          </Route>
      </Switch>
    </HashRouter>
  );
}

export default App;
