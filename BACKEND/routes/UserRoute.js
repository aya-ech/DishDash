const express = require('express');
const { createUser, getUsers, getUserById, updateUser, deleteUser } = require('../controllers/UserController');
const { authenticateToken} = require('./UserAuth');
const routerUser = express.Router();

routerUser.post("/users", createUser );

routerUser.get("/users", getUsers );

routerUser.get("/user/:id",authenticateToken ,getUserById ); //

routerUser.put("/users/update/:id", authenticateToken,updateUser );

routerUser.delete("/users/:id", authenticateToken,deleteUser ); 

module.exports = routerUser;
