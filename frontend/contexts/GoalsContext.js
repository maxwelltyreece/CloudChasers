import React, { createContext, useState, useContext, useMemo } from 'react';
import goalsService from '../services/GoalsService';
import propTypes from 'prop-types';

const GoalsContext = createContext();

/**
 * Provides a context for managing user goals, including fetching, creating, updating, and deleting goals,
 * as well as handling macro goals specifically.
 */
export function GoalsProvider({ children }) {
    // State for all goals of the user
    const [goals, setGoals] = useState([]);

    // Default daily values for each nutrient
    const defaultMacroGoals = {
        calories: { value: 2000, unit: 'kcal' },
        protein: { value: 50, unit: 'g' },
        carbs: { value: 275, unit: 'g' },
        fat: { value: 77, unit: 'g' },
        fiber: { value: 28, unit: 'g' },
        sugar: { value: 50, unit: 'g' },
        sodium: { value: 2300, unit: 'mg' },
        water: { value: 2000, unit: 'ml' },
    };

    // Initialize macroGoals state with defaultMacroGoals
    const [macroGoals, setMacroGoals] = useState(defaultMacroGoals);

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
            await goalsService.createGoal(goalData);
            fetchGoals(); // Refresh the list after adding a new goal
        } catch (error) {
            console.error('Error creating a new goal:', error);
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
            fetchGoals(); // Refresh the goals list to reflect the update
        } catch (error) {
            console.error('Error updating goal:', error);
        }
    };

    /**
     * Deletes a goal by its ID and refreshes the goals list.
     * @param {string} goalId - The ID of the goal to delete.
     */
    const deleteGoal = async (goalId) => {
        try {
            await goalsService.deleteGoal(goalId);
            fetchGoals(); // Refresh the list after deletion
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
            
            // Creates a new object that merges default goals with fetched goals.
            // This ensures that all nutrients are present and avoids direct modification of fetched data.
            const mergedGoals = { ...defaultMacroGoals };
            for (const nutrient in data) {
                if (Object.prototype.hasOwnProperty.call(data, nutrient)) {
                    mergedGoals[nutrient] = data[nutrient];
                }
            }
    
            setMacroGoals(mergedGoals);
        } catch (error) {
            console.error('Error fetching macro goals:', error);
            setMacroGoals(defaultMacroGoals); // Reset to default values if fetching fails
        }
    };
    

    /**
     * Updates an existing macro nutrient goal with new data.
     * @param {string} nutrient - The name of the nutrient to update (e.g., 'calories').
     * @param {Object} goalData - The new goal data for the nutrient, including value and unit.
     */
    const updateMacroGoals = async (nutrient, goalData) => {
        try {
            await goalsService.updateMacroGoals({
                nutrient,
                ...goalData
            });
            fetchMacroGoals();
        } catch (error) {
            console.error('Error updating macro goal in context:', error);
        }
    };

    


    // Memorize the context value to optimize performance and avoid unnecessary re-renders
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

GoalsProvider.propTypes = {
    children: propTypes.node.isRequired,
};