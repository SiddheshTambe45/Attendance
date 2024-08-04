// import axios from 'axios';

// // Create an Axios instance
// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:4545',
//   withCredentials: true, // Ensure cookies are sent with requests
// });

// // Add a request interceptor to include the Authorization header
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('accessToken'); // Assuming you store the access token in local storage
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Add a response interceptor to handle token refresh
// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const response = await axiosInstance.post('/auth/refresh-token', {}, { withCredentials: true });
//         const { accessToken, refreshToken } = response.data;

//         // Store new tokens
//         localStorage.setItem('accessToken', accessToken);
//         document.cookie = `authRefreshToken=${refreshToken}; path=/; secure; HttpOnly`;

//         // Update the Authorization header and retry the request
//         axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
//         originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;


import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:4545',
  withCredentials: true, // Ensure cookies are sent with requests
});

// Add a request interceptor to include the Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken'); // Assuming you store the access token in local storage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Directly handle token refresh through the backend's middleware if needed
        const response = await axiosInstance(originalRequest); // Retry the failed request with existing cookies
        return response;
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
