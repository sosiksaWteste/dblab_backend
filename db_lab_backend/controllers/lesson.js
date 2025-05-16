const path = require('path');
const fs = require('fs');
const cache = path.join(__dirname, '..', 'cache.json');
const {Lesson, Teacher, Event, Material} = require('../models/Relations');
const { Op } = require('sequelize');

const create = async (req, res) => {
    try {
        const { name, lesson_date, lesson_time, link, repeat, end_date } = req.body;
        const parseDate = (dateStr, timeStr) => {
            const [day, month, year] = dateStr.split('.');
            return new Date(`${year}-${month}-${day}T${timeStr}:00`);
        };
        if (repeat > 0) {
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
            const parsedDate = parseDate(lesson_date, lesson_time);
            const lesson = await Lesson.create({
                name,
                lesson_date: parsedDate,
                lesson_time,
                link
            });
            return res.status(201).json(lesson);
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
};

const getAll = async (req, res) => {
    try {
        const cacheData = JSON.parse(fs.readFileSync(cache, 'utf-8'));
        if (!cacheData.lessons) {
            return res.status(404).json({ message: 'lesson not found in cache.' });
        }
        const formattedLessons = cacheData.lessons.map(lesson => ({
            ...lesson,
            lesson_date: formatDate(lesson.lesson_date)
        }));
        return res.status(200).json(formattedLessons);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getFromDb = async (req, res) => {
    try {
        const lessons = await Lesson.findAll({});
        const formattedLessons = lessons.map(lesson => {
            const data = lesson.toJSON();
            return {
                ...data,
                lesson_date: formatDate(data.lesson_date)
            };
        });
        return res.status(200).json(formattedLessons);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getLessonsBetweenDates = async (req, res) => {
    try {
        const cacheData = JSON.parse(fs.readFileSync(cache, 'utf-8'));

        const formatDateTime = (dateStr) => {
            const date = new Date(dateStr);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return `${day}.${month}.${year} ${hours}:${minutes}`;
        };
        const formatTime = (timeStr) => {
            if (!timeStr) return null;
            return timeStr.slice(0,5);
        };
        const parseDateOnly = (dateStr) => {
            if (!dateStr || typeof dateStr !== 'string') {
                throw new Error('Invalid date format');
            }
            const [day, month, year] = dateStr.split('.');
            return new Date(`${year}-${month}-${day}`);
        };
        const { start_date, end_date } = req.query;
        if (!start_date || !end_date) {
            return res.status(400).json({ message: 'start_date and end_date are required in format dd.mm.yyyy' });
        }
        const start = parseDateOnly(start_date);
        const end = parseDateOnly(end_date);
        const lessons = cacheData.lessons.filter(lesson => {
            const lessonDate = new Date(lesson.lesson_date);
            return lessonDate >= start && lessonDate <= end;
        });
        const result = lessons.map(lesson => {
            const relatedEvents = cacheData.events.filter(event => event.lesson_Id === lesson.lesson_Id);
            const events = relatedEvents.map(event => {
                const teacher = cacheData.teachers?.find(t => t.teacher_Id === event.teacher_Id);
                const materials = cacheData.materials?.filter(m => m.event_Id === event.event_Id) || [];
                return {
                    ...event,
                    begin_date: formatDateTime(event.begin_date),
                    teacher_name: teacher?.full_name || null,
                    materials
                };
            });
            return {
                ...lesson,
                lesson_date: formatDate(lesson.lesson_date),
                lesson_time: formatTime(lesson.lesson_time),
                events
            };
        });
        return res.status(200).json(result);
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
    getFromDb,
    getLessonsBetweenDates
};