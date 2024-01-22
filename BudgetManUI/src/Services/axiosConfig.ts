import axios from "axios";
import router from '@/router'; // Import your Vue Router instance
// const baseAPIUrl = "localhost:333/api/";
export const axiosInstance = axios.create({
    baseURL: "https://budgetmanbackendapi20231207220149.azurewebsites.net/api/",
    timeout: 10000,
    headers: {'X-Custom-Header': 'foobar'}
  });

  
// Get the token from the cookies
const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
};
const token = getCookie('accessToken');

if (token) {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    // console.log(error);
    //handle network error maybe mean there is a problem with back-end server or it's not started
    if (error.code === 'ERR_NETWORK') {
      // console.log(error.message);
      router.push({ name: 'error'});
    }
    if (error.code === 'ERR_BAD_REQUEST'){
      console.log(axiosInstance.defaults.headers.common['Authorization']);
      console.log(error.message)
      // router.push({ name: 'login'});
    }
    return Promise.reject(error);
  }
);