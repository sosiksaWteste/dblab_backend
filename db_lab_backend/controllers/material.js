const Material = require('../models/Relations').Material;

const create = async (req, res) => {
    try {
        const { event_Id, material_name, file, material_type } = req.body;
        const material = await Material.create({ event_Id, material_name, file, material_type });
        return res.status(201).json(material);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getAll = async (req, res) => {
    try {
        const material = await Material.findAll();
        return res.status(200).json(material);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deleter = async (req, res) => {
    try {
        const { material_Id } = req.body;
        const result = await Material.destroy({ where: { material_Id } });
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