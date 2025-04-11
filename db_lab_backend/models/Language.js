const { DataTypes } = require('sequelize');
const db = require('../config/db.config.js');

const Language = db.sequelize.define('Language', {
    language_Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    language_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
}, {
    tableName: 'language',
    timestamps: false
});

module.exports = Language;