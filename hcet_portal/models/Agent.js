const { Model, DataTypes } = require('sequelize');

class Agent extends Model {
    static init(sequelize) {
        return super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            role: DataTypes.STRING,
        }, { sequelize });
    }

    static associate(models) {
        this.belongsToMany(models.Mission, { through: 'AgentMissions' });
    }
}

module.exports = Agent;