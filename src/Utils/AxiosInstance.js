// import axios from 'axios';
// import { clearUser } from '../Store/Slices/AuthSlice'; // Import the clearUser action from authSlice
// import {store} from '../Store/Store'; // Import your Redux store
// import { useNavigate } from 'react-router-dom';

// // Create an Axios instance
// const axiosInstance = axios.create({
//   baseURL:  'http://localhost:4545'   /*'https://lightning-endless-czech-alto.trycloudflare.com' */ ,
//   withCredentials: true, // Ensure cookies are sent with requests
// });

// // Add a response interceptor to handle token expiration (401 status)
// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response; // Return the response if successful
//   },
//   (error) => {
//     if (error.response.status === 401) {
//       // If the request fails with a 401 error (Unauthorized)
      
//       store.dispatch(clearUser()); // Dispatch clearUser to reset auth state

//       const navigate = useNavigate(); // Hook to navigate to login
//       navigate('/login'); // Redirect the user to the login page

//     }
//     return Promise.reject(error); // Reject the error if it's not 401 or after handling
//   }
// );

// export default axiosInstance;


// import axios from 'axios';

// // Create an Axios instance
// const axiosInstance = axios.create({
//   baseURL: /* 'http://localhost:4545' */ 'https://attendance-backend-gold.vercel.app' , 
//   withCredentials: true, // Ensure cookies are sent with requests
// });

// // Add a response interceptor to handle token expiration
// axiosInstance.interceptors.response.use(
//   (response) => {
//     // Return the response if successful
//     return response;
//   },
//   (error) => {
//     // Handle other errors here if necessary
//     return Promise.reject(error); // Reject the error to be handled by the calling component
//   }
// );

// export default axiosInstance;


import axios from 'axios';
import { encryptData, decryptData } from './cryptoUtils'; // Adjust path as needed

const axiosInstance = axios.create({
  baseURL:  /*'http://localhost:4545'*/ 'https://attendance-backend-gold.vercel.app',
  withCredentials: true, // Ensure cookies are sent with requests
});

// Add a request interceptor to include tokens in headers
axiosInstance.interceptors.request.use(
  async (config) => {
    const encryptionKey = process.env.REACT_APP_ENCRYPTION_KEY;

    // Retrieve and decrypt the access token
    const encryptedAccessToken = localStorage.getItem('accessToken');
    if (encryptedAccessToken) {
      try {
        const accessToken = await decryptData(encryptedAccessToken, encryptionKey);
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      } catch (error) {
        console.error('Error decrypting access token:', error);
      }
    }

    // Retrieve and decrypt the refresh token
    const encryptedRefreshToken = localStorage.getItem('refreshToken');
    if (encryptedRefreshToken) {
      try {
        const refreshToken = await decryptData(encryptedRefreshToken, encryptionKey);
        config.headers['x-refresh-token'] = refreshToken;
      } catch (error) {
        console.error('Error decrypting refresh token:', error);
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
  async (response) => {
    // If the response has a new access token, update local storage
    const newAccessToken = response.headers['x-access-token'];
    if (newAccessToken) {
      // Encrypt and store the new access token
      const encryptionKey = process.env.REACT_APP_ENCRYPTION_KEY;
      const encryptedAccessToken = await encryptData(newAccessToken, encryptionKey);
      localStorage.setItem('accessToken', encryptedAccessToken);
    }

    return response;
  },
  async (error) => {
    // Handle other errors here if necessary
    return Promise.reject(error); // Reject the error to be handled by the calling component
  }
);

export default axiosInstance;
