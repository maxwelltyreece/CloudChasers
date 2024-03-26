import axios from 'axios';
import { LocalIP } from '../screens/IPIndex';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

export const requestImagePermissions = async () => {
    if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
        }
    }
};

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