const User = require('../models/Relations').User;

const create = async (req, res) => {
    try {
        const { nickname, email, login, password, role } = req.body;
        const user = await User.create({ nickname, email, login, password, role });
        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getAll = async (req, res) => {
    try {
        const users = await User.findAll();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deleter = async (req, res) => {
    try {
        const { user_Id } = req.body;
        const result = await User.destroy({ where: { user_Id } });
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