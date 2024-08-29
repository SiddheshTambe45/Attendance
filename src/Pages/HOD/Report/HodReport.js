

import React, { useState } from 'react';
import HeaderCriteria from './HeaderCriteria';
import ShowReport from './ShowReport';
import axios from 'axios';
import { useSelector } from 'react-redux';
import axiosInstance from '../../../Utils/AxiosInstance';

export default function HodReport() {

  // Access department and role from Redux store
  // const { department, role } = useSelector((state) => state.auth);

  const department = 'FIRST_YEAR'

  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Criteria state management
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedBranch, setSelectedBranch] = useState(department);
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');

  const handleFetchAttendance = async () => {
    setLoading(true);
    try {
      // const response = await axios.get('http://localhost:4545/hod/fetchAttendanceData', {
      //   params: {
      //     semester: selectedSemester,
      //     branch: selectedBranch,
      //     division: selectedDivision,
      //     batch: selectedBatch
      //   },
      //   withCredentials: true 
      // });

      const response = await axiosInstance.get('/hod/fetchAttendanceData', {
        params: {
          semester: selectedSemester,
          branch: selectedBranch,
          division: selectedDivision,
          batch: selectedBatch
        }
      });
      setAttendance(response.data);
      setError('');
    } catch (err) {
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <HeaderCriteria
        selectedSemester={selectedSemester}
        setSelectedSemester={setSelectedSemester}
        selectedBranch={selectedBranch}
        setSelectedBranch={setSelectedBranch}
        selectedDivision={selectedDivision}
        setSelectedDivision={setSelectedDivision}
        selectedBatch={selectedBatch}
        setSelectedBatch={setSelectedBatch}
        onFetchAttendance={handleFetchAttendance}
      />
      <ShowReport attendance={attendance} loading={loading} error={error} />
    </div>
  );
}
