// Import necessary libraries
import React, { createContext, useState, useContext, useMemo } from 'react';
import awardsService from '../services/AwardsService'; // Make sure to import your AwardsService correctly
import propTypes from 'prop-types';

const AwardsContext = createContext();

/**
 * Provides a context for managing awards, including fetching, creating, and retrieving awards given to a user.
 */
export function AwardsProvider({ children }) {
	// State for all awards
	const [awards, setAwards] = useState([]);

	// State for awards assigned to the user
	const [userAwards, setUserAwards] = useState([]);

	/**
     * Fetches all awards and updates the state.
     */
	const fetchAwards = async () => {
		try {
			const response = await awardsService.getAllAwards();
			if (response && response.data) {
				setAwards(response.data.awards);
			}
		} catch (error) {
			console.error('Error fetching awards:', error);
		}
	};

	/**
     * Creates a new award based on provided award data.
     * @param {Object} awardData - The data for the new award to create.
     */
	const createAward = async (awardData) => {
		try {
			const response = await awardsService.createAward(awardData);
			if (response && response.data) {
				fetchAwards(); // Refresh the awards list
			}
			return response;
		} catch (error) {
			console.error('Error creating award:', error);
		}
	};

	/**
     * Retrieves awards given to the user and updates the state.
     */
	const fetchUserAwards = async () => {
		try {
			const response = await awardsService.getUserAwards();
			if (response && response.data) {
				setUserAwards(response.data.awards);
			}
		} catch (error) {
			console.error('Error fetching user awards:', error);
		}
	};
	/**
     * Retrieves a single award by its ID.
     * @param {String} awardId The ID of the award to retrieve.
     */
	const fetchAward = async (awardId) => {
		try {
			const response = await awardsService.getAward(awardId);
			if (response && response.data) {
				// Assuming you want to do something with the single award data,
				// like setting it in state or returning it for immediate use.
				return response.data.award;
			}
		} catch (error) {
			console.error('Error fetching award:', error);
		}
	};

	/**
     * Awards a user with a specific award.
     * @param {Object} awardData Data containing award ID and user ID.
     */
	const awardUser = async (awardData) => {
		try {
			const response = await awardsService.awardUser(awardData);
			if (response && response.data) {
				// Post-award action, such as refreshing user awards.
				fetchUserAwards();
				return response.data;
			}
		} catch (error) {
			console.error('Error awarding user:', error);
		}
	};

	/**
     * Retrieves awards that are ready to be issued to users based on certain criteria.
     */
	const fetchAwardsToBeIssued = async () => {
		try {
			const response = await awardsService.getAwardsToBeIssued();
			if (response && response.data) {
				// Handle the data, possibly set it to state or return it.
				return response.data;
			}
		} catch (error) {
			console.error('Error fetching awards to be issued:', error);
		}
	};

	/**
     * Retrieves the number of completed awards by a user.
     */
	const fetchNumberOfCompletedAwards = async () => {
		try {
			const response = await awardsService.getNumberOfCompletedAwards();
			if (response && response.data) {
				// Assuming you might want to use this information in the UI
				return response.data;
			}
		} catch (error) {
			console.error('Error fetching number of completed awards:', error);
		}
	};

	// Add the new functions to the useMemo hook
	const value = useMemo(() => ({
		awards,
		userAwards,
		fetchAwards,
		createAward,
		fetchUserAwards,
		fetchAward, // New function
		awardUser, // New function
		fetchAwardsToBeIssued, // New function
		fetchNumberOfCompletedAwards, // New function
	}), [awards, userAwards]);

	return (
		<AwardsContext.Provider value={value}>
			{children}
		</AwardsContext.Provider>
	);
}

/**
 * Custom hook to use the awards context.
 * @returns The context with all awards, user awards, and functions to manage awards.
 */
export const useAwards = () => useContext(AwardsContext);

AwardsProvider.propTypes = {
	children: propTypes.node.isRequired,
};

export default AwardsContext;
