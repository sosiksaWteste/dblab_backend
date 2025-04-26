const path = require('path');
const fs = require('fs');
const cache = path.join(__dirname, '..', 'cache.json');
const Language = require('../models/Relations').Language;

const create = async (req, res) => {
    try {
        const { language_name } = req.body;
        const language = await Language.create({ language_name });
        return res.status(201).json(language);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getAll = async (req, res) => {
    try {
        const cacheData = JSON.parse(fs.readFileSync(cache, 'utf-8'));
        if (!cacheData.languages) {
            return res.status(404).json({ message: 'language not found in cache.' });
        }
        return res.status(200).json(cacheData.languages);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deleter = async (req, res) => {
    try {
        const { language_Id } = req.params;
        const result = await Language.destroy({ where: { language_Id } });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const update = async (req, res) => {
    try {
        const { language_Id } = req.params;
        const { language_name } = req.body;
        const language = await Language.update({ language_name }, {where: {language_Id}});
        return res.status(200).json(language);
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