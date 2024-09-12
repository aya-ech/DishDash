const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Role = require('../models/Role');
require('dotenv').config();

const generateToken = (user) => {
    const authClaims = {
        id: user._id,
        name: user.name,
        role_name: user.Id_role.role_name,
    };

    return jwt.sign(authClaims, process.env.JWT_SECRET, {
        expiresIn: "1d",
        algorithm: "HS256",
    });
};

exports.register = async (req, res, next) => {
    try {
        const { name, email, password} = req.body;

        const nameRegex = /^[A-Za-z\s]+$/;
        if (!nameRegex.test(name)) {
            return res.status(400).json({ success: false, message: "Name must contain only letters." , field:'name' });
        }

        const emailRegex = /^[A-Za-z0-9._]+@[A-Za-z0-9]+\.[A-Za-z]{2,}$/;
        if (!emailRegex.test(email) || email.includes(" ")) {
            return res.status(400).json({ success: false, message: "Please enter a valid email",field:'email' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email is already in use." ,field:'email' });
        }

        if (password.length <= 6 || password.includes(" ")) {
            return res.status(400).json({ success: false, message: "Please enter a strong password", field:'password' });
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const clientRole = await Role.findOne({ role_name: 'client' });

        const newUser = new User({
            name,
            email,
            password: hash,
            Id_role: clientRole._id,
        });

        await newUser.save();
        const populatedUser = await User.findById(newUser._id).populate('Id_role');

        const token = generateToken(populatedUser);

        res.status(200).json({ success: true,
             
            id: newUser._id,
            role_name: populatedUser.Id_role.role_name,
             token: token ,
             message: "User has been created.",});
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email }).populate('Id_role');
        if (!existingUser) {
            return res.status(400).json({ success: false, message: "Unexisting email", field:'email' });
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (isMatch) {
            const token = generateToken(existingUser);

            return res.status(200).json({
                success: true,
                id: existingUser._id,
                role_name: existingUser.Id_role.role_name,
                token: token,
                message:"success"
            });
        } else {
            return res.status(400).json({ success: false, message: "Wrong password or email" ,field:'password'});
        }
    } catch (err) {
        next(err);
    }
};




// exports.logout = (req, res) => {
//     res.cookie('access_token', '', {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//         maxAge: 0
//     });
//     res.status(200).json({ message: 'Logged out successfully' });
// };
