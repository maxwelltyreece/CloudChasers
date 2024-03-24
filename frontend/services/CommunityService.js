import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocalIP } from '../screens/IPIndex';
import axios from 'axios';

export async function createCommunity(communityData) {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.post(`http://${LocalIP}:3000/community/create`, communityData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status !== 200) {
            console.error(`HTTP error! status: ${response.status}`);
            return false;
        }

        const jsonResponse = response.data;
        if (jsonResponse.success) {
            console.log(jsonResponse.message);
            return jsonResponse;
        }
        console.error(jsonResponse.message);
        return false;
    } catch (error) {
        console.error('There was a problem with the axios operation: ', error);
        return false;
    }
}

export async function joinCommunity(communityId) {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.post(`http://${LocalIP}:3000/community/join`, { communityId }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('There was a problem with the axios operation: ', error);
        return false;
    }
}

export async function getCommunityDetails(communityId) {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(`http://${LocalIP}:3000/community/details`, {
            params: {
                communityId: communityId
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('There was a problem with the axios operation: ', error);
        return false;
    }
}

export async function getUserRole(communityId) {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get(`http://${LocalIP}:3000/community/role`, {
        params: {
            communityId: communityId
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    console.log('Server response:', response.data);
    return response.data;
}

export async function getAllCommunities() {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get(`http://${LocalIP}:3000/community/all`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}

export async function getUserCommunities() {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get(`http://${LocalIP}:3000/community/userCommunities`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}

export async function deleteCommunity(communityId) {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.put(`http://${LocalIP}:3000/community/delete`, { communityId }, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    return response.data;
}

export async function leaveCommunity(communityId) {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.put(`http://${LocalIP}:3000/community/leave`, { communityId }, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    return response.data;
}

export async function updateCommunityDesc(communityId, description) {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.put(`http://${LocalIP}:3000/community/updateDesc`, { communityId, description }, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    return response.data;
}

export async function updateJoinPrivacy(communityId, joinPrivacy) {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.put(`http://${LocalIP}:3000/community/updateJoinPrivacy`, { communityId, joinPrivacy }, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    return response.data;
}

export async function getCommunityImage(Id, folderName) {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get(`http://${LocalIP}:3000/image/getImage`, {
        params: {
            Id: Id,
            folderName: folderName
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response;
}

export async function makePost(postData) {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.post(`http://${LocalIP}:3000/community/makePost`, postData, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}

export async function getCommunityPosts(communityId) {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get(`http://${LocalIP}:3000/community/posts`, {
        params: {
            communityId: communityId
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}

export async function removeMember(communityId, memberId) {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.put(`http://${LocalIP}:3000/community/removeMember`, { communityId, memberId }, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}

export async function acceptRequest(requestId) {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.post(`http://${LocalIP}:3000/community/acceptRequest`, { requestId }, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}

export async function denyRequest(requestId) {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.post(`http://${LocalIP}:3000/community/denyRequest`, { requestId }, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}

export async function getPendingRequests(communityId) {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get(`http://${LocalIP}:3000/community/requests`, {
        params: {
            communityId: communityId
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}

export async function getCommunityRecipes(communityId) {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get(`http://${LocalIP}:3000/food/getCommunityRecipes`, {
        params: {
            communityId: communityId
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}