import React, { createContext, useState, useContext, useMemo } from 'react';
import foodStatsService from '../services/foodStatsService';
import propTypes from 'prop-types';

const FoodStatsContext = createContext();

export function FoodStatsProvider({ children }) {
  const [foodStats, setFoodStats] = useState({
    calories: 72,
    water: 55,
    protein: 40,
    carbs: 50,
    fat: 32,
    sugar: 12,
    sodium: 15,
    fiber: 22,
  });

  const getDailyNutrientIntake = async (nutrient) => {
    try {
      const data = await foodStatsService.getDailyNutrientIntake(nutrient);
      if (data) {
        setFoodStats((prevStats) => ({
          ...prevStats,
          [nutrient]: data[`total${nutrient.charAt(0).toUpperCase() + nutrient.slice(1)}`],
        }));
      }
    } catch (error) {
      console.error(`Error fetching daily ${nutrient} intake:`, error);
    }
  };

  const updateFoodStats = async () => {
    console.log('Updating food stats...');
    // This could be used to fetch all relevant nutrient data in one go, if your API supports it
    // For simplicity, you might call getDailyNutrientIntake for each nutrient here
    const nutrients = ['calories', 'water', 'protein', 'carbs', 'fat', 'sugar', 'sodium', 'fiber']; // Add other nutrients as needed
    nutrients.forEach((nutrient) => {
      getDailyNutrientIntake(nutrient);
    });
  };


  const value = useMemo(() => ({
    foodStats,
    getDailyNutrientIntake,
    updateFoodStats,
  }), [foodStats, getDailyNutrientIntake, updateFoodStats]);

  return (
    <FoodStatsContext.Provider value={value}>
      {children}
    </FoodStatsContext.Provider>
  );
}

export const useFoodStats = () => useContext(FoodStatsContext);

FoodStatsProvider.propTypes = {
    children: propTypes.node.isRequired,
};