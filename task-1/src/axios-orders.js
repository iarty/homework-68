import axios from 'axios';

const axiosOrders = axios.create({
  baseURL: 'https://redux-6b899.firebaseio.com/'
});

export default axiosOrders;
