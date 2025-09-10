const express = require('express'); 
const app = express(); 
require('dotenv').config();
const URI = require('./connection/conn');

const PORT = process.env.PORT || 4001;


app.use(express.json());

app.get('/',(req,res) =>
{
    res.send('BookStore Project')

})

// ROUTES
const userRoute = require('./routes/user.route');
app.use('/api/user',userRoute);


const bookRoute = require("./routes/book.route");
app.use('/api/book', bookRoute);

app.listen(PORT,()=> 
{
    console.log(`Server Started at Port ${PORT}`)
});




