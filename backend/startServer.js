const app = require("./server");

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    
    fs.writeFileSync(
		path.join(__dirname, "../frontend/screens/IPIndex.js"),
		`export const LocalIP = '${serverIP}';\n`
	);
});
