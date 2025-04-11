const DisciplineSkill = require('../models/Relations').DisciplineSkill;

const create = async (req, res) => {
    try {
        const { discipline_Id, skill_Id, level_Id, learning_type } = req.body;
        const disciplineSkill = await DisciplineSkill.create({ discipline_Id, skill_Id, level_Id, learning_type });
        return res.status(201).json(disciplineSkill);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getAll = async (req, res) => {
    try {
        const disciplineSkill = await DisciplineSkill.findAll();
        return res.status(200).json(disciplineSkill);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deleter = async (req, res) => {
    try {
        const { disciplineSkill_Id } = req.body;
        const result = await DisciplineSkill.destroy({ where: { disciplineSkill_Id } });
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