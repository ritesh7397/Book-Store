const router = require("express").Router();
const User = require("../models/user.model");

// Sign Up
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

        const newUser = new User({
            username: username,
            email: email,
            password: password,
            address: address,
        });
        await newUser.save();
        res.status(200).json({ message: "SignUp Successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;