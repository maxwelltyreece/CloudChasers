// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { LocalIP } from '../screens/IPIndex';

// export async function getStreaks() {
//   console.log('Fetching streaks...');
//   try {
//     const token = await AsyncStorage.getItem('token');
//     const date = new Date(); // Create a new Date object
//     const body = { date: date }; // Create a body object with the date
//     const response = await fetch(`http://${LocalIP}:3000/stats/streak`, {
//       method: 'POST',
//       headers: { 
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json' // Set the content type to JSON
//       },
//       body: JSON.stringify(body) // Convert the body object to JSON string
//     });
//     console.log('Streaks response:', response);
//     return response.json();
//   } catch (error) {
//     console.error('Error fetching streaks:', error);
//     throw error;
//   }
// }

// export async function getDailyCaloricIntake() {
//   try {
//       const token = await AsyncStorage.getItem('token');
//       const response = await fetch(`http://${LocalIP}:3000/stats/dailyCaloricIntake`, {
//           headers: { Authorization: `Bearer ${token}` },
//       });
//       return response.json();
//   } catch (error) {
//       console.error('Error fetching daily caloric intake:', error);
//       throw error;
//   }
// }

// export async function getDailyWaterIntake() {
//   try {
//       const token = await AsyncStorage.getItem('token');
//       const response = await fetch(`http://${LocalIP}:3000/stats/dailyWaterIntake`, {
//           headers: { Authorization: `Bearer ${token}` },
//       });
//       return response.json();
//   } catch (error) {
//       console.error('Error fetching daily water intake:', error);
//       throw error;
//   }
// }
// export async function getDailyProteinIntake() {
//   try {
//       const token = await AsyncStorage.getItem('token');
//       const response = await fetch(`http://${LocalIP}:3000/stats/dailyProteinIntake`, { headers: { Authorization: `Bearer ${token}` } });
//       return response.json();
//   } catch (error) {
//       console.error('Error fetching daily protein intake:', error);
//       throw error;
//   }
// }

// export async function getDailyCarbIntake() {
//   try {
//       const token = await AsyncStorage.getItem('token');
//       const response = await fetch(`http://${LocalIP}:3000/stats/dailyCarbIntake`, { headers: { Authorization: `Bearer ${token}` } });
//       return response.json();
//   } catch (error) {
//       console.error('Error fetching daily carb intake:', error);
//       throw error;
//   }
// }

// export async function getDailyFatIntake() {
//   try {
//       const token = await AsyncStorage.getItem('token');
//       const response = await fetch(`http://${LocalIP}:3000/stats/dailyFatIntake`, { headers: { Authorization: `Bearer ${token}` } });
//       return response.json();
//   } catch (error) {
//       console.error('Error fetching daily fat intake:', error);
//       throw error;
//   }
// }

// export async function getDailySugarIntake() {
//   try {
//       const token = await AsyncStorage.getItem('token');
//       const response = await fetch(`http://${LocalIP}:3000/stats/dailySugarIntake`, { headers: { Authorization: `Bearer ${token}` } });
//       return response.json();
//   } catch (error) {
//       console.error('Error fetching daily sugar intake:', error);
//       throw error;
//   }
// }

// export async function getDailySodiumIntake() {
//   try {
//       const token = await AsyncStorage.getItem('token');
//       const response = await fetch(`http://${LocalIP}:3000/stats/dailySodiumIntake`, { headers: { Authorization: `Bearer ${token}` } });
//       return response.json();
//   } catch (error) {
//       console.error('Error fetching daily sodium intake:', error);
//       throw error;
//   }
// }

// export async function getDailyFibreIntake() {
//   try {
//       const token = await AsyncStorage.getItem('token');
//       const response = await fetch(`http://${LocalIP}:3000/stats/dailyFibreIntake`, { headers: { Authorization: `Bearer ${token}` } });
//       return response.json();
//   } catch (error) {
//       console.error('Error fetching daily fibre intake:', error);
//       throw error;
//   }
// }

// // export default {
// //     getStreaks,
// //     getDailyCaloricIntake,
// //     getDailyWaterIntake,
// //     getDailyProteinIntake,
// //     getDailyCarbIntake,
// //     getDailyFatIntake,
// //     getDailySugarIntake,
// //     getDailySodiumIntake,
// //     getDailyFibreIntake,
// // };




import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocalIP } from '../screens/IPIndex';


const getDailyCaloricIntake = async (date) => {
    try {
        const token = await AsyncStorage.getItem('token');
        return await axios.get(`http:${LocalIP}:3000/stats/dailyCaloricIntake?date=${date}`, { 
            headers: { Authorization: `Bearer ${token}` } 
        });
    } catch (error) {
        console.error('Error fetching daily caloric intake SERVICE:', error);
        throw error;
    }
};

const getDailyWaterIntake = async (date) => {
    try {
        const token = await AsyncStorage.getItem('token');
        return await axios.get(`http:${LocalIP}:3000/stats/dailyWaterIntake?date=${date}`, { headers: { Authorization: `Bearer ${token}` } });
    } catch (error) {
        console.error('Error fetching daily water intake:', error);
        throw error;
    }
};

const getDailyProteinIntake = async (date) => {
    try {
        const token = await AsyncStorage.getItem('token');
        return await axios.get(`http:${LocalIP}:3000/stats/dailyProteinIntake?date=${date}`, { headers: { Authorization: `Bearer ${token}` } });
    } catch (error) {
        console.error('Error fetching daily protein intake:', error);
        throw error;
    }
};

const getDailyCarbIntake = async (date) => {
    try {
        const token = await AsyncStorage.getItem('token');
        return await axios.get(`http:${LocalIP}:3000/stats/dailyCarbIntake?date=${date}`, { headers: { Authorization: `Bearer ${token}` } });
    } catch (error) {
        console.error('Error fetching daily carb intake:', error);
        throw error;
    }
};

const getDailyFatIntake = async (date) => {
    try {
        const token = await AsyncStorage.getItem('token');
        return await axios.get(`http:${LocalIP}:3000/stats/dailyFatIntake?date=${date}`, { headers: { Authorization: `Bearer ${token}` } });
    } catch (error) {
        console.error('Error fetching daily fat intake:', error);
        throw error;
    }
};

const getDailySugarIntake = async (date) => {
    try {
        const token = await AsyncStorage.getItem('token');
        return await axios.get(`http:${LocalIP}:3000/stats/dailySugarIntake?date=${date}`, { headers: { Authorization: `Bearer ${token}` } });
    } catch (error) {
        console.error('Error fetching daily sugar intake:', error);
        throw error;
    }
};

const getDailySodiumIntake = async (date) => {
    try {
        const token = await AsyncStorage.getItem('token');
        return await axios.get(`http:${LocalIP}:3000/stats/dailySodiumIntake?date=${date}`, { headers: { Authorization: `Bearer ${token}` } });
    } catch (error) {
        console.error('Error fetching daily sodium intake:', error);
        throw error;
    }
};

const getDailyFibreIntake = async (date) => {
    try {
        const token = await AsyncStorage.getItem('token');
        return await axios.get(`http:${LocalIP}:3000/stats/dailyFibreIntake?date=${date}`, { headers: { Authorization: `Bearer ${token}` } });
    } catch (error) {
        console.error('Error fetching daily fibre intake:', error);
        throw error;
    }
};

export default {
    getDailyCaloricIntake,
    getDailyWaterIntake,
    getDailyProteinIntake,
    getDailyCarbIntake,
    getDailyFatIntake,
    getDailySugarIntake,
    getDailySodiumIntake,
    getDailyFibreIntake,
};