import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Allocation from './Allocation/Allocation';
import HodReport from './Report/HodReport';

export default function Hod() {
  return (
    
      <Routes>
        <Route path='/report' element={<HodReport />} />
        <Route path='/allocation' element={<Allocation />} />
      </Routes>
  
  )
}
