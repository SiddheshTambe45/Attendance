import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DivisionCalculation from './DivisionCalculation/DivisionCalculation';
import StudentDataEntry from './StudentDataEntry/StudentDataEntry';
import HomePage from './HomePage/HomePage';

export default function Hod() {
  return (
    
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/DivisionCalculation' element={<DivisionCalculation />} />
        <Route path='/StudentDataEntry' element={<StudentDataEntry />} />
      </Routes>
  
  )
}
