import React, { useState,useEfect } from 'react';
import ReportCriteriaSelection from './ReportCriteriaSelection';
import Report from './Report';
import axios from 'axios';

const ReportPage = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [criteria, setCriteria] = useState({
    semesters: [],
    branches: [],
    subjects: [],
    divisions: [],
    batch: []
  });


  return (
    <div>
      <ReportCriteriaSelection setAttendanceData={setAttendanceData} setCriteria={setCriteria} criteria={criteria} />
      <Report attendanceData={attendanceData} />  { /* criteria={criteria}  */}
    </div>
  );
};

export default ReportPage;
