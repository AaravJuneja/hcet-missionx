class Mission {
    constructor(name, description, status = 'pending') {
      this.name = name;
      this.description = description;
      this.status = status;
      this.agents = [];
    }
  }
  
  module.exports = Mission;  