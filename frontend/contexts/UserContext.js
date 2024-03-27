import React, {
	createContext, useState, useContext, useMemo,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as userService from '../services/UserService';
import { useCommunity } from './CommunityContext';
import PropTypes from 'prop-types';

const UserContext = createContext();
/**
 * Provides the UserContext to its children.
 * @param {Object} props The props of the component.
 * @param {React.ReactNode} props.children The children nodes.
 */
export function UserProvider({ children }) {
	const [userDetails, setUserDetails] = useState(null);
	const { resetUserCommunities } = useCommunity();

	
    /**
     * Fetches and sets the user details from the server.
     */
	const getUserDetails = async () => {
		const token = await AsyncStorage.getItem('token');
		if (!token) {
			console.error('Token not available');
			return;
		}
		const details = await userService.fetchUserDetails(token);
		setUserDetails(details.data);
	}
  
	/**
     * Updates the user details from the server.
     */
	const updateUserDetails = async () => {
		const token = await AsyncStorage.getItem('token');
		if (!token) {
			return;
		}
		const details = await userService.fetchUserDetails(token);
		setUserDetails(details.data);
	};

	/**
     * Edits the user details on the server and updates the local state.
     * @param {Object} newValues The new values for the user details.
     */
	const editUserDetails = async (newValues) => {
		try {
			await userService.editUserDetails(newValues);
			updateUserDetails();
		} catch (error) {
			console.error(error);
		}
	};

	 /**
     * Logs out the user, removes the token from AsyncStorage, and resets the navigation.
     * @param {Object} navigation The navigation object.
     */
	const logout = async (navigation) => {
		try {
			await AsyncStorage.removeItem('token');
			navigation.reset({
				index: 0,
				routes: [{ name: 'Auth' }],
			});
			setUserDetails(null);
			resetUserCommunities();
		} catch (error) {
			console.error('Failed to remove the token.', error);
		}
	};

	const value = useMemo(() => ({
		userDetails, getUserDetails, updateUserDetails, editUserDetails, logout,
	}), [userDetails, getUserDetails, updateUserDetails, editUserDetails, logout]);

	return (
		<UserContext.Provider value={value}>
			{children}
		</UserContext.Provider>
	);
}

/**
 * Custom hook to use the UserContext.
 * @returns {Object} The user state and its setter functions.
 */
export const useUser = () => useContext(UserContext);

UserProvider.propTypes = {
	children: PropTypes.node.isRequired,
};