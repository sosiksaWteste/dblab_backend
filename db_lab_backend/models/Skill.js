const { DataTypes } = require('sequelize');
const db = require('../config/db.config.js');

const Skill = db.sequelize.define('Skill', {
    skill_Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    skill_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
}, {
    tableName: 'skill',
    timestamps: false
});

module.exports = Skill;