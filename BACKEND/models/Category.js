const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    category_name: {
        type: String,
        required: true
    },
    category_img: {
        type: String,
        required: false
    }
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;