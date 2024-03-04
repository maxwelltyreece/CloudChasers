import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocalIP } from '../screens/IPIndex';

export async function createCommunity(communityData) {
	try {
		const token = await AsyncStorage.getItem('token');
		const response = await fetch(`http://${LocalIP}:3000/community/create`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(communityData),
		});

		if (!response.ok) {
			console.error(`HTTP error! status: ${response.status}`);
			return false;
		}

		const jsonResponse = await response.json();
		if (jsonResponse.success) {
			console.log(jsonResponse.message);
			return jsonResponse.success;
		}
		console.error(jsonResponse.message);
		return false;
	} catch (error) {
		console.error('There was a problem with the fetch operation: ', error);
		return false;
	}
}

export async function joinCommunity(communityId) {
	const token = await AsyncStorage.getItem('token');
	const response = await fetch(`http://${LocalIP}:3000/community/join`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ communityId }),
	});
	return response.json();
}

export async function getCommunityDetails(communityId) {
	const token = await AsyncStorage.getItem('token');
	const response = await fetch(`http://${LocalIP}:3000/community/details`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ communityId }),
	});
	return response.json();
}

export async function getCommunityMembers(communityId) {
	const token = await AsyncStorage.getItem('token');
	const response = await fetch(`http://${LocalIP}:3000/community/members`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ communityId }),
	});
	return response.json();
}

export async function getUserRole(communityId) {
	const token = await AsyncStorage.getItem('token');
	const response = await fetch(`http://${LocalIP}:3000/community/role`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ communityId }),
	});
	return response.json();
}

export async function getAllCommunities() {
	const token = await AsyncStorage.getItem('token');
	const response = await fetch(`http://${LocalIP}:3000/community/all`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return response.json();
}

export async function getUserCommunities() {
	const token = await AsyncStorage.getItem('token');
	const response = await fetch(`http://${LocalIP}:3000/community/userCommunities`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return response.json();
}
