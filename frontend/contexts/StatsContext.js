import React, { createContext, useState, useContext, useMemo } from 'react';
import statsService from '../services/StatsService';
import propTypes from 'prop-types';

const StatsContext = createContext();

export function StatsProvider({ children }) {
  const [ todayStats, setTodayStats] = useState({
    calories: 1250,
    water: 800,
    protein: 40,
    carbs: 50,
    fat: 32,
    sugar: 12,
    sodium: 15,
    fiber: 22,
    // calories: 0,
    // water: 0,
    // protein: 0,
    // carbs: 0,
    // fat: 0,
    // sugar: 0,
    // sodium: 0,
    // fiber: 0,
  });

  const getDailyNutrientIntake = async (nutrient) => {
    try {
      const data = await statsService.getDailyNutrientIntake(nutrient);
      if (data) {
        setTodayStats((prevStats) => ({
          ...prevStats,
          [nutrient]: data[`total${nutrient.charAt(0).toUpperCase() + nutrient.slice(1)}`],
        }));
      }
    } catch (error) {
      console.error(`Error fetching daily ${nutrient} intake:`, error);
    }
  };

  const updateTodayStats = async () => {
    console.log('Updating food stats...');
    // This could be used to fetch all relevant nutrient data in one go, if your API supports it
    // For simplicity, you might call getDailyNutrientIntake for each nutrient here
    const nutrients = ['calories', 'water', 'protein', 'carbs', 'fat', 'sugar', 'sodium', 'fiber']; // Add other nutrients as needed
    nutrients.forEach((nutrient) => {
      getDailyNutrientIntake(nutrient);
    });
  };


  const value = useMemo(() => ({
    todayStats,
    getDailyNutrientIntake,
    updateTodayStats,
  }), [todayStats, getDailyNutrientIntake, updateTodayStats]);

  return (
    <StatsContext.Provider value={value}>
      {children}
    </StatsContext.Provider>
  );
}

export const useStats = () => useContext(StatsContext);

StatsProvider.propTypes = {
    children: propTypes.node.isRequired,
};