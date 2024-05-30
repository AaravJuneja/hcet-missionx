const { Model, DataTypes } = require('sequelize');

class Mission extends Model {
    static init(sequelize) {
        return super.init({
            name: DataTypes.STRING,
            description: DataTypes.TEXT,
            status: DataTypes.STRING,
        }, { sequelize });
    }

    static associate(models) {
        this.belongsToMany(models.Agent, { through: 'AgentMissions' });
    }
}

module.exports = Mission;