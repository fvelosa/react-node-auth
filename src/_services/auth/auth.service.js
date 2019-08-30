class AuthService {
  async login (username, password) {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify ({username, password}),
    };

    try {
      const {token, user} = await fetch (`/api/auth/login`, requestOptions).then(res => res.json());
      if (token && user) {
        localStorage.setItem ('token', token);
        localStorage.setItem ('user', JSON.stringify (user));
        return true;
      } else {
        localStorage.removeItem ('token');
        localStorage.removeItem ('user');
        return false;
      }
    } catch (e) {
      console.log (e);
      localStorage.removeItem ('token');
      localStorage.removeItem ('user');
      return false;
    }
  }

  logout () {
    console.log ('logout=>', localStorage.getItem ('user'));
    localStorage.removeItem ('token');
    localStorage.removeItem ('user');
  }

  isAuthenticated () {
    console.log ('isAuthenticated=>', localStorage.getItem ('token'));
    const token = localStorage.getItem ('token');
    return token !== null && token !== 'undefined';
  }

  register (user) {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify (user),
    };

    return fetch (`/api/register`, requestOptions);
  }

  getUsers () {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem ('token')}`,
      },
    };

    return fetch (`/api/users`, requestOptions).then(res => res.json());
  }
}

export const authService = new AuthService ();
