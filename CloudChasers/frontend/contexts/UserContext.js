// UserContext.js
import React, {
	createContext, useState, useContext, useMemo,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userService from '../services/UserService';

const UserContext = createContext();

export function UserProvider({ children }) {
	const [userDetails, setUserDetails] = useState(null);

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

	const logout = () => {
		setUserDetails(null);
		// Perform other logout actions
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
