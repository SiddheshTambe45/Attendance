// // apiClient.js
// import axios from 'axios';

// const apiClient = axios.create({
//   baseURL: 'http://localhost:4545', // Replace with your API base URL
// });

// apiClient.interceptors.request.use(
//   config => {
//     const token = localStorage.getItem('accessToken');
//     console.log(token)
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   error => Promise.reject(error)
// );

// apiClient.interceptors.response.use(
//   response => response,
//   async error => {
//     const originalRequest = error.config;
//     console.error('API call error:', error.response);

//     if (error.response.status === 403 && !originalRequest._retry) { 
//       originalRequest._retry = true;
//       try {
//         console.log('Attempting to refresh token...');
//         const response = await axios.post('http://localhost:4545/authenticate/token/refresh', {}, { withCredentials: true });
//         const newToken = response.data.accessToken;
//         console.log('New Access Token:', newToken);
//         localStorage.setItem('accessToken', newToken);
//         originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
//         return apiClient(originalRequest);
//       } catch (refreshError) {
//         console.error('Refresh token error:', refreshError);
//         // Handle refresh token failure (e.g., logout user)
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default apiClient;
