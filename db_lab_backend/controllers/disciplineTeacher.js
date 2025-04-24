const path = require('path');
const fs = require('fs');
const cache = path.join(__dirname, '..', 'cache.json');
const DisciplineTeacher = require('../models/Relations').DisciplineTeacher;

const create = async (req, res) => {
    try {
        const { teacher_Id, discipline_Id, language_Id, beginning_Year } = req.body;
        const disciplineTeacher = await DisciplineTeacher.create({ teacher_Id, discipline_Id, language_Id, beginning_Year });
        return res.status(201).json(disciplineTeacher);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getAll = async (req, res) => {
    try {
        const cacheData = JSON.parse(fs.readFileSync(cache, 'utf-8'));
        if (!cacheData.disciplineTeachers) {
            return res.status(404).json({ message: 'disciplineTeacher not found in cache.' });
        }
        return res.status(200).json(cacheData.disciplineTeachers);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deleter = async (req, res) => {
    try {
        const { disciplineTeacher_Id } = req.body;
        const result = await DisciplineTeacher.destroy({ where: { disciplineTeacher_Id } });
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