const { DataTypes } = require('sequelize');
const db = require('../config/db.config.js');

const DevelopmentDirection = db.sequelize.define('DevelopmentDirection', {
    development_direction_Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    development_direction_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    development_direction_Description: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
}, {
    tableName: 'development_direction',
    timestamps: false
});

module.exports = DevelopmentDirection;