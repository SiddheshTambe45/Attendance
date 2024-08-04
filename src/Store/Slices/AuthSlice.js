// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  facultyId: null,
  department: null,
  role: null, // 'HOD', 'Faculty', 'Principal'
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
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
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
