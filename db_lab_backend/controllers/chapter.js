const path = require('path');
const Chapter = require('../models/Relations').Chapter;
const fs = require('fs');
const cache = path.join(__dirname, '..', 'cache.json');

const create = async (req, res) => {
    try {
        const { level_Id, development_direction_Id, chapter_name } = req.body;
        const chapter = await Chapter.create({ level_Id, development_direction_Id, chapter_name });
        return res.status(201).json(chapter);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getAll = async (req, res) => {
    try {
        const cacheData = JSON.parse(fs.readFileSync(cache, 'utf-8'));
        if (!cacheData.chapters) {
            return res.status(404).json({ message: 'Chapters not found in cache.' });
        }
        return res.status(200).json(cacheData.chapters);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deleter = async (req, res) => {
    try {
        const { chapter_Id } = req.params;
        const result = await Chapter.destroy({ where: { chapter_Id } });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const update = async (req, res) => {
    try {
        const { chapter_Id } = req.params;
        const { level_Id, development_direction_Id, chapter_name } = req.body;
        const chapter = await Chapter.update({ level_Id, development_direction_Id, chapter_name }, {where: {chapter_Id}});
        return res.status(200).json(chapter);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


module.exports = {
    create,
    getAll,
    deleter,
    update
};