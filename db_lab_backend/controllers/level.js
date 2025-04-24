const path = require('path');
const fs = require('fs');
const cache = path.join(__dirname, '..', 'cache.json');
const Level = require('../models/Relations').Level;

const create = async (req, res) => {
    try {
        const { level_name } = req.body;
        const level = await Level.create({ level_name });
        return res.status(201).json(level);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getAll = async (req, res) => {
    try {
        const cacheData = JSON.parse(fs.readFileSync(cache, 'utf-8'));
        if (!cacheData.levels) {
            return res.status(404).json({ message: 'level not found in cache.' });
        }
        return res.status(200).json(cacheData.levels);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deleter = async (req, res) => {
    try {
        const { level_Id } = req.body;
        const result = await Level.destroy({ where: { level_Id } });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    create,
    getAll,
    deleter,
};