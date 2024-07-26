import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import HomePage from './Pages/Faculty/HomePage/HomePage'
// import OffcanvasNavbar from './Components/OffcanvasNavbar'
// import SessionUpdate from './Pages/Faculty/SessionUpdate/SessionUpdate'
// import SessionEdit from './Pages/Faculty/SessionUpdate/SessionEdit'
// import ReportPage from './Pages/Faculty/ReportPage/ReportPage'
// import Leave from './Pages/Faculty/LeaveMessagePage/Leave'
import Faculty from './Pages/Faculty/Faculty'
import Hod from './Pages/HOD/Hod'
import Principal from './Pages/Principal/Principal'

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path='/faculty/*' element={<Faculty />} />
          <Route path='/hod/*' element={<Hod />} />
          <Route path='/principal/*' element={<Principal />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}
