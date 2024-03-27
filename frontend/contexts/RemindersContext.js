import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';

/**
 * @type {React.Context}
 */
const RemindersContext = createContext();

/**
 * Custom hook to use the RemindersContext.
 * @returns {Array} The reminders state and its setter function.
 */
export const useReminders = () => useContext(RemindersContext);

/**
 * Provides the RemindersContext to its children.
 * @param {Object} props The props of the component.
 * @param {React.ReactNode} props.children The children nodes.
 */
export const RemindersProvider = ({ children }) => {
	const [reminders, setReminders] = useState([]);

	/**
	 * Fetches the reminders from AsyncStorage and sets the reminders state.
	 */
	const fetchReminders = async () => {
		const remindersData = await AsyncStorage.getItem('REMINDERS');
		const remindersList = remindersData ? JSON.parse(remindersData) : [];
		setReminders(remindersList);
	};

	useEffect(() => {
		fetchReminders();
	}, []);

	return (
		<RemindersContext.Provider value={{ reminders, setReminders }}>
			{children}
		</RemindersContext.Provider>
	);
};

RemindersProvider.PropTypes = {
	children: PropTypes.node.isRequired,
};