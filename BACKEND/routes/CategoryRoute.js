const express = require('express');
const Category = require("../models/Category");
const { getCategoryById, deleteCategory, getCategories, deleteCategoryAndFoods, updateCategory } = require('../controllers/CategoryController');
const { verifyAdmin, authenticateToken } = require('./UserAuth');
const multer = require('multer')


const routerCategory = express.Router();

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`);
    }
  });
  
  const upload = multer({ storage: storage });
  
  routerCategory.post("/categories", authenticateToken,verifyAdmin,upload.single("image"), async (req, res) => {
    try {
      const newCategory = new Category({
        category_name: req.body.category_name,
        category_img: req.file.filename,
      });
  
      const savedCategory = await newCategory.save();
      return res.status(201).json(savedCategory);
    } catch (err) {
      return res.status(400).json({ success: false, error: err.message });
    }
  });
   
routerCategory.get("/categories", getCategories);
routerCategory.get("/categories/:id", getCategoryById);
// routerCategory.delete("/categories/:id",  deleteCategory);

routerCategory.delete("/categories/:id",authenticateToken,verifyAdmin,deleteCategoryAndFoods);
routerCategory.put("/categories/:id",authenticateToken,verifyAdmin,updateCategory);
//authenticateToken,verifyAdmin,

module.exports = routerCategory;
