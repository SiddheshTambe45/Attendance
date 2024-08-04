

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HeaderCriteria = ({
  selectedSemester,
  setSelectedSemester,
  selectedBranch,
  setSelectedBranch,
  selectedDivision,
  setSelectedDivision,
  selectedBatch,
  setSelectedBatch,
  onFetchAttendance,
}) => {
  const [criteriaData, setCriteriaData] = useState({});
  const [semesterOptions, setSemesterOptions] = useState([]);
  const [branchOptions, setBranchOptions] = useState([]);
  const [divisionOptions, setDivisionOptions] = useState([]);
  const [batchOptions, setBatchOptions] = useState([]);
  const [error, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchCriteria = async () => {
      try {
        const response = await axios.get('http://localhost:4545/principal/getCriteria',{
          withCredentials:true
        });
        const data = response.data;

        // Extract unique semesters
        const semesters = Array.from(new Set(data.semesters));
        setSemesterOptions(semesters);

        // Initialize criteriaData
        setCriteriaData(data);
      } catch (err) {
        setErrorMsg(err.toString());
      }
    };

    fetchCriteria();
  }, []);

  useEffect(() => {
    if (selectedSemester) {
      const branches = criteriaData.branches || {};
      setBranchOptions(branches[selectedSemester] || []);
      setSelectedBranch(''); 
      setDivisionOptions([]);
      setBatchOptions([]);
    }
  }, [selectedSemester, criteriaData]);

  useEffect(() => {
    if (selectedBranch && selectedSemester) {
      const divisions = criteriaData.divisions || {};
      setDivisionOptions(divisions[selectedSemester]?.[selectedBranch] || []);
      setSelectedDivision('');
      setBatchOptions([]);
    }
  }, [selectedBranch, selectedSemester, criteriaData]);

  useEffect(() => {
    if (selectedDivision && selectedBranch && selectedSemester) {
      const batches = criteriaData.batches || {};
      setBatchOptions(batches[selectedSemester]?.[selectedBranch]?.[selectedDivision] || []);
    }
  }, [selectedDivision, selectedBranch, selectedSemester, criteriaData]);

  return (
    <div className="container">
      <div className="row mb-3">
        <div className="col-md-3">
          <select
            className="form-select"
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
          >
            <option value="">Select Semester</option>
            {semesterOptions.map((sem, index) => (
              <option key={index} value={sem}>
                Semester {sem}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            disabled={!selectedSemester}
          >
            <option value="">Select Branch</option>
            {branchOptions.map((branch, index) => (
              <option key={index} value={branch}>
                {branch}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={selectedDivision}
            onChange={(e) => setSelectedDivision(e.target.value)}
            disabled={!selectedBranch}
          >
            <option value="">Select Division</option>
            {divisionOptions.map((division, index) => (
              <option key={index} value={division}>
                {division}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
            disabled={!selectedDivision}
          >
            <option value="">Select Batch</option>
            <option value="ALL">All Batches</option>
            {batchOptions.map((batch, index) => (
              <option key={index} value={batch}>
                {batch}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        className="btn btn-primary"
        onClick={onFetchAttendance}
        disabled={!selectedSemester || !selectedBranch || !selectedDivision}
      >
        Fetch Attendance
      </button>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default HeaderCriteria;
