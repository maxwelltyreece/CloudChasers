import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';

const RemindersContext = createContext();

export const useReminders = () => useContext(RemindersContext);

export const RemindersProvider = ({ children }) => {
	const [reminders, setReminders] = useState([]);

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