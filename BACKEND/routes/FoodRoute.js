const FoodControllers = require('../controllers/FoodController')
const express = require('express');
const { verifyAdmin, authenticateToken } = require('./UserAuth');
const routerFood = express.Router();
const multer = require('multer');
const Food = require('../models/Food');


const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`);
    }
  });
  
  const upload = multer({ storage: storage });
  
  routerFood.post("/foods", authenticateToken,verifyAdmin,upload.single("image"), async (req, res) => {
  
    try {
      const newFood = new Food({
        name: req.body.name,
        desc: req.body.desc,
        price: req.body.price,
        image: req.file.filename,
        category: req.body.category,
      });
  
      const savedFood = await newFood.save();
      return res.status(201).json(savedFood);
    } catch (err) {
      return res.status(400).json({ success: false, error: err.message });
    }
  });

routerFood.get("/foods", FoodControllers.getFoods);

routerFood.get("/foods/:id", FoodControllers.getFoodById);

routerFood.get("/foods/category/:categoryId",FoodControllers.getFoodsByCategory);

routerFood.put("/foods/:id", authenticateToken, verifyAdmin, upload.single("image"), async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ error: "Food not found" });
    }

    
    food.name = req.body.name || food.name;
    food.desc = req.body.desc || food.desc;
    food.price = req.body.price || food.price;
    food.category = req.body.category || food.category;


    if (req.file) {
      food.image = req.file.filename;  
    }

    const updatedFood = await food.save();
    return res.status(200).json(updatedFood);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});


routerFood.delete("/foods/:id",authenticateToken,verifyAdmin, FoodControllers.deleteFood);



module.exports = routerFood;
