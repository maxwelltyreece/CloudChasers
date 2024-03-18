// import React, { createContext, useState, useEffect, useContext } from 'react';
// import * as StatsService from '../services/StatsService';

// export const StatsContext = createContext();

// export const StatsProvider = ({ children }) => {
//   const [streaks, setStreaks] = useState(null);
//   const [dailyCaloricIntake, setDailyCaloricIntake] = useState(null);
//   const [dailyWaterIntake, setDailyWaterIntake] = useState(null);
//   const [dailyProteinIntake, setDailyProteinIntake] = useState(null);
//   const [dailyCarbIntake, setDailyCarbIntake] = useState(null);
//   const [dailyFatIntake, setDailyFatIntake] = useState(null);
//   const [dailySugarIntake, setDailySugarIntake] = useState(null);
//   const [dailySodiumIntake, setDailySodiumIntake] = useState(null);
//   const [dailyFibreIntake, setDailyFibreIntake] = useState(null);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const streaksResponse = await StatsService.getStreaks();
//         setStreaks(streaksResponse.data);

//         const dailyCaloricIntakeResponse = await StatsService.getDailyCaloricIntake();
//         setDailyCaloricIntake(dailyCaloricIntakeResponse.data);

//         const dailyWaterIntakeResponse = await StatsService.getDailyWaterIntake();
//         setDailyWaterIntake(dailyWaterIntakeResponse.data);

//         const dailyProteinIntakeResponse = await StatsService.getDailyProteinIntake();
//         setDailyProteinIntake(dailyProteinIntakeResponse.data);

//         const dailyCarbIntakeResponse = await StatsService.getDailyCarbIntake();
//         setDailyCarbIntake(dailyCarbIntakeResponse.data);

//         const dailyFatIntakeResponse = await StatsService.getDailyFatIntake();
//         setDailyFatIntake(dailyFatIntakeResponse.data);

//         const dailySugarIntakeResponse = await StatsService.getDailySugarIntake();
//         setDailySugarIntake(dailySugarIntakeResponse.data);

//         const dailySodiumIntakeResponse = await StatsService.getDailySodiumIntake();
//         setDailySodiumIntake(dailySodiumIntakeResponse.data);

//         const dailyFibreIntakeResponse = await StatsService.getDailyFibreIntake();
//         setDailyFibreIntake(dailyFibreIntakeResponse.data);

//       } catch (error) {
//         console.error('Error fetching stats:', error);
//       }
//     };

//     fetchStats();
//   }, []);

//   return (
//     <StatsContext.Provider value={{ streaks, dailyCaloricIntake, dailyWaterIntake, dailyProteinIntake, dailyCarbIntake, dailyFatIntake, dailySugarIntake, dailySodiumIntake, dailyFibreIntake }}>
//       {children}
//     </StatsContext.Provider>
//   );
// };


// export const useStats = () => useContext(StatsContext);


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
        console.log('RESPONSE DATAA', response.data);
        setTodayStats(prevStats => ({
          ...prevStats,
          [nutrient]: response.data[`total${nutrient}`],
        }));
        console.log('TODAY STATS:', todayStats);
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