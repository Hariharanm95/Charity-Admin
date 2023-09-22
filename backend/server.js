require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const donationRoutes = require('./routes/donations'); // Import donation routes
const userRoutes = require('./routes/user')

const app = express();

app.use(express.json());

// Middleware to log request path and method
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.use('/api/donations', donationRoutes); // Use donation routes
app.use('/api/user', userRoutes)

// Connect to DB
mongoose.connect(process.env.MONG_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Connected to DB & Listening to port");
        });
    })
    .catch((error) => {
        console.log(error);
    });


//listen for Request
// app.listen(process.env.PORT, ()=>{
//     console.log("Listening to port")
// })