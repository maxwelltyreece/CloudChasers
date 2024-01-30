const express = require('express');
const { expressjwt: jwt } = require("express-jwt");
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());

const authenticateJWT = jwt({ 
    secret: process.env.SECRET_KEY, 
    algorithms: ['HS256'] 
});

mongoose.connect('mongodb://localhost:27017/CloudChasers')
.then(() => {
  console.log('Connected to the database');
})
.catch((err) => {
  console.error('Error connecting to the database', err);
});

const conditionalAuth = (req, res, next) => {
    const pathsThatDontRequireAuth = ['/register', '/login'];
    if (pathsThatDontRequireAuth.includes(req.path)) {
        // Skip JWT authentication for these paths
        return next();
    }
    // Apply JWT authentication middleware
    return authenticateJWT(req, res, next);
};

// Apply the conditionalAuth middleware
app.use(conditionalAuth);

// User routes
app.use(userRoutes);
app.use('/', userRoutes);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
