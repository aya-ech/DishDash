const express = require('express');
const { createRole, getRoles, getRoleById } = require('../controllers/RoleController');
const routerRole = express.Router();


routerRole.post("/roles", createRole);
routerRole.get("/roles", getRoles);
routerRole.get("/roles/:id", getRoleById);

module.exports = routerRole;
