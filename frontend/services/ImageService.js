import axios from 'axios';
import { LocalIP } from '../screens/IPIndex';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

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
        const formData = new FormData();
        let filename = profilePicture.split('/').pop();
        let match = /\.(\w+)$/.exec(filename);
        let type = 'image/jpeg';
        formData.append('objectID', userId);
        formData.append('folderName', folderName);
        formData.append('image', { uri: profilePicture, name: filename, type });

        const response = await axios.post(`http://${LocalIP}:3000/image/uploadPicture`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        });
        // console.log('Image uploaded');
        return response;
    } catch (error) {
        console.error('Error:', error.message);
    }
};