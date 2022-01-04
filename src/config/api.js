import axios from 'axios';

const scalerApi = axios.create({
  baseURL: process.env.REACT_APP_SCALER_API || "http://localhost:3000"
});

scalerApi.interceptors.request.use(req => {
  const idToken = sessionStorage.getItem('idToken');
  if (idToken) {
      req.headers["Authorization"] = `Bearer ${idToken}`
  }
  return req; 
})

export default scalerApi;

export function parseError(error) {
  const {response} = error;
  if(!response) return "Oops something went wrong";
  if(response.data.error) return response.data.error;
  if(response.data.errors) return response.data.errors.join(", ")
}