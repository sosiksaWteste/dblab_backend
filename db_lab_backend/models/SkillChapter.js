const { DataTypes } = require('sequelize');
const db = require('../config/db.config.js');

const SkillChapter = db.sequelize.define('SkillChapter', {
    skillChapter_Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    skill_Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    chapter_Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: 'skillChapter',
    timestamps: false
});

module.exports = SkillChapter;