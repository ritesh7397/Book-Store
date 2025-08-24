const mongoose = require('mongoose'); 
require('dotenv').config();


const URI =  process.env.MONGODB_URI;

try{
    mongoose.connect(URI)
    console.log("Connected to MongoDB server")
}
catch(error){
    console.log("Error",error)
}

module.exports = URI;