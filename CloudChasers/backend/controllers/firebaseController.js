import firebase from 'firebase/app';

exports.getFirebaseImage = async (req, res) => {
    // Create a reference with an initial file path and name
    var storage = firebase.storage();
    var pathReference = storage.ref('Profile_Pics/uncle-sam.jpg');

    // Create a reference from a Google Cloud Storage URI
    var gsReference = storage.refFromURL('gs://bucket/images/stars.jpg');

    // Create a reference from an HTTPS URL
    // Note that in the URL, characters are URL escaped!
    var httpsReference = storage.refFromURL('https://firebasestorage.googleapis.com/b/bucket/o/images%20stars.jpg');  

    // Get the download URL
    console.log(pathReference.getDownloadURL());

};