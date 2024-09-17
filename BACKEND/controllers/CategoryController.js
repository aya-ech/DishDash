const Category = require("../models/Category");
const Food = require("../models/Food");


  
  exports.getCategories = async (req, res) => {
    try {
        const Categories = await Category.find();
        return res.status(200).json(Categories);
    } catch (err) {
        return res.status(500).json({ error: "Failed to retrieve category items" });
    }
  };
  
  exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ error: "Category not found" });
        return res.status(200).json(category);
    } catch (err) {
        return res.status(500).json({ error: "Failed to retrieve category item" });
    }
  };
  
  exports.deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) return res.status(404).json({ error: "Category not found" });
        return res.status(200).json({ message: "Category item deleted successfully" });
    } catch (err) {
        return res.status(500).json({ error: "Failed to delete category item" });
    }
  };
  
  exports.deleteCategoryAndFoods = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }

        await Food.deleteMany({ category: req.params.id });
  
        await Category.findByIdAndDelete(req.params.id);
  
        return res.status(200).json({ message: "Category and associated foods deleted successfully" });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
  };
