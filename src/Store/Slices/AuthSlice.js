// // src/features/auth/authSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   facultyId: null,
//   department: null,
//   role: null, // 'HOD', 'Faculty', 'Principal'
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     setUser: (state, action) => {
//       state.facultyId = action.payload.facultyId;
//       state.department = action.payload.department;
//       state.role = action.payload.role;
//     },
//     clearUser: (state) => {
//       state.facultyId = null;
//       state.department = null;
//       state.role = null;
//     },
//   },
// });

// export const { setUser, clearUser } = authSlice.actions;
// export default authSlice.reducer;

//-----------------------------------------------------------------

// src/features/auth/authSlice.js
// import { createSlice } from '@reduxjs/toolkit';
// import Cookies from 'js-cookie';

// const cookieUserData = Cookies.get('userData') ? JSON.parse(Cookies.get('userData')) : {};

// const initialState = {
//   facultyId: cookieUserData.facultyId || null,
//   department: cookieUserData.department || null,
//   role: cookieUserData.role || null,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     setUser: (state, action) => {
//       state.facultyId = action.payload.facultyId;
//       state.department = action.payload.department;
//       state.role = action.payload.role;
//     },
//     clearUser: (state) => {
//       state.facultyId = null;
//       state.department = null;
//       state.role = null;
//     },
//   },
// });

// export const { setUser, clearUser } = authSlice.actions;
// export default authSlice.reducer;



// -------------------------------------------

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { decryptData } from '../../Utils/cryptoUtils'; // Adjust the import path as needed

export const initializeAuth = createAsyncThunk('auth/initializeAuth', async (_, { dispatch }) => {
  const encryptedUserData = localStorage.getItem('userData');
  if (encryptedUserData) {
    try {
      const decryptedUserData = await decryptData(encryptedUserData);
      const userData = JSON.parse(decryptedUserData);

      // Dispatch setUser action with decrypted user data
      dispatch(setUser({
        facultyId: userData.facultyId,
        department: userData.department,
        role: userData.role
      }));
    } catch (error) {
      console.error('Failed to decrypt user data:', error);
    }
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    facultyId: null,
    department: null,
    role: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.facultyId = action.payload.facultyId;
      state.department = action.payload.department;
      state.role = action.payload.role;
    },
    clearUser: (state) => {
      state.facultyId = null;
      state.department = null;
      state.role = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initializeAuth.fulfilled, (state, action) => {
      // Handle fulfilled state if needed
    });
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
