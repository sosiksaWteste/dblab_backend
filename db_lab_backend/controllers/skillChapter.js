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
        const skillChapter = await SkillChapter.findAll();
        return res.status(200).json(skillChapter);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deleter = async (req, res) => {
    try {
        const { skillChapter_Id } = req.body;
        const result = await SkillChapter.destroy({ where: { skillChapter_Id } });
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