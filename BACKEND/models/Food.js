const mongoose = require('mongoose');

const FoodSchema = mongoose.Schema(
    {
        name:{
            type : String,
            required : true
        },
        desc:{
            type : String,
            required : true
        },
        price:{
            type : Number,
            required : true ,
            default : 0
        },
        image:{
            type : String,
            required : true
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true
        },
    },
    {
        Timestamp : true
    } 
);
    const Food = mongoose.model('Food', FoodSchema);

    module.exports = Food;