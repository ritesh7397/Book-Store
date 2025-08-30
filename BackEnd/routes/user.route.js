const router = require("express").Router();
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");
require('dotenv').config();

// SIGN UP
router.post("/sign-up", async (req, res) => {
    try {
        const { username, email, password, address } = req.body;

        // Check username length is more than 4
        if (username.length <= 4) {
            return res
                .status(400)
                .json({ message: "Username length should be greater than 4" });
        }

        // Check username already exists
        const existingUsername = await User.findOne({ username: username });
        if (existingUsername) {
            return res
                .status(400)
                .json({ message: "Username already exists" });
        }

        // Check email already exists
        const existingEmail = await User.findOne({ email: email });
        if (existingEmail) {
            return res
                .status(400)
                .json({ message: "Email already exists" });
        }

        // Check password length is less than equal to 5
        if (password.length <= 5) {
            return res
                .status(400)
                .json({ message: "Password's length should be greater than 5" });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username: username,
            email: email,
            password: hashPassword,
            address: address,
        });
        await newUser.save();
        res.status(200).json({ message: "SignUp Successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// SIGN IN
router.post("/sign-in", async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        await bcrypt.compare(password, existingUser.password,(err, data)=>{
            if(data)
            {
                const authClaims = [
                    {name: existingUser.username},
                    {role: existingUser.role},
                ];
                const token = jwt.sign({authClaims}, process.env.ACCESS_TOKEN_SECRET,{
                    expiresIn : "30d",

                });
                return res.status(200).json({ id: existingUser._id, role: existingUser.role, token: token });
            }
            else{
                return res.status(400).json({ message: "Invalid Credentials" });
            }
        });

    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET USER INFORMATION
router.get("/get-user-information",authenticateToken, async (req, res) => {
    try {
        const userId = req.headers;
        const data = await User.findById(userId);
        return res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
    });

module.exports = router;