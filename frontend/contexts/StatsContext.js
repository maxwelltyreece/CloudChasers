import React, { createContext, useState, useContext, useMemo } from 'react';
import statsService from '../services/StatsService';
import PropTypes from 'prop-types';

const StatsContext = createContext();
/**
 * Provides the StatsContext to its children.
 * @param {Object} props The props of the component.
 * @param {React.ReactNode} props.children The children nodes.
 */
export function StatsProvider({ children }) {
  const [todayStats, setTodayStats] = useState({});
  const [streak, setStreak] = useState(0);
  /**
   * Updates a specific nutrient stat.
   * @param {Function} nutrientFunction The function to get the nutrient data.
   * @param {string} nutrient The name of the nutrient.
   * @param {string} date The date to get the data for.
   * @returns {Promise<number>} The updated nutrient stat.
   */
  const updateStat = async (nutrientFunction, nutrient, date) => {
    try {
      const response = await nutrientFunction(date);
      if (response.data) {
        const updatedStats = {
          ...todayStats,
          [nutrient]:
            response.data[
              `total${nutrient.charAt(0).toUpperCase() + nutrient.slice(1)}`
            ], // Capitalising first letter of nutrient
        };
        setTodayStats(updatedStats);
        return updatedStats[nutrient];
      }
    } catch (error) {
      console.error(`Error fetching daily ${nutrient} intake CONTEXT:`, error);
    }
  };
  /**
   * Updates the streak stat.
   * @param {string} date The date to get the data for.
   */
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
      console.error("Error fetching streak CONTEXT:", error);
    }
  };

  const getDailyCaloricIntake = (date) =>
    updateStat(statsService.getDailyCaloricIntake, "calories", date);
  const getDailyWaterIntake = (date) =>
    updateStat(statsService.getDailyWaterIntake, "water", date);
  const getDailyProteinIntake = (date) =>
    updateStat(statsService.getDailyProteinIntake, "protein", date);
  const getDailyCarbIntake = (date) =>
    updateStat(statsService.getDailyCarbIntake, "carbs", date);
  const getDailyFatIntake = (date) =>
    updateStat(statsService.getDailyFatIntake, "fat", date);
  const getDailySugarIntake = (date) =>
    updateStat(statsService.getDailySugarIntake, "sugar", date);
  const getDailySodiumIntake = (date) =>
    updateStat(statsService.getDailySodiumIntake, "sodium", date);
  const getDailyFibreIntake = (date) =>
    updateStat(statsService.getDailyFibreIntake, "fibre", date);

  /**
   * Updates all the stats for today.
   */
  const updateTodayStats = async () => {
    const today = new Date().toISOString().split("T")[0];
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
      "calories",
      "water",
      "protein",
      "carbs",
      "fat",
      "sugar",
      "sodium",
      "fibre",
    ];

    try {
      const nutrientData = await Promise.all(
        nutrientFunctions.map((func) => func(today))
      );
      setTodayStats((prevStats) => {
        const newStats = { ...prevStats };
        nutrientData.forEach((value, index) => {
          newStats[nutrientNames[index]] = value;
        });
        return newStats;
      });
      await updateStreak(today);
    } catch (error) {
      console.error("Error updating today stats:", error);
    }
  };

  const value = useMemo(
    () => ({
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
    }),
    [todayStats]
  );

  return (
    <StatsContext.Provider value={value}>{children}</StatsContext.Provider>
  );
}

/**
 * Custom hook to use the StatsContext.
 * @returns {Object} The stats state and its setter functions.
 */
export const useStats = () => useContext(StatsContext);

StatsProvider.PropTypes = {
	children: PropTypes.node.isRequired,
};
