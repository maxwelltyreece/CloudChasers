/**
 * @fileoverview This file contains the Firebase image controller functions for handling profile picture upload and retrieval.
 * @module controllers/firebaseImageController
 */

const { getStorage, ref, getDownloadURL } = require('firebase-admin/storage');
const { Storage } = require('@google-cloud/storage');
var busboy = require('busboy');
const stream = require('stream');

const storage = new Storage({
    projectId: 'gobl-b4e3d',
    keyFilename: 'key.json'
});
const bucket = storage.bucket('./gobl-b4e3d.appspot.com');

/**
 * Retrieves the URL of the profile picture for a given user ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the profile picture URL or an error message.
 */
exports.getProfilePicURL = async (req, res) => {
    // Retrieve the user ID from the request body
    const { userId } = req.body;
    try {
        // Construct the path to the profile picture
        const validExtensions = ['png', 'jpg', 'jpeg', 'gif'];
        var extensionFound = false;
        for (var i = 0; i < validExtensions.length; i++) {
            var path = 'Profile_Pics/' + userId + '.' + validExtensions[i];
            var file = bucket.file(path);
            var exists = await file.exists();
            if (exists[0]) {
                extensionFound = true;
                break;
            }
        }

        if (!extensionFound) {
            return res.status(404).json({ error: "Profile picture not found for user with ID " + userId });
        }

        // Get the download URL of the profile picture
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
exports.uploadProfilePic = async (req, res) => {
    const nameOfFolderToStoreImage = 'Profile_Pics';
    var pathToFile = nameOfFolderToStoreImage + '/';
    var fileUploaded = false;
    const bb = busboy({ headers: req.headers, limits: { files: 1 } });
    bb.on('field', (fieldname, val) => {
        var userId = val;
        pathToFile = pathToFile + userId;
    });
    bb.on('file', async (fieldname, file, fileMeta) => {
        var extension = getFileExtension(fileMeta);
        pathToFile = pathToFile + '.' + extension;
        newFileLocationReference = bucket.file(pathToFile);
        const fileStream = newFileLocationReference.createWriteStream();
        file.on('data', (data) => {
            fileStream.write(data);
        });
        file.on('end', () => {
            fileStream.end();
            fileUploaded = true;
        });
    });
    bb.on('close', () => {
        if (pathToFile === nameOfFolderToStoreImage + '/') {
            return res.status(400).json({ error: "User ID not provided & file no recieved" });
        } else if (pathToFile === nameOfFolderToStoreImage + '/.' + extension) {
            return res.status(400).json({ error: "User ID not provided in time. Make sure that the userId is provided before the file in the form" });
        } else if (pathToFile === nameOfFolderToStoreImage + '/' + userId) {
            return res.status(400).json({ error: "File not recieved" });
        } else if (!fileUploaded) {
            return res.status(500).json({ error: "Internal server error" });
        } else {
            return res.status(200).json({ message: "File uploaded successfully" });
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