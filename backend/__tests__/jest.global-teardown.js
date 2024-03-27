module.exports = async () => {
    // Kill the server process after all tests are done
    if (global.serverProcess) {
        global.serverProcess.kill();
    }
};
