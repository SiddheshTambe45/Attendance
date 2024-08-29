// src/Pages/Authentication/Logout/Logout.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../../Store/Slices/AuthSlice';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Make sure to install js-cookie

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data from Redux
    dispatch(clearUser());

    // Remove cookies
    Cookies.remove('accessToken'); // Replace 'token' with your cookie key if different
    Cookies.remove('authRefreshToken');
    Cookies.remove('userData');

    // Redirect to login page
    navigate('/login');
  };

  return (
    <div>
      <button onClick={handleLogout} className="btn bg-transparent rounded-0 text-danger" style={{fontSize:'3rem'}}>Logout</button>
    </div>
  );
};

export default Logout;
