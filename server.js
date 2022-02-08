require('dotenv').config();
const express = require('express');
const bp = require('body-parser')
const cors = require('cors'); 
const connectDb = require('./config/DB');
const port = process.env.PORT || 5000;
const app = express()
//db connected
connectDb();
//import Custom Routes
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes')
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
//middleware
app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({ extended: false }));
//api calling
app.use('/users',userRoutes)
app.use('/api/events',eventRoutes)
// http://localhost:5000/users/61dee68e51b6d3dba802db81

app.get('/',(req,res) =>{
    res.send("server running")
})

//not found routes
app.use(notFound)
app.use(errorHandler)

app.listen(port,() =>{
    console.log(`listening on http://localhost:${port}`)
})