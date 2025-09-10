const router = require("express").Router();
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const Book = require("../models/book.model");
const { authenticateToken } = require("./user.Auth");


// ADD BOOK => ADMIN
router.post("/add-book", authenticateToken, async (req, res) => {
    try {
        const{id} = req.headers;
        const user = await User.findById(id);
        if(user.role !== "admin"){
            return res
                .status(400)
                .json({message: "You are not having access to perform admin work"});
        }
        const book = new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
        });
        await book.save();
        res.status(200).json({ message: "Book Added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
})
module.exports = router;

// UPDATE BOOK
router.post("/update-book", authenticateToken, async (req, res) => {
    try {
        const{bookid} = req.headers;
        const user = await User.findById(bookid);
        if(user.role !== "admin"){
            return res
                .status(400)
                .json({message: "You are not having access to perform admin work"});
        }
        const book = new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
        });
        await book.save();
        res.status(200).json({ message: "Book Added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
})
module.exports = router;