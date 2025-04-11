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
        const language = await Language.findAll();
        return res.status(200).json(language);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deleter = async (req, res) => {
    try {
        const { language_Id } = req.body;
        const result = await Language.destroy({ where: { language_Id } });
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