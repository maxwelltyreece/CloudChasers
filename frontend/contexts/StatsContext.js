import React, { createContext, useState, useContext, useMemo } from 'react';
import statsService from '../services/StatsService';
import propTypes from 'prop-types';

const StatsContext = createContext();

export function StatsProvider({ children }) {
  const [todayStats, setTodayStats] = useState({
    calories: 1250,
    water: 800,
    protein: 40,
    carbs: 50,
    fat: 32,
    sugar: 12,
    sodium: 15,
    fiber: 22,
  });

  const updateStat = async (nutrientFunction, nutrient) => {
    try {
      const response = await nutrientFunction();
      if (response.data) {
        setTodayStats(prevStats => ({
          ...prevStats,
          [nutrient]: response.data.total,
        }));
      }
    } catch (error) {
      console.error(`Error fetching daily ${nutrient} intake:`, error);
    }
  };

  const getDailyCaloricIntake = () => updateStat(statsService.getDailyCaloricIntake, 'calories');
  const getDailyWaterIntake = () => updateStat(statsService.getDailyWaterIntake, 'water');
  const getDailyProteinIntake = () => updateStat(statsService.getDailyProteinIntake, 'protein');
  const getDailyCarbIntake = () => updateStat(statsService.getDailyCarbIntake, 'carbs');
  const getDailyFatIntake = () => updateStat(statsService.getDailyFatIntake, 'fat');
  const getDailySugarIntake = () => updateStat(statsService.getDailySugarIntake, 'sugar');
  const getDailySodiumIntake = () => updateStat(statsService.getDailySodiumIntake, 'sodium');
  const getDailyFibreIntake = () => updateStat(statsService.getDailyFibreIntake, 'fiber');

  const updateTodayStats = async () => {
    console.log('Updating food stats...');
    await Promise.all([
      getDailyCaloricIntake(),
      getDailyWaterIntake(),
      getDailyProteinIntake(),
      getDailyCarbIntake(),
      getDailyFatIntake(),
      getDailySugarIntake(),
      getDailySodiumIntake(),
      getDailyFibreIntake(),
    ]);
  };

  const value = useMemo(() => ({
    todayStats,
    updateTodayStats,
    // Add individual nutrient functions if needed externally
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
