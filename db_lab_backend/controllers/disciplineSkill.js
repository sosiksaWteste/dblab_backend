const path = require('path');
const fs = require('fs');
const cache = path.join(__dirname, '..', 'cache.json');
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
        const cacheData = JSON.parse(fs.readFileSync(cache, 'utf-8'));
        if (!cacheData.disciplineSkills) {
            return res.status(404).json({ message: 'disciplineSkill not found in cache.' });
        }
        return res.status(200).json(cacheData.disciplineSkills);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deleter = async (req, res) => {
    try {
        const { disciplineSkill_Id } = req.params;
        const result = await DisciplineSkill.destroy({ where: { disciplineSkill_Id } });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const update = async (req, res) => {
    try {
        const { disciplineSkill_Id } = req.params;
        const { discipline_Id, skill_Id, level_Id, learning_type } = req.body;
        const disciplineSkill = await DisciplineSkill.update({ discipline_Id, skill_Id, level_Id, learning_type }, {where: {disciplineSkill_Id}});
        return res.status(200).json(disciplineSkill);
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