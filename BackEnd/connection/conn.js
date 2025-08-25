const mongoose = require('mongoose');
require('dotenv').config();


const conn = process.env.MONGODB_URI;

try {
    mongoose.connect(conn)
    console.log("Connected to MongoDB server");
}
catch (error) {
    console.log("Error", error)
}

module.exports = conn;
