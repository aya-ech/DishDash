const Role = require('../models/Role')

exports.createRole = async (req, res) => {
    const newRole = new Role (req.body);
  
    try {
        const savedRole = await newRole.save();
        return res.status(201).json(savedRole);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
  };
  
  exports.getRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        return res.status(200).json(roles);
    } catch (err) {
        return res.status(500).json({ error: "Failed to retrieve role items" });
    }
  };
  
  exports.getRoleById = async (req, res) => {
    try {
        const role = await Role.findById(req.params.id);
        if (!role) return res.status(404).json({ error: "Role not found" });
        return res.status(200).json(role);
    } catch (err) {
        return res.status(500).json({ error: "Failed to retrieve role item" });
    }
  };
  
  
  