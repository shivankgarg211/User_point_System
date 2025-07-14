const express = require ('express');
const connectDb = require('./config')
const dotenv = require('dotenv');
dotenv.config();
const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;

// connect to MongoDB
connectDb();




// Routes
const userRoutes = require('./routes/UserRoutes');
 app.use ('/',userRoutes);






app.listen(port,()=>{
        console.log (`Server is running on Port ${port}`)
})