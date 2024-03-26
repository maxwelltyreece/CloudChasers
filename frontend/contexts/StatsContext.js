import React, { createContext, useState, useContext, useMemo } from 'react';
import statsService from '../services/StatsService';
import propTypes from 'prop-types';

const StatsContext = createContext();

export function StatsProvider({ children }) {
  const [todayStats, setTodayStats] = useState({});
  const [streak, setStreak] = useState(0);

const updateStat = async (nutrientFunction, nutrient, date) => {
    try {
        const response = await nutrientFunction(date);
        if (response.data) {
            const updatedStats = {
                ...todayStats,
                [nutrient]: response.data[`total${nutrient.charAt(0).toUpperCase() + nutrient.slice(1)}`], // Capitalising first letter of nutrient
            };
            setTodayStats(updatedStats);
            return updatedStats[nutrient];
        }
    } catch (error) {
        console.error(`Error fetching daily ${nutrient} intake CONTEXT:`, error);
    }
};
  
  const updateStreak = async (date) => {
    try {
      const response = await statsService.getStreaks(date);
      if (response.streak !== undefined) {
        if (response.streak === 0) {
          setStreak(1);
        } else {
          setStreak(response.streak);
        }
      }
    } catch (error) {
      console.error('Error fetching streak CONTEXT:', error);
    }
  };


  const getDailyCaloricIntake = (date) => updateStat(statsService.getDailyCaloricIntake, 'calories', date);
  const getDailyWaterIntake = (date) => updateStat(statsService.getDailyWaterIntake, 'water', date);
  const getDailyProteinIntake = (date) => updateStat(statsService.getDailyProteinIntake, 'protein', date);
  const getDailyCarbIntake = (date) => updateStat(statsService.getDailyCarbIntake, 'carbs', date);
  const getDailyFatIntake = (date) => updateStat(statsService.getDailyFatIntake, 'fat', date);
  const getDailySugarIntake = (date) => updateStat(statsService.getDailySugarIntake, 'sugar', date);
  const getDailySodiumIntake = (date) => updateStat(statsService.getDailySodiumIntake, 'sodium', date);
  const getDailyFibreIntake = (date) => updateStat(statsService.getDailyFibreIntake, 'fibre', date);

const updateTodayStats = async () => {
    const today = new Date().toISOString().split('T')[0];
    const nutrientFunctions = [
        getDailyCaloricIntake,
        getDailyWaterIntake,
        getDailyProteinIntake,
        getDailyCarbIntake,
        getDailyFatIntake,
        getDailySugarIntake,
        getDailySodiumIntake,
        getDailyFibreIntake,
    ];

    const nutrientNames = [
        'calories',
        'water',
        'protein',
        'carbs',
        'fat',
        'sugar',
        'sodium',
        'fibre',
    ];

    try {
        const nutrientData = await Promise.all(nutrientFunctions.map(func => func(today)));
        setTodayStats(prevStats => {
            const newStats = { ...prevStats };
            nutrientData.forEach((value, index) => {
                newStats[nutrientNames[index]] = value;
            });
            return newStats;
        });
        await updateStreak(today);
    } catch (error) {
        console.error('Error updating today stats:', error);
    }
};

  const value = useMemo(() => ({
    todayStats,
    streak,
    updateTodayStats,
    updateStreak,
    getDailyCaloricIntake,
    getDailyWaterIntake,
    getDailyProteinIntake,
    getDailyCarbIntake,
    getDailyFatIntake,
    getDailySugarIntake,
    getDailySodiumIntake,
    getDailyFibreIntake,
    
  }), [todayStats]);

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
