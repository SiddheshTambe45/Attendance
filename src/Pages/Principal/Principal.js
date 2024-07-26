import React from 'react'
import { Route, Routes } from 'react-router-dom';
import HodReport from './Report/HodReport';

export default function Hod() {
  return (
    
      <Routes>
        <Route path='/report' element={<HodReport />} />
      </Routes>
  
  )
}
