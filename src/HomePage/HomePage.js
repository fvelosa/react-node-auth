import React from 'react';

import {authService} from '../_services';

export class HomePage extends React.Component {
  constructor (props) {
    super (props);

    this.state = {
      users: [],
    };

    this.handleLogout = this.handleLogout.bind (this);
  }

  async componentDidMount () {
    const users = await authService.getUsers()
    console.log(users)
    this.setState ({users});
  }

  async handleLogout () {
    await authService.logout ();
    this.props.history.push (`/`);
  }
  render () {
    const {users} = this.state;
    return (
      <div>
        <h1>Home Page</h1>
        <ul>
          <li>{users.map(user => <li>{JSON.stringify(user)}</li>)}</li>
        </ul>
        <button className="btn btn-primary" onClick={this.handleLogout}>
          Logout
        </button>
      </div>
    );
  }
}
