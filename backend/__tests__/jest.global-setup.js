const { spawn } = require("child_process");
let serverProcess;

module.exports = async () => {
	serverProcess = spawn("node", ["./backend/server.js"], {
		stdio: "inherit",
	});

	await new Promise((resolve) => setTimeout(resolve, 5000));
};