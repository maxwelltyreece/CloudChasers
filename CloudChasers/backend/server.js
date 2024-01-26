const express = require('express');
const expressJwt = require('express-jwt');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(userRoutes);
app.use(expressJwt({ secret: process.env.SECRET_KEY, algorithms: ['HS256'] }));

const pathsThatDontRequireAuth = ['/register', '/login'];

app.use((req, res, next) => {
    if (pathsThatDontRequireAuth.includes(req.path)) {
        // Skip the JWT authentication middleware for these paths
        next();
    } else {
        // Run the JWT authentication middleware
        authenticateJWT(req, res, next);
    }
});

app.listen(3000, () => {
		console.log('Server is running on port 3000');
});