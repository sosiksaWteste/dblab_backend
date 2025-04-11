const { DataTypes } = require('sequelize');
const db = require('../config/db.config.js');

const DisciplineTeacher = db.sequelize.define('DisciplineTeacher', {
    disciplineTeacher_Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    teacher_Id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    discipline_Id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    language_Id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    beginning_Year: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
}, {
    tableName: 'disciplineTeacher',
    timestamps: false
});

module.exports = DisciplineTeacher;