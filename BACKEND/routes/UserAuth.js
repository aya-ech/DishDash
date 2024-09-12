const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Role = require('../models/Role');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const userIdHeader = req.headers["user-id"];

    if (!token) {
        return res.status(401).json({ message: "Authentication token required" });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Token is not valid" });
        }


        try {
            const user = await User.findById(decoded.id).populate('Id_role');
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            if (userIdHeader && userIdHeader !== decoded.id) {
                return res.status(403).json({ message: "User ID does not match the token" });
            }
            req.user = user;
            req.userId = decoded.id;
            next();
        } catch (err) {
            return res.status(500).json({ message: "Internal server error" });
        }
    });
};


// const verifyUser = (req, res, next) => {
//     authenticateToken(req, res, async () => {
//         if (req.user._id.equals(req.params.id) || req.user.Id_role.role_name === 'admin') {
//             next();
//         } else {
//             return res.status(403).json({ message: "You are not authorized!" });
//         }
//     });
// };

const verifyAdmin = (req, res, next) => {
    authenticateToken(req, res, async () => {
        if (req.user.Id_role.role_name === 'admin') {
            next();
        } else {
            return res.status(403).json({ message: "You are not authorized!" });
        }
    });
};

module.exports = { authenticateToken,verifyAdmin };
