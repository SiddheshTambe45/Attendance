import React from 'react'
import { Route, Routes } from 'react-router-dom';
import HodReport from './Report/HodReport';
import HomePage from './HomePage/HomePage';

export default function Hod() {
  return (
    
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/report' element={<HodReport />} />
      </Routes>
  
  )
}
