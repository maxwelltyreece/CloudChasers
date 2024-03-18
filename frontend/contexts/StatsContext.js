import React, { createContext, useState, useContext, useMemo } from 'react';
import statsService from '../services/StatsService';
import propTypes from 'prop-types';

const StatsContext = createContext();

export function StatsProvider({ children }) {
  const [todayStats, setTodayStats] = useState({});

  const updateStat = async (nutrientFunction, nutrient, date) => {
    try {
      const response = await nutrientFunction(date);
      if (response.data) {
        setTodayStats(prevStats => ({
          ...prevStats,
          [nutrient]: response.data[`total${nutrient}`],
        }));
      }
    } catch (error) {
      console.error(`Error fetching daily ${nutrient} intake CONTEXT:`, error);
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
    console.log('TODAY:', today);

    console.log('Updating food stats...');
    await Promise.all([
        getDailyCaloricIntake(today),
        getDailyWaterIntake(today),
        getDailyProteinIntake(today),
        getDailyCarbIntake(today),
        getDailyFatIntake(today),
        getDailySugarIntake(today),
        getDailySodiumIntake(today),
        getDailyFibreIntake(today),
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
