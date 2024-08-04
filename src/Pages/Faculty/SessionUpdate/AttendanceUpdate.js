import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AttendanceUpdate.css'; // Import the CSS file

const AttendanceUpdate = () => {
  const faculty_id = "F030"; // Replace with actual faculty ID

  // States for criteria options
  const [semesterOptions, setSemesterOptions] = useState([]);
  const [branchOptions, setBranchOptions] = useState([]);
  const [divisionOptions, setDivisionOptions] = useState([]);
  const [batchOptions, setBatchOptions] = useState([]);
  const [subjectOptions, setSubjectOptions] = useState([]);

  // Selected values for semester, branch, division, batch, subject
  const [semester, setSemester] = useState('');
  const [branch, setBranch] = useState('');
  const [division, setDivision] = useState('');
  const [batch, setBatch] = useState('');
  const [subject, setSubject] = useState('');

  const [lectureDates, setLectureDates] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [error, setError] = useState('');
  const [criteriaData, setCriteriaData] = useState({});

  // Function to fetch criteria options
  const fetchCriteriaOptions = async () => {
    try {
      const response = await axios.get(`http://localhost:4545/faculty/getFacultyTeachingData?faculty_id=${faculty_id}`,{
        withCredentials:true });
      const data = response.data;
      setCriteriaData(data);

      // Set semester options
      setSemesterOptions(data.semesters.map(sem => ({ id: sem, value: sem })));
    } catch (error) {
      setError('Failed to fetch criteria options');
    }
  };

  useEffect(() => {
    fetchCriteriaOptions();
  }, []);

  useEffect(() => {
    if (semester) {
      setBranchOptions(
        criteriaData.branches[semester]?.map(branch => ({ id: branch, value: branch })) || []
      );
    } else {
      setBranchOptions([]);
    }
    // Reset dependent dropdowns
    setBranch('');
    setDivision('');
    setSubject('');
    setBatch('');
  }, [semester, criteriaData]);

  useEffect(() => {
    if (branch && semester) {
      const divisionsForBranch = criteriaData.divisions[semester]?.[branch] || [];
      setDivisionOptions(
        divisionsForBranch.map(division => ({ id: division, value: division })) || []
      );
    } else {
      setDivisionOptions([]);
    }
    // Reset dependent dropdowns
    setDivision('');
    setSubject('');
    setBatch('');
  }, [branch, criteriaData, semester]);

  useEffect(() => {
    if (division && branch && semester) {
      const subjects = criteriaData.subjects[semester]?.[branch]?.[division] || {};
      setSubjectOptions(
        Object.entries(subjects).reduce((acc, [batch, batchSubjects]) => {
          return acc.concat(Object.entries(batchSubjects).map(([code, type]) => ({ id: code, value: code, type })));
        }, [])
      );
    } else {
      setSubjectOptions([]);
    }
    // Reset dependent dropdowns
    setSubject('');
    setBatch('');
  }, [division, criteriaData, branch, semester]);

  useEffect(() => {
    if (subject && subjectOptions.find(option => option.value === subject)?.type === 'P') {
      setBatchOptions(
        criteriaData.batches[semester]?.[branch]?.[division]?.map(batch => ({ id: batch, value: batch })) || []
      );
    } else {
      setBatch('');
      setBatchOptions([]);
    }
  }, [subject, division, criteriaData, branch, semester]);

  const handleSemesterChange = (e) => {
    const selectedSemester = e.target.value;
    setSemester(selectedSemester);

    // Reset dependent dropdowns
    setBranch('');
    setDivision('');
    setSubject('');
    setBatch('');
  };

  const handleBranchChange = (e) => {
    const selectedBranch = e.target.value;
    setBranch(selectedBranch);

    // Reset dependent dropdowns
    setDivision('');
    setSubject('');
    setBatch('');
  };

  const handleDivisionChange = (e) => {
    const selectedDivision = e.target.value;
    setDivision(selectedDivision);

    // Reset dependent dropdowns
    setSubject('');
    setBatch('');
  };

  const handleSubjectChange = (e) => {
    const selectedSubject = e.target.value;
    setSubject(selectedSubject);

    // Check the type of the selected subject and show/hide batch dropdown
    const subjectType = subjectOptions.find(option => option.value === selectedSubject)?.type;
    if (subjectType === 'P') {
      setBatchOptions(
        criteriaData.batches[semester]?.[branch]?.[division]?.map(batch => ({ id: batch, value: batch })) || []
      );
    } else {
      setBatch('');
      setBatchOptions([]);
    }
  };

  const handleBatchChange = (e) => {
    setBatch(e.target.value);
  };

  const fetchAttendanceData = async () => {
    try {
      console.log(semester, branch, division, subject, batch);
      const response = await axios.get('http://localhost:4545/faculty/getAllAttendanceData', {
        params: {
          semester: semester,
          branch: branch,
          division: division,
          batch: batch,
          subject: subject,
        },
        withCredentials:true
      });
      const data = response.data.attendance;
      console.log(data);

      const dates = data.map((record) => record.date);
      setLectureDates(dates);
      setAttendanceRecords(data);
    } catch (error) {
      setError('Failed to fetch attendance data');
    }
  };

  const isValidDate = (dateString) => {
    // Date format: yyyy-mm-dd
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateString.match(regex)) return false;

    const date = new Date(dateString);
    return date.toISOString().slice(0, 10) === dateString;
  };

  const handleAddDate = () => {
    const newDate = prompt("Enter the new date (yyyy-mm-dd):");
    if (newDate && isValidDate(newDate) && !lectureDates.includes(newDate)) {
      setLectureDates([...lectureDates, newDate]);
      setAttendanceRecords([
        ...attendanceRecords,
        {
          date: newDate,
          students: attendanceRecords[0]?.students.map(student => ({
            ...student,
            attendance: 0 // Default attendance for new dates
          })) || []
        }
      ]);
    } else if (!isValidDate(newDate)) {
      alert("Invalid date format. Please enter the date in yyyy-mm-dd format.");
    }
  };

  const handleAttendanceChange = (studentIndex, date, isChecked) => {
    const updatedRecords = [...attendanceRecords];
    const dateIndex = updatedRecords.findIndex(record => record.date === date);

    if (dateIndex !== -1) {
      updatedRecords[dateIndex].students[studentIndex].attendance = isChecked ? 1 : 0;
    }

    setAttendanceRecords(updatedRecords);
  };

  const handleSubmit = async () => {
    try {
      console.log(attendanceRecords)
      await axios.put('http://localhost:4545/faculty/updateAttendanceData', {
        semester: semester,
        branch: branch,
        division: division,
        batch: batch,
        subject: subject,
        faculty_id: faculty_id,
        attendance: attendanceRecords
      },{
      withCredentials:true});
      // Handle success scenario
      alert('Attendance records updated successfully!');
      setAttendanceRecords([]);
    } catch (error) {
      // Handle error scenario
      alert(`Failed to update attendance: ${error.message}`);
    }
  };

  return (
    <div className="container" style={{ paddingTop: '20px' }}>
      <div className="row">
        <div className="col-md-3">
          <select className="form-select mb-3" value={semester} onChange={handleSemesterChange}>
            <option value="">Select Semester</option>
            {semesterOptions.map((item) => (
              <option key={item.id} value={item.value}>{item.value}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <select className="form-select mb-3" value={branch} onChange={handleBranchChange} disabled={!semester}>
            <option value="">Select Branch</option>
            {branchOptions.map((item) => (
              <option key={item.id} value={item.value}>{item.value}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <select className="form-select mb-3" value={division} onChange={handleDivisionChange} disabled={!branch}>
            <option value="">Select Division</option>
            {divisionOptions.map((item) => (
              <option key={item.id} value={item.value}>{item.value}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <select className="form-select mb-3" value={subject} onChange={handleSubjectChange} disabled={!division}>
            <option value="">Select Subject</option>
            {subjectOptions.map((item) => (
              <option key={item.id} value={item.value}>{item.value}</option>
            ))}
          </select>
        </div>
        {subjectOptions.find(option => option.value === subject)?.type === 'P' && (
          <div className="col-md-3">
            <select className="form-select mb-3" value={batch} onChange={handleBatchChange} disabled={!subject}>
              <option value="">Select Batch</option>
              {batchOptions.map((item) => (
                <option key={item.id} value={item.value}>{item.value}</option>
              ))}
            </select>
          </div>
        )}
        <div className="col-md-3">
          <button className="btn btn-primary mb-3 mt-0" onClick={fetchAttendanceData}>
            Fetch Attendance
          </button>
          <button className="btn btn-secondary mb-3 mt-0 float-end" onClick={handleAddDate}>
            Add Date
          </button>
        </div>
        {error && <p className="text-danger">{error}</p>}
      </div>

      {attendanceRecords.length ? (
        <div>
          {/* Display attendance data */}
          <div className="table-responsive mt-3">
            <table className="table attendance-table table-bordered mb-0 table-hover">
              <thead>
                <tr>
                  <th className="sticky-col prn-col" scope="col">Student PRN</th>
                  <th className="sticky-col name-col" scope="col">Name</th>
                  {lectureDates.map((date) => (
                    <th key={date} scope="col">{new Date(date).toLocaleDateString()}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {attendanceRecords.length > 0 && attendanceRecords[0].students.map((student, studentIndex) => (
                  <tr key={student.prn}>
                    <td className="sticky-col prn-col">{student.prn}</td>
                    <td className="sticky-col name-col">{student.name}</td>
                    {lectureDates.map((date) => {
                      const record = attendanceRecords.find(record => record.date === date);
                      const isChecked = record ? record.students[studentIndex].attendance === 1 : false;
                      return (
                        <td key={date}>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) =>
                              handleAttendanceChange(studentIndex, date, e.target.checked)
                            }
                          />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button className="btn btn-primary" onClick={handleSubmit}>
            Submit
          </button>
        </div>

      ) : (
        
        <div className='container' style={{ minHeight: '100%' }}>
          <div className='row'>
            <h1 className='display-4 text-primary text-center py-md-5 '>No Records to display.</h1>
          </div>
        </div>
      )

      }
    </div>
  );
};

export default AttendanceUpdate;
