const app = require("./server");
const fs = require("fs");
const path = require("path");
const os = require("os");

const PORT = process.env.PORT || 3000;
const networkInterfaces = os.networkInterfaces();

let serverIP;
for (const netInterface in networkInterfaces) {
	for (const networkInterface of networkInterfaces[netInterface]) {
		if (networkInterface.family === "IPv4" && !networkInterface.internal) {
			serverIP = networkInterface.address;
			break;
		}
	}
	if (serverIP) break;
}
app.listen(PORT, () => {
    console.log(`Server is running on ${serverIP} on port ${PORT}`);
    
    fs.writeFileSync(
		path.join(__dirname, "../frontend/screens/IPIndex.js"),
		`export const LocalIP = '${serverIP}';\n`
	);
});
