import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Allocation from './Allocation/Allocation';
import HodReport from './Report/HodReport';
import UploadStudents from './Upload/UploadStudents';
import HomePage from './HomePage/HomePage';
import Roles from './Roles/Roles';
import { useSelector } from 'react-redux';


export default function Hod() {

  const { department } = useSelector((state)=> state.auth);


  return (
    
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/report' element={<HodReport />} />
        <Route path='/allocation' element={<Allocation />} />
        {/* <Route path='/upload'element={<UploadStudents />} /> */}
        {department !== 'FIRST_YEAR' && <Route path='/upload' element={<UploadStudents />} />}
        <Route path='/roles' element={<Roles />} />
      </Routes>
  
  )
}
