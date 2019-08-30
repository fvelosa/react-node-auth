class UserService {
  users = [];

  register (user) {
    if (user.firstName && user.lastName && user.password && user.username) {
      if (this.get (user.username)) {
        throw new Error ('User already exists');
      } else {
        this.users.push (user);
      }
    } else {
      throw new Error ('Bad user format');
    }
  }

  get (username) {
    return this.users.find (user => (user.username === username));
  }

  getAll () {
    return this.users;
  }

  authenticate (username, password) {
    const user = this.get (username);
    if (user) {
      if (password === user.password) {
        return user;
      } else {
        throw new Error ('Forbidden');
      }
    } else {
      throw new Error ('Not found');
    }
  }
}

module.exports = new UserService ();
