import React from 'react';
import {Link} from 'react-router-dom';

import {authService} from '../_services';

export class RegisterPage extends React.Component {
  constructor (props) {
    super (props);

    this.state = {
      user: {
        firstName: '',
        lastName: '',
        username: '',
        password: '',
      },
      submitted: false,
      message: '',
    };

    this.handleChange = this.handleChange.bind (this);
    this.handleSubmit = this.handleSubmit.bind (this);
  }

  handleChange (event) {
    const {name, value} = event.target;
    const {user} = this.state;
    this.setState ({
      user: {
        ...user,
        [name]: value,
      },
    });
  }

  async handleSubmit (event) {
    event.preventDefault ();

    this.setState ({submitted: true});
    const {user} = this.state;
    if (user.firstName && user.lastName && user.username && user.password) {
      try {
        const res = await authService.register (user);
        if (res.status === 200) {
          this.setState ({message: 'User created, please login!'});
          setTimeout (() => this.props.history.push ('/login'), 1500);
        } else {
          console.log (res);
          this.setState({message: 'Failed to register the user'})
        }
      } catch (e) {
        console.log (e);
        this.setState({message: 'Failed to register the user'})
      }
    }
  }

  render () {
    const {user, submitted, message} = this.state;
    return (
      <div className="col-md-6 col-md-offset-3">
        <h2>Register</h2>
        <form name="form" onSubmit={this.handleSubmit}>
          <div
            className={
              'form-group' + (submitted && !user.firstName ? ' has-error' : '')
            }
          >
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              className="form-control"
              name="firstName"
              value={user.firstName}
              onChange={this.handleChange}
            />
            {submitted &&
              !user.firstName &&
              <div className="help-block">First Name is required</div>}
          </div>
          <div
            className={
              'form-group' + (submitted && !user.lastName ? ' has-error' : '')
            }
          >
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              className="form-control"
              name="lastName"
              value={user.lastName}
              onChange={this.handleChange}
            />
            {submitted &&
              !user.lastName &&
              <div className="help-block">Last Name is required</div>}
          </div>
          <div
            className={
              'form-group' + (submitted && !user.username ? ' has-error' : '')
            }
          >
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={user.username}
              onChange={this.handleChange}
            />
            {submitted &&
              !user.username &&
              <div className="help-block">Username is required</div>}
          </div>
          <div
            className={
              'form-group' + (submitted && !user.password ? ' has-error' : '')
            }
          >
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={user.password}
              onChange={this.handleChange}
            />
            {submitted &&
              !user.password &&
              <div className="help-block">Password is required</div>}
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Register</button>
            <Link to="/login" className="btn btn-link">Cancel</Link>
            <p>{message}</p>
          </div>
        </form>
      </div>
    );
  }
}
