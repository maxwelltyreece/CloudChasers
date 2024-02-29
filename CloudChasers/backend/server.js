const fs = require('fs');
const path = require('path');
const express = require('express');
const { expressjwt: jwt } = require("express-jwt");
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const foodRoutes = require('./routes/foodRoutes');
const communityRoutes = require('./routes/communityRoutes');
const statsRoutes = require('./routes/statsRoutes');
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
    const pathsThatDontRequireAuth = ['/register', '/login', '/'];
    if (pathsThatDontRequireAuth.includes(req.path)) {
        // Skip JWT authentication for these paths
        return next();
    }
    // Apply JWT authentication middleware
    return authenticateJWT(req, res, next);
};

// Apply the conditionalAuth middleware
app.use(conditionalAuth);

// API url routes
app.use('/food', foodRoutes);
app.use('/', userRoutes);
app.use('/community', communityRoutes);
app.use('/stats', statsRoutes);

const { login } = require('./controllers/userController');
const os = require('os');
const networkInterfaces = os.networkInterfaces();

let serverIP;
for (let netInterface in networkInterfaces) {
    for (let networkInterface of networkInterfaces[netInterface]) {
        if (networkInterface.family === 'IPv4' && !networkInterface.internal) {
            serverIP = networkInterface.address;
            break;
        }
    }
    if (serverIP) break;
}

app.listen(3000, () => {
    console.log(`Server is running on ${serverIP}`);

    // Write the server IP to a file
    fs.writeFileSync(path.join(__dirname, '../frontend/screens/IPIndex.js'), `export const LocalIP = '${serverIP}';\n`);
});

module.exports = app;