/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/**
 * @fileoverview This file contains the Firebase image controller functions for handling profile picture upload and retrieval.
 * @module controllers/firebaseImageController
 */

const { getStorage, ref, getDownloadURL } = require('firebase-admin/storage');
const { Storage } = require('@google-cloud/storage');
var busboy = require('busboy');
const stream = require('stream');
const path = require('path');

const storage = new Storage({
	projectId: 'gobl-b4e3d',
	keyFilename: 'key.json'
});
const bucket = storage.bucket('./gobl-b4e3d.appspot.com');

/**
 * Retrieves the URL of the profile picture for a given user ID.
 * @param {Object} req - The request object.
 *  - The request body must contain the user 2 parameters userID and folderName which can be ["Profile_Picstures", "Recipe_Pictures", "Community_Pictures"]
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the profile picture URL or an error message.
 */
exports.getPictureURL = async (req, res) => {
	// Retrieve the user ID from the request query
	const {id, folderName} = req.query;
	try {
		// Construct the path to the profile picture
		const validExtensions = ['png', 'jpg', 'jpeg', 'gif'];
		const validFolders = ['Profile_Pictures', 'Recipe_Pictures', 'Community_Pictures'];
		if (!validFolders.includes(folderName)) {
			return res.status(400).json({ error: "Invalid folder name " + folderName + "   valid folder names are ['Profile_Pictures', 'Recipe_Pictures', 'Community_Pictures']" });
		}
		var extensionFound = false;
		for (var i = 0; i < validExtensions.length; i++) {
			var path = folderName + '/' + id + '.' + validExtensions[i];
			var file = bucket.file(path);
			var exists = await file.exists();
			if (exists[0]) {
				extensionFound = true;
				break;
			}
		}

		if (!extensionFound) {
			file = bucket.file(folderName + '/default.png');
			if ((await file.exists())[0]){
				var url = await getDownloadURL(file);
				return res.status(200).json({ url: url });
			} else {
				return res.status(404).json({ error: "Image not found." });
			} 
		}

		// Get the download URL of the profile picture
		// eslint-disable-next-line no-redeclare
		var url = await getDownloadURL(file);
		return res.status(200).json({ url: url });
	} catch (error) {
		if (error.code === 404) {
			return res.status(404).json({ error: "Image at " + path + " not found." });
		} else {
			console.error(error);
			return res.status(500).json({ error: "Internal server error." });
		}
	}
};

/**
 * Uploads a profile picture for a user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with a success message.
 */
exports.uploadPicture = async (req, res) => {
	var extension = "";
	var objectID = "";
	var folderName = "";
	var fileUploaded = false;
	var pathToFile = "";
	const bb = busboy({ headers: req.headers, limits: { files: 1 } });
	bb.on('field', (fieldname, val) => {
		if (fieldname === 'objectID'){
			objectID = val;
		} else if (fieldname === 'folderName'){
			folderName = val;
		} else {
			return res.status(400).json({ error: "Invalid field name " + fieldname + "   valid field names are ['objectID', 'folderName']" });
		}

	});
	bb.on('file', async (fieldname, file, fileMeta) => {
		console.log("File received.");
		currentPhoto = await findPreviousPhoto(objectID, folderName);
		if (currentPhoto === false) {
			pathToFile = folderName + "/" + objectID + "." + getFileExtension(fileMeta);
			newFileLocationReference = bucket.file(pathToFile);
		} else {
			var previousNameOfPhoto = (await currentPhoto['file'].getMetadata())[0]["name"];
			extension = getFileExtension(fileMeta);
			pathToFile = folderName + '/' + objectID + + '.' + extension;
			newFileLocationReference = bucket.file(pathToFile);
		}
		const fileStream = newFileLocationReference.createWriteStream();
		if (objectID === "") {
			console.log("No OB ID provided 1.")
			return res.status(400).json({ error: "No object ID provided (At least before the file was received). Make sure the obejct ID is passed in the form before the file" });
		}
		if (folderName === "") {
			console.log("No folderName provided.");
			return res.status(400).json({ error: "No folderName provided (At least before the file was received). Make sure the folderName is passed in the form before the file" });
		}
		file.on('data', (data) => {

			fileStream.write(data);
		});
		file.on('end', async () => {
			if (previousNameOfPhoto != pathToFile && currentPhoto['exists']) {
				currentPhoto['file'].delete();
			}
			fileStream.end();
			fileUploaded = true;
		});
	});
	bb.on('close', () => {
		if (fileUploaded) {
			console.log("File uploaded successfully.");
			return res.status(200).json({ message: "File uploaded successfully." });
		} else if (pathToFile === "") {
			console.log("No file uploaded.");
			return res.status(400).json({ error: "No file uploaded." });
		} else if (pathToFile === "/" + objectID + "." + extension) {
			console.log("No OB ID provided.");
			return res.status(400).json({ error: "No object ID provided 2" });
		}
	});
	req.pipe(bb);
};

/**
 * Retrieves the file extension from the file metadata.
 * @param {Object} fileMeta - The file metadata object.
 * @returns {string} The file extension.
 */
function getFileExtension(fileMeta) {
	var filename = fileMeta['filename'];
	var extension = filename.split('.').pop();
	return extension;
}

async function findPreviousPhoto (objectID, folderName) {
	const validExtensions = ['png', 'jpg', 'jpeg', 'gif'];
	var extensionFound = false;
	for (var i = 0; i < validExtensions.length; i++) {
		var path = folderName + '/' + objectID + '.' + validExtensions[i];
		var file = bucket.file(path);
		var exists = await file.exists();
		if (exists[0]) {
			extensionFound = true;
			break;
		}
	}
	if (!extensionFound) {
		return false;
	}
	return {"file" : file, "exists" : exists[0]};
}