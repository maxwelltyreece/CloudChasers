const { getStorage, ref, getDownloadURL } = require('firebase-admin/storage');
const { Storage } = require('@google-cloud/storage');

const storage = new Storage();
const bucket = storage.bucket('gobl-b4e3d.appspot.com');

exports.getProfilePicURL = async (req, res) => {
    const {userId} = req.body;
    try {
        var path = 'Profile_Pics/' + userId + '.jpg';
        const file = bucket.file(path);
        var url = await getDownloadURL(file);
        return res.status(200).json({url: url}); 
    } catch (error) {
        if (error.code === 404) {
            return res.status(404).json({error: "Image at " + path + " not found."});
        } else {
            console.error(error);
            return res.status(500).json({error: "Internal server error."});
        }
    }
};