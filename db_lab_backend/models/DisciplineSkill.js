const { DataTypes } = require('sequelize');
const db = require('../config/db.config.js');

const DisciplineSkill = db.sequelize.define('DisciplineSkill', {
    disciplineSkill_Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    learning_type: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
}, {
    tableName: 'disciplineSkill',
    timestamps: false
});

module.exports = DisciplineSkill;