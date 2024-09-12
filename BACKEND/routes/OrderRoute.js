
const express = require('express');
const { createOrder, getOrders, getOrderById, getOrdersByUserId, updateOrder, deleteOrder, updateStatus } = require('../controllers/OrderController');
const { authenticateToken, verifyUser, verifyAdmin } = require('./UserAuth');
const routerOrder = express.Router();


routerOrder.post("/orders",authenticateToken,createOrder);

routerOrder.get("/orders", authenticateToken,verifyAdmin,getOrders);

routerOrder.get("/orders/:id", authenticateToken,verifyAdmin, getOrderById);

routerOrder.get("/orders/user/:userId", authenticateToken,getOrdersByUserId);

routerOrder.put("/orders/:id", authenticateToken,verifyAdmin, updateOrder);


routerOrder.delete("/orders/:id", authenticateToken, verifyAdmin,deleteOrder);


module.exports = routerOrder;

