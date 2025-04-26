const path = require('path');
const fs = require('fs');
const cache = path.join(__dirname, '..', 'cache.json');
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
        const cacheData = JSON.parse(fs.readFileSync(cache, 'utf-8'));
        if (!cacheData.events) {
            return res.status(404).json({ message: 'event not found in cache.' });
        }
        return res.status(200).json(cacheData.events);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deleter = async (req, res) => {
    try {
        const { event_Id } = req.params;
        const result = await Event.destroy({ where: { event_Id } });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const update = async (req, res) => {
    try {
        const { event_Id } = req.params;
        const { teacher_Id, lesson_Id, event_name, type, format, begin_date, status } = req.body;
        const event = await Event.update({ teacher_Id, lesson_Id, event_name, type, format, begin_date, status }, {where: {event_Id}});
        return res.status(200).json(event);
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