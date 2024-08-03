import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './HomePage/HomePage'
import ReportPage from './ReportPage/ReportPage'
import Leave from './LeaveMessagePage/Leave'
import AttendanceUpdate from './SessionUpdate/AttendanceUpdate';

export default function Faculty() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/attendanceUpdate' element={<AttendanceUpdate />} />
                <Route path='/reportPage' element={<ReportPage />} />
                <Route path='/leave' element={<Leave />} />
            </Routes>
        </div>
    )
}
