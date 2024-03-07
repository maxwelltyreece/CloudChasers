// CommunityContext.js
import React, {
	createContext, useContext, useMemo, useState, useEffect,
} from 'react';
import * as communityService from '../services/CommunityService';

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
		console.error('Failed to get communities:', response);
		return [];
	};

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
	const value = useMemo(() => ({
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
	}), [getUserCommunities, getCommunityDetails, getAvailableCommunities, resetUserCommunities, userCommunities, setUserCommunities, getCommunityMembers, getUserRole, getAllCommunities, createCommunity, joinCommunity]);

	return (
		<CommunityContext.Provider value={value}>
			{children}
		</CommunityContext.Provider>
	);
}

export const useCommunity = () => useContext(CommunityContext);
