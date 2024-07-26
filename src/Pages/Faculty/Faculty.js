import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './HomePage/HomePage'
// import OffcanvasNavbar from './../../Components/OffcanvasNavbar'
// import SessionUpdate from './SessionUpdate/SessionUpdate'
// import SessionEdit from './SessionUpdate/SessionEdit'
import ReportPage from './ReportPage/ReportPage'
import Leave from './LeaveMessagePage/Leave'
import AttendanceUpdate from './SessionUpdate/AttendanceUpdate';

export default function Faculty() {
    return (
        <div>
           {/* <OffcanvasNavbar /> */}
            <Routes>
                <Route path='/' element={<HomePage />} />
                {/* <Route path='/sessionUpdate' element={<SessionUpdate />} /> */}
                <Route path='/attendanceUpdate' element={<AttendanceUpdate />} />
                {/* <Route path='/sessionEdit' element={<SessionEdit />} /> */}
                <Route path='/reportPage' element={<ReportPage />} />
                <Route path='/leave' element={<Leave />} />
            </Routes>
        </div>
    )
}
