const Category = require("../models/Category");
const Food = require("../models/Food");


// exports.createCategory = async (req, res) => {
//     let image_filename = `${req.file.filename}`;
//     const newCategory = new Category ({
//         category_name : req.body.category_name,
//         category_img:image_filename
//     });
  
//     try {
//         const savedCategory = await newCategory.save();
//         return res.status(201).json(savedCategory);
//     } catch (err) {
//         return res.status(400).json({ success:false ,error: err.message });
//     }
//   };
  
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
  exports.updateCategory = async (req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        
        
        if (!updatedCategory) {
            return res.status(404).json({ error: "Category not found" });
        }
        return res.status(200).json(updatedCategory);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};
  