const bcrypt = require('bcryptjs');
const User = require('../models/Relations').User;

const create = async (req, res) => {
    try {
        const { nickname, email, login, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ nickname, email, login, password:hashedPassword, role });
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
        const { user_Id } = req.params;
        const result = await User.destroy({ where: { user_Id } });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const update = async (req, res) => {
    try {
        const { user_Id } = req.params;
        const { nickname, email, login, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.update({ nickname, email, login, password:hashedPassword, role }, {where: {user_Id}});
        return res.status(200).json(user);
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