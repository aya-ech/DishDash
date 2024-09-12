const express = require('express');
const {addToCart, removeFromCart, getCart, deleteFromCart} = require('../controllers/CartController');
const { authenticateToken } = require('./UserAuth');
const routerCart = express.Router();

routerCart.post("/add",authenticateToken,addToCart),
routerCart.post("/remove",authenticateToken,removeFromCart),
routerCart.post("/delete", authenticateToken,deleteFromCart),
routerCart.get("/get", authenticateToken,getCart),

module.exports = routerCart;