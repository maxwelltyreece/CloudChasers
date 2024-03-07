// CommunityContext.js
import React, {
	createContext, useContext, useMemo, useState, useEffect,
} from 'react';
import * as communityService from '../services/CommunityService';
import { get } from 'mongoose';

const CommunityContext = createContext();

export function CommunityProvider({ children }) {
	const [userCommunities, setUserCommunities] = useState([]);

    const getUserCommunities = async () => {
        const communities = await communityService.getUserCommunities();
        setUserCommunities(communities.data);
    };

	useEffect(() => {
		getUserCommunities();
	}, []);

    const getAvailableCommunities = async () => {
        const response = await getAllCommunities();
        if (response.success) {
            return response.data.filter(
                (community) => !userCommunities.some((userCommunity) => userCommunity.id === community.id)
            );
        } else {
            console.error('Failed to get communities:', response);
            return [];
        }
    };
2
	// eslint-disable-next-line max-len
	const getCommunityDetails = async (communityId) => communityService.getCommunityDetails(communityId);

	// eslint-disable-next-line max-len
	const getCommunityMembers = async (communityId) => communityService.getCommunityMembers(communityId);

	const getUserRole = async (communityId) => communityService.getUserRole(communityId);

	const getAllCommunities = async () => communityService.getAllCommunities();

	const createCommunity = async (communityData) => {
		console.log('Community Data:', communityData);
		return communityService.createCommunity(communityData);
	};

    const resetUserCommunities = () => {
        setUserCommunities([]);
    };

    const joinCommunity = async (communityId) => {
        console.log('Attempting to join community with ID:', communityId);

        try {
            const response = await communityService.joinCommunity(communityId);
            console.log('Successfully joined community. Response:', response);
            return response;
        } catch (error) {
            console.error('Error joining community:', error);
            throw error;
        }
    };

    const deleteCommunity = async (communityId, navigation) => {
        console.log('Deleting community with ID:', communityId);
        const response = await communityService.deleteCommunity(communityId);
        if (response && response.success) {
            console.log('Successfully deleted community:', response);
            getUserCommunities();
            navigation.navigate('Groups');
        } else {
            console.error('Failed to delete community:', response);
            // Handle error
        }
    };

    const leaveCommunity = async (communityId, navigation) => {
        console.log('Leaving community with ID:', communityId);
        const response = await communityService.leaveCommunity(communityId);
        if (response && response.success) {
            console.log('Successfully left community:', response);
            getUserCommunities();
            navigation.navigate('Groups');
        } else {
            console.error('Failed to leave community:', response);
            // Handle error
        }
    };

    const updateCommunityDesc = async (communityId, description) => {
        const response = await communityService.updateCommunityDesc(communityId, description);
    };

    const updateJoinPrivacy = async (communityId, joinPrivacy) => {
        const response = await communityService.updateJoinPrivacy(communityId, joinPrivacy);
    };

    const getCommunityImage = async (Id, folderName) => {
        try {
            const response = await communityService.getCommunityImage(Id, folderName);
            return response;
        } catch (error) {
            console.error(error);
            return { status: error.message };
        }
    }

	const value = useMemo(() => ({
        deleteCommunity,
        leaveCommunity,
        updateCommunityDesc,
        updateJoinPrivacy,
		getCommunityDetails,
		getCommunityMembers,
		getUserRole,
		userCommunities,
		setUserCommunities,
		getAllCommunities,
		createCommunity,
		joinCommunity,
        getAvailableCommunities,
        resetUserCommunities,
        getUserCommunities,
	// eslint-disable-next-line max-len
	}), [getUserCommunities, getCommunityDetails, getAvailableCommunities, resetUserCommunities, userCommunities, setUserCommunities, getCommunityMembers, getUserRole, getAllCommunities, createCommunity, joinCommunity, deleteCommunity, leaveCommunity, updateCommunityDesc, updateJoinPrivacy]);

	return (
		<CommunityContext.Provider value={value}>
			{children}
		</CommunityContext.Provider>
	);
}

export const useCommunity = () => useContext(CommunityContext);
