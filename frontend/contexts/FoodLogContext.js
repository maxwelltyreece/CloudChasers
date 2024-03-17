// FoodContext.js
import React, {
	createContext, useState, useContext, useMemo,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import foodLogService from '../services/FoodLogService';
import PropTypes from 'prop-types';

const FoodLogContext = createContext();

export function FoodLogProvider({ children }) {
	const [latestLoggedFood, setLatestLoggedFood] = useState(null);

	const getLatestLoggedFood = async () => {
		const token = await AsyncStorage.getItem('token');
		if (!token) {
			console.error('Token not available');
			return;
		}
		const food = await foodLogService.getLatestLoggedFood();
		setLatestLoggedFood(food);
		console.log('Latest logged food:', food);
	}

	const value = useMemo(() => ({
		latestLoggedFood,
		getLatestLoggedFood,
	}), [latestLoggedFood, getLatestLoggedFood]);

	return (
		<FoodLogContext.Provider value={value}>
			{children}
		</FoodLogContext.Provider>
	);
}

export const useFoodLog = () => useContext(FoodLogContext);

FoodLogProvider.propTypes = {
	children: PropTypes.node.isRequired,
};