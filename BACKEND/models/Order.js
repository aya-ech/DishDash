const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  
        required: true
    },
    
    foods: 
    {
        type:Array,
        required:true
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: [ 'In process', 'Out for delivery', 'Delivered'],
        default: 'In process',
        required: true
    },
    name:{
        type: String, 
        required: true
    },
    address:{
        type: String, 
        required: true
    },
    phone:{
        type: String, 
        required: true
    },
},
   { timestamps: true }
);

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
