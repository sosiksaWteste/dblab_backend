const path = require('path');
const Chapter = require('../models/Relations').Chapter;
const Skill = require('../models/Relations').Skill;
const Level = require('../models/Relations').Level;
const fs = require('fs');
const DevelopmentDirection = require('../models/DevelopmentDirection');
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

const getFromDb = async (req, res) => {
    try {
        const chapters = await Chapter.findAll({
            include: [
                {
                    model: Level,
                    attributes: ['level_name']
                },
                {
                    model: DevelopmentDirection,
                    attributes: ['development_direction_name']
                },
            ]
        });
        const result = chapters.map(chapter => {
            const { Level, DevelopmentDirection, ...chapterData } = chapter.toJSON();
            return {
                ...chapterData,
                level_name: Level.level_name,
                development_direction_name: DevelopmentDirection.development_direction_name
            };
        });
        return res.status(200).json(result);
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

const getFullFromDb = async (req, res) => {
    try {
        const chapters = await Chapter.findAll({
            include: [
                {
                    model: Skill,
                    through: { attributes: [] }
                }
            ]
        });
        const result = chapters.map(chapter => {
            const { Skills, ...chapterData } = chapter.toJSON();
            return {
                ...chapterData,
                skills: Skills
            };
        });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    create,
    getAll,
    deleter,
    update,
    getFullFromDb,
    getFromDb
};