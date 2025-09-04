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
// routes
const userRoute = require('./routes/user.route');
app.use('/api/user',userRoute);


app.listen(PORT,()=> 
{
    console.log(`Server Started at Port ${PORT}`)
});




