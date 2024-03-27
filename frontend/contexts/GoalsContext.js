import React, { createContext, useState, useContext, useMemo } from 'react';
import goalsService from '../services/GoalsService';
import PropTypes from 'prop-types';

const GoalsContext = createContext();

/**
 * Provides a context for managing user goals, including fetching, creating, updating, and deleting goals,
 * as well as handling macro goals specifically.
 */
export function GoalsProvider({ children }) {
	const [goals, setGoals] = useState([]);
	const [macroGoals, setMacroGoals] = useState({});
    
	/**
     * Fetches all goals associated with the user and updates the state.
     */
	const fetchGoals = async () => {
		try {
			const { data } = await goalsService.getAllGoalsOfUser();
			setGoals(data);
		} catch (error) {
			console.error('Error fetching goals:', error);
		}
	};

	/**
     * Creates a new goal based on provided goal data and refreshes the goals list.
     * @param {Object} goalData - The data for the new goal to create.
     */
	const createGoal = async (goalData) => {
		try {
			const response = await goalsService.createGoal(goalData);
			fetchGoals();
			return response;
		} catch (error) {
			console.error('Error creating goal:', error);
		}
	};
    

	/**
     * Updates an existing goal with new data based on the goal's ID.
     * @param {string} goalId - The ID of the goal to update.
     * @param {Object} updateData - The new data for the goal.
     */
	const updateGoal = async (goalId, updateData) => {
		try {
			await goalsService.updateGoal(goalId, updateData);
			fetchGoals(); 
		} catch (error) {
			console.error('Error updating goal CONTEXT:', error);
		}
	};

	/**
     * Deletes a goal by its ID and refreshes the goals list.
     * @param {string} goalId - The ID of the goal to delete.
     */
	const deleteGoal = async (goalId) => {
		try {
			await goalsService.deleteGoal(goalId);
			fetchGoals();
		} catch (error) {
			console.error('Error deleting goal:', error);
		}
	};

	/**
     * Fetches macro goals and updates the state.
     */
	const fetchMacroGoals = async () => {
		try {
			const { data } = await goalsService.getMacroGoals();
			setMacroGoals(data);
		} catch (error) {
			console.error('Error fetching macro goals:', error);
		}
	};

	/**
     * Updates an existing macro nutrient goal with new data.
     * @param {string} nutrient - The name of the nutrient to update (e.g., 'calories').
     * @param {Object} goalData - The new goal data for the nutrient, including value and unit.
     */
	const updateMacroGoals = async (nutrient, goalMaxValue) => {
		try {
			await goalsService.updateMacroGoals({
				nutrient,
				...goalMaxValue
			});
			fetchMacroGoals();
		} catch (error) {
			console.error('Error updating macro goal in context:', error);
		}
	};

	const value = useMemo(() => ({
		goals,
		macroGoals,
		fetchGoals,
		createGoal,
		updateGoal,
		deleteGoal,
		fetchMacroGoals,
		updateMacroGoals
	}), [goals, macroGoals, fetchGoals, createGoal, updateGoal, deleteGoal, fetchMacroGoals, updateMacroGoals]);

	return (
		<GoalsContext.Provider value={value}>
			{children}
		</GoalsContext.Provider>
	);
}

/**
 * Custom hook to use the goals context.
 * @returns The context with all goals, macro goals, and functions to manage goals.
 */
export const useGoals = () => useContext(GoalsContext);

GoalsProvider.PropTypes = {
	children: PropTypes.node.isRequired,
};
