const Chapter = require('../models/Relations').Chapter;

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
        const chapter = await Chapter.findAll();
        return res.status(200).json(chapter);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deleter = async (req, res) => {
    try {
        const { chapter_Id } = req.body;
        const result = await Chapter.destroy({ where: { chapter_Id } });
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