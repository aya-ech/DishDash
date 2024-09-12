const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    Id_role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required: true
    },
    addresses: [String],
    phones: [String],
    cart:{
        type: Object,
        default:{}
    }
},{ minimize: false });

const User = mongoose.model('User', UserSchema);

module.exports = User;
