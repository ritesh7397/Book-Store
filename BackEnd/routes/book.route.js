const router = require("express").Router();
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const Book = require("../models/book.model");
const { authenticateToken } = require("./user.Auth");


// ADD BOOK => THROUGH ADMIN
router.post("/add-book", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const user = await User.findById(id);
        if (user.role !== "admin") {
            return res
                .status(400)
                .json({ message: "You are not having access to perform admin work" });
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
router.put("/update-book", authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.headers;
        await Book.findByIdAndUpdate(bookid, {
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
        });
        return res.status(200).json({ message: "Book Updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});


// DELETE BOOK
router.delete("/delete-book", authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.headers;
        await Book.findByIdAndDelete(bookid);
        return res.status(200).json({ message: "Book Deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

// GET ALL BOOKS
router.get("/get-all-books", async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        return res.json({
            status: "Success",
            data: books,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

// Get Recently added books
router.get("/get-recent-books", async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 }).limit(4);
        return res.json({
            status: "Success",
            data: books,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

// GET BOOK BY ID
router.get("/get-book-by-id/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        return res.json({
            status: "Success",
            data: book,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
