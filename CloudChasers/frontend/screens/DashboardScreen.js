import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_IP } from '@env';
import { LocalIP } from './IPIndex';

function DashboardScreen() {
	const [users, setUsers] = useState([]);

	async function getData() {
		AsyncStorage.getItem('token')
			.then((token) => {
				console.log(token);
				return fetch(`${LocalIP}:3000/users`, {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
			})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setUsers(data);
			})
			.catch((error) => console.error(error));
	}

	useEffect(() => {
		getData();
	}, []);

	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<ScrollView>
				{users && users.map((user, index) => (
					<Text key={index}>{user.username}</Text>
				))}
			</ScrollView>
		</View>
	);
}

export default DashboardScreen;
