const path = require('path');
const fs = require('fs');
const cache = path.join(__dirname, '..', 'cache.json');
const SkillChapter = require('../models/Relations').SkillChapter;

const create = async (req, res) => {
    try {
        const { skill_Id, chapter_Id } = req.body;
        const skillChapter = await SkillChapter.create({ skill_Id, chapter_Id });
        return res.status(201).json(skillChapter);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getAll = async (req, res) => {
    try {
        const cacheData = JSON.parse(fs.readFileSync(cache, 'utf-8'));
        if (!cacheData.skillChapters) {
            return res.status(404).json({ message: 'skillChapter not found in cache.' });
        }
        return res.status(200).json(cacheData.skillChapters);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deleter = async (req, res) => {
    try {
        const { skillChapter_Id } = req.params;
        const result = await SkillChapter.destroy({ where: { skillChapter_Id } });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const update = async (req, res) => {
    try {
        const { skillChapter_Id } = req.params;
        const { skill_Id, chapter_Id } = req.body;
        const skillChapter = await SkillChapter.update({ skill_Id, chapter_Id }, {where: {skillChapter_Id}});
        return res.status(200).json(skillChapter);
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