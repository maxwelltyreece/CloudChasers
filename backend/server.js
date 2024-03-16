/* eslint-disable no-unused-vars */
const fs = require('fs');
const path = require('path');
const express = require('express');
const { expressjwt: jwt } = require('express-jwt');
const mongoose = require('mongoose');
const os = require('os');
const userRoutes = require('./routes/userRoutes');
const foodRoutes = require('./routes/foodRoutes');
const communityRoutes = require('./routes/communityRoutes');
const statsRoutes = require('./routes/statsRoutes');
const imageRoutes = require('./routes/imageRoutes');
const goalRoutes = require('./routes/goalRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());

const authenticateJWT = jwt({
	secret: process.env.SECRET_KEY,
	algorithms: ['HS256'],
});

const url = process.env.DATABASE_URL;

mongoose.connect(url)
	.then(() => {
		console.log('Connected to the database ');
	})
	.catch((err) => {
		console.error(`Error connecting to the database. n${err}`);
	});


// API url routes
app.use('/food', foodRoutes);
app.use('/', userRoutes);
app.use('/community', communityRoutes);
app.use('/stats', statsRoutes);
app.use('/image', imageRoutes);
app.use('/goals', goalRoutes);

const { login } = require('./controllers/userController');

const networkInterfaces = os.networkInterfaces();

let serverIP;
for (const netInterface in networkInterfaces) {
	for (const networkInterface of networkInterfaces[netInterface]) {
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