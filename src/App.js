import React from 'react';
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';

import './App.css';

import {authService} from './_services';

import {LoginPage} from './LoginPage';
import {RegisterPage} from './RegisterPage';
import {HomePage} from './HomePage';

function PrivateRoute({component: Component, ...rest}) {
  return (
    <Route
      {...rest}
      render={props =>
        authService.isAuthenticated()
          ? <Component {...props} />
          : <Redirect
              to={{
                pathname: '/login',
                state: {from: props.location},
              }}
            />}
    />
  );
}

function RootPage(props) {
  return <Redirect to={{pathname: '/home', state: {from: props.location},}} />
}

function App () {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Root</Link>
            </li>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </nav>

        
        <Route path="/" exact component={RootPage} />
        <PrivateRoute path="/home" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
      </div>
    </Router>
  );
}

export default App;
