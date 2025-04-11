const DevelopmentDirection = require('../models/Relations').DevelopmentDirection;

const create = async (req, res) => {
    try {
        const { development_direction_name, development_direction_Description } = req.body;
        const developmentDirection = await DevelopmentDirection.create({ development_direction_name, development_direction_Description });
        return res.status(201).json(developmentDirection);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getAll = async (req, res) => {
    try {
        const developmentDirection = await DevelopmentDirection.findAll();
        return res.status(200).json(developmentDirection);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deleter = async (req, res) => {
    try {
        const { developmentDirection_Id } = req.body;
        const result = await DevelopmentDirection.destroy({ where: { developmentDirection_Id } });
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