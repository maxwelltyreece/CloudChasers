// statsService.js
import axios from 'axios';

export const fetchStats = async () => {
  try {
    const response = await axios.get('/api/stats'); // replace with your API endpoint
    return response.data;
  } catch (error) {
    console.error(error);
  }
};