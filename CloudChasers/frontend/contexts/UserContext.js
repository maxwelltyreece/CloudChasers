// UserContext.js
import React, {
	createContext, useState, useContext, useMemo,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userService from '../services/UserService';
import { useCommunity } from './CommunityContext';

const UserContext = createContext();

export function UserProvider({ children }) {
	const [userDetails, setUserDetails] = useState(null);
    const { resetUserCommunities } = useCommunity();

	const updateUserDetails = async () => {
		const token = await AsyncStorage.getItem('token');
		if (!token) {
			console.error('Token not available');
			return;
		}
		const details = await userService.getUserDetails(token);
		setUserDetails(details);
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
		userDetails, updateUserDetails, editUserDetails, logout,
	}), [userDetails, updateUserDetails, editUserDetails, logout]);

	return (
		<UserContext.Provider value={value}>
			{children}
		</UserContext.Provider>
	);
}

export const useUser = () => useContext(UserContext);
