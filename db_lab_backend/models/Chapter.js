const { DataTypes } = require('sequelize');
const db = require('../config/db.config.js');

const Chapter = db.sequelize.define('Chapter', {
    chapter_Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    level_Id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    development_direction_Id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    chapter_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
}, {
    tableName: 'chapter',
    timestamps: false
});

module.exports = Chapter;