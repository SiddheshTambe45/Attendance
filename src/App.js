



// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Faculty from './Pages/Faculty/Faculty';
import Hod from './Pages/HOD/Hod';
import Principal from './Pages/Principal/Principal';
import SignUp from './Pages/Authentication/SignUp/SignUp';
import Login from './Pages/Authentication/Login/Login';
import PrivateRoute from './Components/PrivateRoute';
import HomePage from './Pages/HomePage/HomePage';
import Admin from './Pages/Admin/Admin'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute allowedRoles={['Faculty']} />}>
          <Route path="/faculty/*" element={<Faculty />} />
        </Route>
        <Route element={<PrivateRoute allowedRoles={['HOD']} />}>
          <Route path="/hod/*" element={<Hod />} />
        </Route>
        {/* <Route element={<PrivateRoute allowedRoles={['Principal']} />}> */}
          <Route path="/principal/*" element={<Principal />} />
        {/* </Route> */}
         {/* <Route element={<PrivateRoute allowedRoles={['Principal']} />}> */}
         <Route path="/admin/*" element={<Admin />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}
