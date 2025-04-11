const { DataTypes } = require('sequelize');
const db = require('../config/db.config.js');

const Lesson = db.sequelize.define('Lesson', {
    lesson_Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    lesson_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    lesson_time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    link: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
}, {
    tableName: 'lesson',
    timestamps: false
});

module.exports = Lesson;