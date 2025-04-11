const Teacher = require('../models/Relations').Teacher;

const create = async (req, res) => {
    try {
        const { user_Id, full_name, place_of_Employment, position, text, level, teacher_role, photo } = req.body;
        const teacher = await Teacher.create({ user_Id, full_name, place_of_Employment, position, text, level, teacher_role, photo });
        return res.status(201).json(teacher);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getAll = async (req, res) => {
    try {
        const teachers = await Teacher.findAll();
        return res.status(200).json(teachers);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deleter = async (req, res) => {
    try {
        const { teacher_Id } = req.body;
        const result = await Teacher.destroy({ where: { teacher_Id } });
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