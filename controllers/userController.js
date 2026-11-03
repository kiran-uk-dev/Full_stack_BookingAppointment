const User = require('../models/User');

const addUser = async (req, res) => {
    try {
        const { username, email, phone } = req.body;

        const user = await User.create({
            username,
            email,
            phone
        });

        res.status(201).json({
            message: 'User added successfully',
            data: user
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();

        res.status(200).json({
            message: 'Users fetched successfully',
            data: users
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        await user.destroy();

        res.status(200).json({
            message: 'User deleted successfully'
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


module.exports = {
    addUser,
    getUsers,
    deleteUser
};