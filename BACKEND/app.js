
const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const cors = require('cors');
const routerFood = require("./routes/FoodRoute");
const routerRole = require('./routes/RoleRoute');
const routerUser = require('./routes/UserRoute');
const routerOrder = require('./routes/OrderRoute');
const routerAuth = require('./routes/AuthRoute');
const routerCategory = require('./routes/CategoryRoute');
const routerCart = require('./routes/CartRoute');

// test test
app.get('/' ,(req,res) => {
    res.send("Hello from Node API");
 
});

app.use(cors({
    origin: 'http://localhost:5173', 
    methods: 'GET,POST,PUT,DELETE',  
    credentials: true                
}));

app.use(express.json());
app.use('/api', routerFood);
app.use('/api', routerRole);
app.use('/api', routerUser);
app.use('/api', routerOrder);
app.use('/api', routerCategory);
app.use('/api/cart', routerCart);
app.use('/api', routerAuth);

app.use('/uploads', express.static('uploads'));


mongoose.connect(process.env.mongoURI)
.then(() => {
    console.log("Connected to database!")
    app.listen (3000 , () => {
        console.log("Server is running on port 3000"); 
   });
})
.catch(() => {
    console.log("Connection failed!")
})