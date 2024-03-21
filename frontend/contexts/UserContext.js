// UserContext.js
import React, {
	createContext, useState, useContext, useMemo,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userService from '../services/UserService';
import { useCommunity } from './CommunityContext';
import PropTypes from 'prop-types';

const UserContext = createContext();

export function UserProvider({ children }) {
	const [userDetails, setUserDetails] = useState(null);
    const { resetUserCommunities } = useCommunity();

	const getUserDetails = async () => {
		const token = await AsyncStorage.getItem('token');
		if (!token) {
			console.error('Token not available');
			return;
		}
		const details = await userService.fetchUserDetails(token);
		setUserDetails(details.data);
		console.log('User details:', details.data);
	}

	const updateUserDetails = async () => {
		const token = await AsyncStorage.getItem('token');
		if (!token) {
			console.error('Token not available');
			return;
		}
		const details = await userService.fetchUserDetails(token);
		setUserDetails(details.data);
	};

	const editUserDetails = async (field, newValue) => {
		try {
			await userService.editUserDetails(field, newValue);
			updateUserDetails();
		} catch (error) {
			console.error(error);
		}
	};

	const logout = async (navigation) => {
        try {
            await AsyncStorage.removeItem('token');
            console.log('Token removed!');
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

export const useUser = () => useContext(UserContext);

UserProvider.propTypes = {
	children: PropTypes.node.isRequired,
};