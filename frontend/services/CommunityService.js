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
			return jsonResponse;
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
			'Content-Type': 'application/json',
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
	const response = await fetch(`http://${LocalIP}:3000/community/members?communityId=${communityId}`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (!response.ok) {
		console.error('Server response:', response);
		throw new Error(`Server responded with status code ${response.status}`);
	}

	if (!response.headers.get('Content-Type').includes('application/json')) {
		console.error('Unexpected response type:', response.headers.get('Content-Type'));
		throw new Error('Server responded with non-JSON content');
	}

	return response.json();
}

export async function getUserRole(communityId) {
	const token = await AsyncStorage.getItem('token');
	const response = await fetch(`http://${LocalIP}:3000/community/role?communityId=${communityId}`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	const text = await response.text(); // get the response as text
	console.log('Server response:', text); // log the response
	return JSON.parse(text); // parse the response as JSON
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

export async function deleteCommunity(communityId) {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`http://${LocalIP}:3000/community/delete`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ communityId }),
    });
    return response.json();
}

export async function leaveCommunity(communityId) {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`http://${LocalIP}:3000/community/leave`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ communityId }),
    });
    return response.json();
}

export async function updateCommunityDesc(communityId, description) {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`http://${LocalIP}:3000/community/updateDesc`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ communityId, description }),
    });
    return response.json();
}

export async function updateJoinPrivacy(communityId, joinPrivacy) {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`http://${LocalIP}:3000/community/updateJoinPrivacy`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ communityId, joinPrivacy }),
    });
    return response.json();
}

export async function getCommunityImage(Id, folderName) {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`http://${LocalIP}:3000/image/getImage?Id=${Id}&folderName=${folderName}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
}

export async function makePost(postData) {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`http://${LocalIP}:3000/community/makePost`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
    });
    return response.json();
}

export async function getCommunityPosts(communityId) {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`http://${LocalIP}:3000/community/posts?communityId=${communityId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.json();
}

export async function removeMember(communityId, memberId) {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`http://${LocalIP}:3000/community/removeMember`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ communityId, memberId }),
    });
    return response.json();
}
