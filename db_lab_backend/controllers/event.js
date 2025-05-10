const path = require('path');
const fs = require('fs');
const cache = path.join(__dirname, '..', 'cache.json');
const Event = require('../models/Relations').Event;
const Teacher = require('../models/Relations').Teacher;
const Lesson = require('../models/Relations').Lesson;

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

const getFromDb = async (req, res) => {
    try {
        const formatDate = (dateStr) => {
            const date = new Date(dateStr);
            const dd = String(date.getDate()).padStart(2, '0');
            const mm = String(date.getMonth() + 1).padStart(2, '0');
            const yyyy = date.getFullYear();
            return `${dd}.${mm}.${yyyy}`;
        };
        const formatTime = (timeStr) => {
            return timeStr.slice(0, 5);
        };
        const getWeekdayShort = (dateStr) => {
            const days = ['нд', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
            const date = new Date(dateStr);
            return days[date.getDay()];
        };
        const events = await Event.findAll({
            include: [
                {
                    model: Lesson,
                    attributes: { exclude: [] }
                },
                {
                    model: Teacher,
                    attributes: ['full_name']
                },
            ]
        });
        const result = events.map(event => {
            const { Lesson: lesson, Teacher, begin_date, ...eventData } = event.toJSON();
            const lessonDateFormatted = formatDate(lesson.lesson_date);
            const lessonTimeFormatted = formatTime(lesson.lesson_time);
            const weekday = getWeekdayShort(lesson.lesson_date);
            const lesson_desc = `${lesson.name}, ${weekday} ${lessonDateFormatted} ${lessonTimeFormatted}`;
            const beginDateFormatted = begin_date ? `${formatDate(begin_date)} ${new Date(begin_date).toTimeString().slice(0, 5)}` : null;
            return {
                ...eventData,
                lesson_desc,
                teacher_name: Teacher.full_name,
                begin_date: beginDateFormatted,
            };
        });
        return res.status(200).json(result);
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
    update,
    getFromDb
};