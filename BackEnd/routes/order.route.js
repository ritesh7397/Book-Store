const router = require("express").Router();
const Order = require("../models/order.model");
const Book = require("../models/book.model");
const User = require("../models/user.model");

const { authenticateToken } = require("./user.Auth");

// PLACE ORDER
router.post("/place-order", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { order } = req.body;

        for (const orderData of order) {
            const newOrder = new Order({ user: id, book: orderData._id });
            const orderDataFromDb = await neworder.save();

            // saving Order in user model
            await User.findByIdAndUpdate(id, {
                $push: { orders: orderDataFromDb.id },
            });

            //cLearing cart
            await User.findByIdAndUpdate(id, {
                $pull: { cart: orderData._id },
            });
        }
        return res.json({
            status: "Success",
            message: "Order Placed Successfully",
        });
    } catch (error) {
        return res.status(S00).json({ message: "An error occurred" });
    }
});


// GET ORDER HISTORY OF PARTICULAR USER
router.get("/get-order-history", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate({
            path: "orders",
            populate: {path: "book"},
        });
     
        const orderData = userData.orders.revers();
        return res.json({
            status: "Success",
            data: orderData,
        });
    } catch (error) {
        return res.status(S00).json({ message: "An error occurred" });
    }
});

//GET ALL ORDERS
router.get("/get-all-orders", authenticateToken, async (req, res) => {
    try {
        const userData = await Order.find()
        .populate({
            path: "book",
        })
         .populate({
            path: "user",
        })
        .sort({createdAt: -1});
        const orderData = userData.orders.revers();
        return res.json({
            status: "Success",
            data: userData,
        });
    } catch (error) {
        return res.status(S00).json({ message: "An error occurred" });
    }
});

// UPDATE ORDER ==> ADMIN
router.put("/update-status/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        await Order.findByIdAndUpdate(id, {status: req.body.status});
        return res.json({
            status: "Success",
            message: "Status Up,dated Successfully"
        });
    } catch (error) {
        return res.status(S00).json({ message: "An error occurred" });
    }
});
module.exports = router;