const Discipline = require('../models/Relations').Discipline;
const Skill = require('../models/Relations').Skill;
const Teacher = require('../models/Relations').Teacher;
const { Sequelize} = require('sequelize');

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
        const discipline = await Discipline.findAll();
        return res.status(200).json(discipline);
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
        const disciplines = await Discipline.findAll({
            attributes: [
                'discipline_Id',
                'discipline_name',
                'discipline_Description',
                'discipline_type',
                'volume',
                'syllabus_link',
                [Sequelize.fn('GROUP_CONCAT', Sequelize.col('Teachers.full_name')), 'teachers'],
                [Sequelize.fn('GROUP_CONCAT', Sequelize.col('Skills.skill_name')), 'skills']
            ],
            include: [
                {
                    model: Teacher,
                    attributes: [],
                    through: { attributes: [] },
                    as: 'Teachers'
                },
                {
                    model: Skill,
                    attributes: [],
                    through: { attributes: [] },
                    as: 'Skills'
                }
            ],
            group: ['Discipline.discipline_Id'],
        });
        return res.status(200).json(disciplines);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }}
  
module.exports = {
    create,
    getAll,
    deleter,
    getFull,
};