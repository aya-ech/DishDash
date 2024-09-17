const Food = require('../models/Food')


exports.getFoods = async (req, res) => {
  try {
      const foods = await Food.find().populate('category');
      return res.status(200).json(foods);
  } catch (err) {
      return res.status(500).json({ error: "Failed to retrieve food items" });
  }
};

exports.getFoodById = async (req, res) => {
  try {
      const food = await Food.findById(req.params.id).populate('category');
      if (!food) return res.status(404).json({ error: "Food not found" });
      return res.status(200).json(food);
  } catch (err) {
      return res.status(500).json({ error: "Failed to retrieve food item" });
  }
};



exports.deleteFood = async (req, res) => {
  try {
      const deletedFood = await Food.findByIdAndDelete(req.params.id);
      if (!deletedFood) return res.status(404).json({ error: "Food not found" });
      return res.status(200).json({ message: "Food item deleted successfully" });
  } catch (err) {
      return res.status(500).json({ error: "Failed to delete food item" });
  }
};
exports.getFoodsByCategory = async (req, res) => {
  try {
      const foods = await Food.find({ category: req.params.categoryId }).populate('category');
      if (foods.length === 0) {
          return res.status(404).json({ error: "No foods found for this category" });
      }
      await Food.deleteMany({ category: req.params.categoryId });
      return res.status(200).json({message: "foods deleted successfully"},foods);
  } catch (err) {
      return res.status(400).json({ error: err.message });
  }
};