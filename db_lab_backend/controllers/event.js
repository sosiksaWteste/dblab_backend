const Event = require('../models/Relations').Event;

const create = async (req, res) => {
    try {
        const { teacher_Id, lesson_Id, event_name, type, format, begin_date, status } = req.body;
        const event = await Event.create({ teacher_Id, lesson_Id, event_name, type, format, begin_date, status });
        return res.status(201).json(event);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getAll = async (req, res) => {
    try {
        const event = await Event.findAll();
        return res.status(200).json(event);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deleter = async (req, res) => {
    try {
        const { event_Id } = req.body;
        const result = await Event.destroy({ where: { event_Id } });
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