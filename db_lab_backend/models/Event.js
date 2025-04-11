const { DataTypes } = require('sequelize');
const db = require('../config/db.config.js');

const Event = db.sequelize.define('Event', {
    event_Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    teacher_Id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    lesson_Id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    event_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    type: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    format: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    begin_date: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
}, {
    tableName: 'event',
    timestamps: false
});

module.exports = Event;