// CommunityContext.js
import React, {
	createContext, useContext, useMemo, useState, useEffect,
} from 'react';
import * as communityService from '../services/CommunityService';

const CommunityContext = createContext();

export function CommunityProvider({ children }) {
	const [userCommunities, setUserCommunities] = useState([]);

	useEffect(() => {
		const getUserCommunities = async () => {
			const communities = await communityService.getUserCommunities();
			setUserCommunities(communities.data);
		};

		getUserCommunities();
	}, []);

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

	const joinCommunity = async (communityId) => communityService.joinCommunity(communityId);

	const value = useMemo(() => ({
		getCommunityDetails,
		getCommunityMembers,
		getUserRole,
		userCommunities,
		setUserCommunities,
		getAllCommunities,
		createCommunity,
		joinCommunity,
	// eslint-disable-next-line max-len
	}), [getCommunityDetails, userCommunities, setUserCommunities, getCommunityMembers, getUserRole, getAllCommunities, createCommunity, joinCommunity]);

	return (
		<CommunityContext.Provider value={value}>
			{children}
		</CommunityContext.Provider>
	);
}

export const useCommunity = () => useContext(CommunityContext);
