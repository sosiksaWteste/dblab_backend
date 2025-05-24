const { DataTypes } = require('sequelize');
const db = require('../config/db.config.js');

const Discipline = db.sequelize.define('Discipline', {
    discipline_Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    discipline_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    discipline_Description: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    discipline_type: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    volume: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    syllabus_link: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
}, {
    tableName: 'discipline',
    timestamps: false
});

module.exports = Discipline;