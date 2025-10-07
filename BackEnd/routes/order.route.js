const router = require("express").Router();
const Order = require("../models/order.model");
const Book = require("../models/book.model");
const User = require("../models/user.model");

const { authenticateToken } = require("./user.Auth");

// PLACE ORDER
router.post("/place-order", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers; // <-- This may be undefined!
        const { order } = req.body;

        console.log("Received user ID from headers:", id);
        console.log("Received order:", order);

        if (!id) {
            return res.status(400).json({ message: "User ID is missing in headers." });
        }

        if (!order || !Array.isArray(order) || order.length === 0) {
            return res.status(400).json({ message: "Invalid order data." });
        }

        for (const orderData of order) {
            try {
                if (!orderData._id) {
                    console.error("Missing _id in orderData:", orderData);
                    continue;
                }

                console.log("Creating order for book ID:", orderData._id);

                const newOrder = new Order({ user: id, book: orderData._id });
                const orderDataFromDb = await newOrder.save();

                // Save order to user
                await User.findByIdAndUpdate(id, {
                    $push: { orders: orderDataFromDb._id },
                });

                // Remove from cart
                await User.findByIdAndUpdate(id, {
                    $pull: { cart: orderData._id },
                });

                console.log("Order saved and cart item removed for:", orderData._id);
            } catch (itemErr) {
                console.error("Error processing this order item:", itemErr);
            }
        }

        return res.json({
            status: "Success",
            message: "Order Placed Successfully",
        });
    } catch (error) {
        console.error("Error placing order:", error); // <--- This is the important part!
        return res.status(500).json({ message: error.message || "An error occurred" });
    }
});



// GET ORDER HISTORY OF PARTICULAR USER
router.get("/get-order-history", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate({
            path: "orders",
            populate: { path: "book" },
        });

        const orderData = userData.orders.reverse();
        return res.json({
            status: "Success",
            data: orderData,
        });
    } catch (error) {
        return res.status(500).json({ message: "An error occurred" });
    }
});

// GET ALL ORDERS
router.get("/get-all-orders", authenticateToken, async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("book")
            .populate("user")
            .sort({ createdAt: -1 }); // Already sorted, no need to reverse

        return res.json({
            status: "Success",
            data: orders,
        });
    } catch (error) {
        console.error("Error in get-all-orders:", error);
        return res.status(500).json({ message: "An error occurred" });
    }
});

// UPDATE ORDER ==> ADMIN
router.put("/update-status/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        await Order.findByIdAndUpdate(id, { status: req.body.status });
        return res.json({
            status: "Success",
            message: "Status Up,dated Successfully"
        });
    } catch (error) {
        return res.status(500).json({ message: "An error occurred" });
    }
});
module.exports = router;