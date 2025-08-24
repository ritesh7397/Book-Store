const express = require('express'); 
const app = express(); 
require('dotenv').config();
const conn = require('./connection/conn');

const PORT = process.env.PORT || 4001;

app.get('/',(req,res) =>
{
    res.send('BookStore Project')

})

app.listen(PORT,()=> 
{
    console.log(`Server started at Port ${PORT}`)
});


