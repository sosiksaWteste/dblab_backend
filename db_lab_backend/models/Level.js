const { DataTypes } = require('sequelize');
const db = require('../config/db.config.js');

const Level = db.sequelize.define('Level', {
    level_Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    level_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
}, {
    tableName: 'level',
    timestamps: false
});

module.exports = Level;