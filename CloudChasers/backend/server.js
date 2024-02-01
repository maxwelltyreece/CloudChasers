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

// // TODO: Change to local DB
// mongoose.connect('mongodb+srv://cloudChasers:oio1cbd60Y1xQ5pO@goblcluster.ijglc9m.mongodb.net/?retryWrites=true&w=majority')
// .then(() => {
//   console.log('Connected to the database');
// })
// .catch((err) => {
//   console.error('Error connecting to the database', err);
// });
const url = `mongodb+srv://cloudChasers:mUq0OT5xkbeqjXDA@goblcluster.ijglc9m.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(url)
    .then( () => {
        console.log('Connected to the database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
    })

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
const os = require('os');
const networkInterfaces = os.networkInterfaces();

let serverIP;
for (let interface in networkInterfaces) {
    for (let networkInterface of networkInterfaces[interface]) {
        if (networkInterface.family === 'IPv4' && !networkInterface.internal) {
            serverIP = networkInterface.address;
            break;
        }
    }
    if (serverIP) break;
}

app.listen(3000, () => {
    console.log(`Server is running on ${serverIP}:3000`);
});