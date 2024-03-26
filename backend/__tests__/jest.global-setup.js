const { spawn } = require("child_process");
let serverProcess;

module.exports = async () => {
	// Start the server before all tests
	serverProcess = spawn("node", ["backend/server.js"], {
		stdio: "inherit",
	});

	await new Promise((resolve) => setTimeout(resolve, 5000));
};