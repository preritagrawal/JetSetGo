import axios from 'axios';

const API_URL = 'https://api.npoint.io/4829d4ab0e96bfab50e7';

export const fetchFlights = async () => {

  try {
    const response = await axios.get(API_URL);

    if (!response.data || !response.data.data || !response.data.data.result) {
      throw new Error('Invalid response format');
    }
    return response.data.data.result;
  } catch (error) {
    console.log('Error fetching flights:', error);
    throw error;
  }
};
