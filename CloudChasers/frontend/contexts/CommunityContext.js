// CommunityContext.js
import React, {
	createContext, useContext, useMemo, useState,
} from 'react';
import * as communityService from '../services/CommunityService';

const CommunityContext = createContext();

export function CommunityProvider({ children }) {
	const [userCommunities, setUserCommunities] = useState([]);

	const fetchUserCommunities = async () => {
		const communities = await communityService.getUserCommunities();
		setUserCommunities(communities);
	};
	// eslint-disable-next-line max-len
	const getCommunityDetails = async (communityId) => communityService.getCommunityDetails(communityId);

	// eslint-disable-next-line max-len
	const getCommunityMembers = async (communityId) => communityService.getCommunityMembers(communityId);

	const getUserRole = async (communityId) => communityService.getUserRole(communityId);

	const getAllCommunities = async () => communityService.getAllCommunities();

	const createCommunity = async (communityData) => {
		const newCommunity = await communityService.createCommunity(communityData);
		setUserCommunities((prevCommunities) => [...prevCommunities, newCommunity]);
		fetchUserCommunities();
		return newCommunity;
	};

	const joinCommunity = async (communityId) => communityService.joinCommunity(communityId);

	const value = useMemo(() => ({
		getCommunityDetails,
		getCommunityMembers,
		fetchUserCommunities,
		getUserRole,
		userCommunities,
		setUserCommunities,
		getAllCommunities,
		createCommunity,
		joinCommunity,
		// eslint-disable-next-line max-len
	}), [getCommunityDetails, fetchUserCommunities, userCommunities, setUserCommunities, getCommunityMembers, getUserRole, getAllCommunities, createCommunity, joinCommunity]);

	return (
		<CommunityContext.Provider value={value}>
			{children}
		</CommunityContext.Provider>
	);
}

export const useCommunity = () => useContext(CommunityContext);
