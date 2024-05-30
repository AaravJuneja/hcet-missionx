const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Agent = require('./Agent');
const Mission = require('./Mission');

const models = {
    Agent: Agent.init(sequelize, Sequelize),
    Mission: Mission.init(sequelize, Sequelize),
};

Agent.associate(models);
Mission.associate(models);

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;