const { DataTypes } = require('sequelize');
const db = require('../config/db.config.js');

const Teacher = db.sequelize.define('Teacher', {
    teacher_Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_Id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    full_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    place_of_Employment: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    position: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    text: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    level: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    teacher_role: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    photo: {
        type: DataTypes.BLOB,
        allowNull: true
    },
}, {
    tableName: 'teacher',
    timestamps: false
});

module.exports = Teacher;