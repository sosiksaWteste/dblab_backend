const { DataTypes } = require('sequelize');
const db = require('../config/db.config.js');

const Material = db.sequelize.define('Material', {
    material_Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    event_Id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    material_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    file: {
        type: DataTypes.BLOB('medium'),
        allowNull: true
    },
    material_type: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
}, {
    tableName: 'material',
    timestamps: false
});

module.exports = Material;