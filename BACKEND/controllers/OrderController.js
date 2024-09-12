const Order = require('../models/Order')
const User = require('../models/User')
exports.createOrder = async (req, res) => {
    const { user, foods, total, name ,address, phone } = req.body;
    const newOrder = new Order({
        user: user,
        foods: foods,
        total: total,
        name: name,
        address: address,
        phone: phone
    });
    
    try {
        const savedOrder = await newOrder.save();
        await User.findByIdAndUpdate(user, {cart:{}},{ new: true });
        return res.status(201).json(savedOrder);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find()
        return res.status(200).json(orders);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            if (!order){
                return res.status(404).json({ error : "Order not found"})
            }
        return res.status(200).json(order);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        
        
        if (!updatedOrder) {
            return res.status(404).json({ error: "Order not found" });
        }
        return res.status(200).json(updatedOrder);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id, req.body)
        
        if (!deletedOrder) {
            return res.status(404).json({ error: "Order not found" });
        }
        return res.status(200).json({message: "deleted successfully"});
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

exports.getOrdersByUserId = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.params.userId })
        console.log('orders ; ', orders)
        if (!orders || orders.length === 0) {
            return res.status(404).json({ error: "No orders found for this user" });
        }
        
        return res.status(200).json(orders);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

// exports.updateStatus = async (req, res) => {
//     const { orderId } = req.params;
//     const { status } = req.body;
  
//     try {
    
//       const updatedOrder = await Order.findByIdAndUpdate(
//         orderId,
//         { status },
//         { new: true } 
//       );
//     //   if (!updatedOrder) {
//     //     return res.status(404).json({ message: 'Order not found' });
//     //   }
  
//       res.status(200).json({ message: 'Order status updated successfully', updatedOrder });
//     } catch (error) {
//       res.status(500).json({ message: 'Server error', error: error.message });
//     }
//   };


