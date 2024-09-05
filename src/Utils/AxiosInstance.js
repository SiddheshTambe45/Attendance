import axios from 'axios';
import { clearUser } from '../Store/Slices/AuthSlice'; // Import the clearUser action from authSlice
import {store} from '../Store/Store'; // Import your Redux store
import { useNavigate } from 'react-router-dom';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: /* 'http://localhost:4545' */ 'https://lightning-endless-czech-alto.trycloudflare.com' ,
  withCredentials: true, // Ensure cookies are sent with requests
});

// Add a response interceptor to handle token expiration (401 status)
axiosInstance.interceptors.response.use(
  (response) => {
    return response; // Return the response if successful
  },
  (error) => {
    if (error.response.status === 401) {
      // If the request fails with a 401 error (Unauthorized)
      
      store.dispatch(clearUser()); // Dispatch clearUser to reset auth state

      const navigate = useNavigate(); // Hook to navigate to login
      navigate('/login'); // Redirect the user to the login page

    }
    return Promise.reject(error); // Reject the error if it's not 401 or after handling
  }
);

export default axiosInstance;
