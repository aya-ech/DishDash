const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    role_name: {
        type: String,
        enum: ['client', 'admin'], 
        required: true
    }
});

const Role = mongoose.model('Role', RoleSchema);

module.exports = Role;