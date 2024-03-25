import React, { useState, useEffect } from 'react';
import {
	View, Text, Image, FlatList, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../../contexts/UserContext';
import SettingsButton from '../../components/SettingsButton';
import { styles } from './styles';
import { LocalIP } from '../../screens/IPIndex';
import axios from 'axios';

function UserProfile() {
	const navigation = useNavigation();
	const { userDetails, updateUserDetails } = useUser();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [imageLink, setImageLink] = useState('');
    const [imageLoaded, setImageLoaded] = useState(false);

	useEffect(() => {
		const verifyLoginStatus = async () => {
			const token = await AsyncStorage.getItem('token');
			setIsLoggedIn(!!token);
		};

		verifyLoginStatus();
	}, []);
    
    useEffect(() => {
        const fetchImageLink = async () => {
            const link = await getImageLink();
            setImageLink(link);
        };

        fetchImageLink();
    }, [userDetails]);

	const renderItem = ({ item }) => (
		<TouchableOpacity activeOpacity={0.3} onPress={item.handler}>
			<View style={styles.itemButton}>
				<Text style={[styles.item]}>{item.name}</Text>
			</View>
		</TouchableOpacity>
	);


    const getImageLink = async () => {
        try {
            const response = await axios.get(`http://${LocalIP}:3000/image/getPictureURL`, {
                params: {
                    folderName: 'Profile_Pictures',
                    id: userDetails ? userDetails._id : null,
                },
            });
            return response.data.url;
        } catch (error) {
            console.error('Error:', error.message);
            return null;
        }
    };

	const UserProfileOptions = [
		{
			name: 'Recipes',
			handler: () => navigation.navigate('Recipes'),
		},
		{
			name: 'Reminders',
			handler: () => navigation.navigate('Reminders'),
		},
		{
			name: 'Goals',
			handler: () => navigation.navigate('Goals'),
		},
		{
			name: 'Awards',
			handler: () => navigation.navigate('Awards'),
		},
	];

	return (
		<View style={styles.container}>
            <View style={styles.semiCircle}/>
			{imageLink ? (
                <Image
                    source={{ uri: imageLink }}
                    style={styles.profilePic}
                    onLoad={() => setImageLoaded(true)}
                />
            ) : (
                <ActivityIndicator size="large" color="#0000ff" />
            )}
            {isLoggedIn && userDetails && <Text style={styles.username}>{userDetails.username}</Text>}			
            <FlatList
				style={styles.subPageList}
				data={UserProfileOptions}
				renderItem={renderItem}
				keyExtractor={(item) => item.name}
			/>
			<SettingsButton />
		</View>
	);
}

export default UserProfile;
