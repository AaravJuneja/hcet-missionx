class User {
    constructor(username, password, role = 'agent') {
      this.username = username;
      this.password = password;
      this.role = role;
      this.missions = [];
    }
  }
  
  module.exports = User;  