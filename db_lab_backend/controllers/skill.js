const path = require('path');
const fs = require('fs');
const cache = path.join(__dirname, '..', 'cache.json');
const Skill = require('../models/Relations').Skill;

const create = async (req, res) => {
    try {
        const { skill_name } = req.body;
        const skill = await Skill.create({ skill_name });
        return res.status(201).json(skill);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getAll = async (req, res) => {
    try {
        const cacheData = JSON.parse(fs.readFileSync(cache, 'utf-8'));
        if (!cacheData.skills) {
            return res.status(404).json({ message: 'skill not found in cache.' });
        }
        return res.status(200).json(cacheData.skills);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deleter = async (req, res) => {
    try {
        const { skill_Id } = req.params;
        const result = await Skill.destroy({ where: { skill_Id } });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const update = async (req, res) => {
    try {
        const { skill_Id } = req.params;
        const { skill_name } = req.body;
        const skill = await Skill.update({ skill_name }, {where: {skill_Id}});
        return res.status(200).json(skill);
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