const User = require('../models/User');


const addToCart = async (req, res) => {
    try {
        let userData = await User.findById(req.user._id);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cart = userData.cart || {};
        if (!cart[req.body.itemId]) {
            cart[req.body.itemId] = 1;
        } else {
            cart[req.body.itemId] += 1;
        }

        userData.cart = cart;
        await User.findByIdAndUpdate(req.user._id , { cart });

        res.json({ success: true, message: "Added to cart" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error adding to cart" });
    }
};


const removeFromCart = async(req,res) =>{
    try {
        let userData = await User.findById(req.user._id);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cart = userData.cart || {};
        if (cart[req.body.itemId]>0) {
            cart[req.body.itemId] -= 1;
        }
        userData.cart = cart;
        await User.findByIdAndUpdate(req.user._id , { cart });

        res.json({ success: true, message: "Removed from cart" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error:error.message });
    }
};


const getCart = async(req,res) =>{
    try {
        
    let userData = await User.findById(req.user._id).populate('cart.items');;
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        let cart = userData.cart || {};
        res.json({success:true,cart})
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error:error.message })
    }

}
const deleteFromCart = async (req, res) => {
    try {
        let userData = await User.findById(req.user._id);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cart = userData.cart || {};
        const itemId = req.body.itemId;

        if (cart[itemId]) {

            delete cart[itemId];
            
            userData.cart = cart;
            await User.findByIdAndUpdate(req.user._id, { cart });
            
            res.json({ success: true, message: "Item removed from cart" });
        } else {
            res.status(404).json({ success: false, message: "Item not found in cart" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
};
module.exports = {
    addToCart,
    removeFromCart,
    getCart,
    deleteFromCart
  };