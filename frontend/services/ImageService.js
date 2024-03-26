import axios from 'axios';
import { LocalIP } from '../screens/IPIndex';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

/**
 * Request image permissions from the user.
 * @returns {Promise} Promise representing the permission request result.
 */
export const requestImagePermissions = async () => {
    if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
        }
    }
};

/**
 * Pick an image from the user's media library.
 * @returns {Promise<string>} Promise that resolves to the URI of the picked image.
 */
export const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 0.3,
    });

    if (!result.cancelled) {
        return result.uri;
    }
};

/**
 * Upload an image to the server.
 * @param {string} userId - The ID of the user uploading the image.
 * @param {string} profilePicture - The URI of the image to upload.
 * @param {string} folderName - The name of the folder to upload the image to.
 * @returns {Promise} Axios Response Promise with the upload operation result.
 */
export const uploadImage = async (userId, profilePicture, folderName) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const resizedImage = await ImageManipulator.manipulateAsync(
            profilePicture,
            [{ resize: { width: 300, height: 300 } }],
            { compress: 0.3, format: ImageManipulator.SaveFormat.JPEG }
        );
        const formData = new FormData();
        let filename = resizedImage.uri.split('/').pop();
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        formData.append('objectID', userId);
        formData.append('folderName', folderName);
        formData.append('image', { uri: resizedImage.uri, name: filename, type });

        const response = await axios.post(`http://${LocalIP}:3000/image/uploadPicture`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.error('Error:', error.message);
    }
};

/**
 * Get the link to an image from the server.
 * @param {string} folderName - The name of the folder where the image is stored.
 * @param {string} id - The ID of the image.
 * @returns {Promise<string>} Promise that resolves to the URL of the image.
 */
export const getImageLink = async (folderName, id) => {
    try {
        const response = await axios.get(`http://${LocalIP}:3000/image/getPictureURL`, {
            params: {
                folderName: folderName,
                id: id,
            },
        });
        return response.data.url;
    } catch (error) {
        console.error('Error:', error.message);
        return null;
    }
};