const path = require('path');
const fs = require('fs');
const cache = path.join(__dirname, '..', 'cache.json');
const Lesson = require('../models/Relations').Lesson;

const create = async (req, res) => {
    try {
        const { name, lesson_date, lesson_time, link, repeat, end_date } = req.body;
        if (repeat > 0) {
            const parseDate = (dateStr, timeStr) => {
                const [day, month, year] = dateStr.split('.');
                return new Date(`${year}-${month}-${day}T${timeStr}:00`);
            };
            let lessons = []
            let currentDate = parseDate(lesson_date, lesson_time);
            const finalDate = parseDate(end_date, lesson_time);
            while (currentDate <= finalDate) {
                lessons.push({
                    name,
                    lesson_date: new Date(currentDate),
                    lesson_time,
                    link
                });
                currentDate.setDate(currentDate.getDate() + parseInt(repeat));
            }
            const createdLessons = await Lesson.bulkCreate(lessons);
            return res.status(201).json(createdLessons);
        } else {
            const lesson = await Lesson.create({ name, lesson_date, lesson_time, link });
            return res.status(201).json(lesson);
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getAll = async (req, res) => {
    try {
        const cacheData = JSON.parse(fs.readFileSync(cache, 'utf-8'));
        if (!cacheData.lessons) {
            return res.status(404).json({ message: 'lesson not found in cache.' });
        }
        return res.status(200).json(cacheData.lessons);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getFromDb = async (req, res) => {
    try {
        const lessons = await Lesson.findAll({});
        return res.status(200).json(lessons);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deleter = async (req, res) => {
    try {
        const { lesson_Id } = req.params;
        const result = await Lesson.destroy({ where: { lesson_Id } });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const update = async (req, res) => {
    try {
        const { lesson_Id } = req.params;
        const { name, lesson_date, lesson_time, link } = req.body;
        const lesson = await Lesson.update({ name, lesson_date, lesson_time, link }, {where: {lesson_Id}});
        return res.status(200).json(lesson);
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