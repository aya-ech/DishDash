const express = require('express');
const { register, login } = require('../controllers/Auth');
const routerAuth = express.Router();

routerAuth.post("/register" , register);
routerAuth.post("/login" , login);

module.exports = routerAuth;