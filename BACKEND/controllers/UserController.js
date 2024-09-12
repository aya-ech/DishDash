const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.createUser = async (req, res) => {
    const { name, email, password,Id_role } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = new User({
        name,
        email,
        password: hash,
        Id_role, 
    });

  
    try {
        const savedUser = await newUser.save();
        return res.status(201).json(savedUser);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
  };

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().populate('Id_role');
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('Id_role');
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
