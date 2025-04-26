const path = require('path');
const fs = require('fs');
const cache = path.join(__dirname, '..', 'cache.json');
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
        const cacheData = JSON.parse(fs.readFileSync(cache, 'utf-8'));
        if (!cacheData.materials) {
            return res.status(404).json({ message: 'material not found in cache.' });
        }
        return res.status(200).json(cacheData.materials);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deleter = async (req, res) => {
    try {
        const { material_Id } = req.params;
        const result = await Material.destroy({ where: { material_Id } });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const update = async (req, res) => {
    try {
        const { material_Id } = req.params;
        const { event_Id, material_name, file, material_type } = req.body;
        const material = await Material.update({ event_Id, material_name, file, material_type }, {where: {material_Id}});
        return res.status(200).json(material);
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