const Lesson = require('../models/Relations').Lesson;

const create = async (req, res) => {
    try {
        const { name, lesson_date, lesson_time, link } = req.body;
        const lesson = await Lesson.create({ name, lesson_date, lesson_time, link });
        return res.status(201).json(lesson);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getAll = async (req, res) => {
    try {
        const lesson = await Lesson.findAll();
        return res.status(200).json(lesson);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deleter = async (req, res) => {
    try {
        const { lesson_Id } = req.body;
        const result = await Lesson.destroy({ where: { lesson_Id } });
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