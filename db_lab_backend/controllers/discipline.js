const path = require('path');
const fs = require('fs');
const cache = path.join(__dirname, '..', 'cache.json');
const Discipline = require('../models/Relations').Discipline;

const create = async (req, res) => {
    try {
        const { discipline_name, discipline_Description, discipline_type, volume, syllabus_link } = req.body;
        const discipline = await Discipline.create({ discipline_name, discipline_Description, discipline_type, volume, syllabus_link });
        return res.status(201).json(discipline);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getAll = async (req, res) => {
    try {
        const cacheData = JSON.parse(fs.readFileSync(cache, 'utf-8'));
        if (!cacheData.disciplines) {
            return res.status(404).json({ message: 'discipline not found in cache.' });
        }
        return res.status(200).json(cacheData.disciplines);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deleter = async (req, res) => {
    try {
        const { discipline_Id } = req.body;
        const result = await Discipline.destroy({ where: { discipline_Id } });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getFull = async (req, res) => {
    try {
        const cacheData = JSON.parse(fs.readFileSync(cache, 'utf-8'));
        const {
            disciplines,
            disciplineTeachers,
            teachers,
            disciplineSkills,
            skills
        } = cacheData;
        const enrichedDisciplines = disciplines.map(discipline => {
            const relatedTeacherIds = disciplineTeachers
                .filter(dt => dt.discipline_Id === discipline.discipline_Id)
                .map(dt => dt.teacher_Id);
            const teacherNames = teachers
                .filter(t => relatedTeacherIds.includes(t.teacher_Id))
                .map(t => t.full_name);
            const relatedSkillIds = disciplineSkills
                .filter(ds => ds.discipline_Id === discipline.discipline_Id)
                .map(ds => ds.skill_Id);
            const skillNames = skills
                .filter(s => relatedSkillIds.includes(s.skill_Id))
                .map(s => s.skill_name);
            return {
                ...discipline,
                teachers: teacherNames.join(', '),
                skills: skillNames.join(', ')
            };
        });
        return res.status(200).json(enrichedDisciplines);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
  
module.exports = {
    create,
    getAll,
    deleter,
    getFull,
};