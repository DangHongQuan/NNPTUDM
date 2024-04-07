// Import necessary modules
const express = require("express");
const router = express.Router();
const Cart = require("../schemas/cart"); // Assuming your model file is in the same directory

// Route to handle adding a new item to the cart
router.post("/add", async (req, res) => {
    try {
        // Create a new cart item based on request body
        const newItem = await Cart.create(req.body);
        res.status(201).json(newItem); // Send back the newly created item
    } catch (error) {
        res.status(500).json({ error: error.message }); // If there's an error, send back an error message
    }
});

module.exports = router;
