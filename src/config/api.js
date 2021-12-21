import axios from 'axios';

const scalerApi = axios.create({
  baseURL: process.env.REACT_APP_SCALER_API
});

export default scalerApi;