const express = require('express');
const { expressjwt: jwt } = require("express-jwt");
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());

const authenticateJWT = jwt({ 
    secret: '433837f8626b7658a96b4b55ac4c80834c96d1d7cee62125eafbc338ad3add15153fdaa6b0b4921839f7c684085b5d2f2bbba7d3e268c7503ada28cecf4317b7', 
    algorithms: ['HS256'] 
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

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
