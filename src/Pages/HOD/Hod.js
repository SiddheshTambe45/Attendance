import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Allocation from './Allocation/Allocation';
import HodReport from './Report/HodReport';
import UploadStudents from './Upload/UploadStudents';
import HomePage from './HomePage/HomePage';

export default function Hod() {
  return (
    
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/report' element={<HodReport />} />
        <Route path='/allocation' element={<Allocation />} />
        <Route path='/upload'element={<UploadStudents />} />
      </Routes>
  
  )
}
