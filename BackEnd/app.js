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
const bookRoute = require("./routes/book.route");
const favouriteRoute = require('./routes/favourites.route');
const cartRoute = require("./routes/cart.route")
const orderRoute = require("./routes/order.route");



app.use('/api/user',userRoute);
app.use('/api/book', bookRoute);
app.use('/api/user', favouriteRoute);
app.use('/api/user', cartRoute);
app.use('/api/user', orderRoute);

app.listen(PORT,()=> 
{
    console.log(`Server Started at Port ${PORT}`)
});




