import React from 'react';
import {Link} from 'react-router-dom';

import {authService} from '../_services';

export class LoginPage extends React.Component {
  constructor (props) {
    super (props);
    authService.logout ();

    this.state = {
      username: '',
      password: '',
      submitted: false,
      message: '',
    };

    this.handleChange = this.handleChange.bind (this);
    this.handleSubmit = this.handleSubmit.bind (this);
  }

  handleChange (event) {
    const {name, value} = event.target;
    this.setState ({[name]: value});
  }

  async handleSubmit (event) {
    event.preventDefault ();
    this.setState ({submitted: true});
    const {username, password} = this.state;

    if (this.state.username && this.state.password) {
      if (await authService.login (username, password)) {
        this.setState ({message: 'Login successfull.'});
        setTimeout (() => this.props.history.push ('/home'), 1000);
      } else {
        this.setState ({message: 'Login Failed'});
      }
    }
  }

  render () {
    const {username, password, submitted, message} = this.state;
    return (
      <div className="col-md-6 col-md-offset-3">
        <h2>Login</h2>
        <form name="form" onSubmit={this.handleSubmit}>
          <div
            className={
              'form-group' + (submitted && !username ? ' has-error' : '')
            }
          >
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={this.handleChange}
            />
            {submitted &&
              !username &&
              <div className="help-block">Username is required</div>}
          </div>
          <div
            className={
              'form-group' + (submitted && !password ? ' has-error' : '')
            }
          >
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
            {submitted &&
              !password &&
              <div className="help-block">Password is required</div>}
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Login</button>
            <Link to="/register" className="btn btn-link">Register</Link>
          </div>
          <div className="form-group">
            <p>{message}</p>
          </div>
        </form>
      </div>
    );
  }
}
