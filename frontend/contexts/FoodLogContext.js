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
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            console.error('Token not available');
            return;
        }
        const food = await foodLogService.getLatestLoggedFood();
		console.log('Updating latestLoggedFood to:', food.data);
        setLatestLoggedFood(food.data);
        console.log('Latest logged food CONTEXT:', food.data.macros);
    } catch (error) {
        console.error("Error fetching latest logged food:", error);
        // Optionally, handle the error by setting some state or through other means
    }
};


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