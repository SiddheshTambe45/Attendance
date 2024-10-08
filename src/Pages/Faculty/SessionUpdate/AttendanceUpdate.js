



import React, { useState, useEffect } from 'react';
import './AttendanceUpdate.css'; // Import the CSS file
import { formatISO, parseISO, format } from 'date-fns';
import axiosInstance from '../../../Utils/AxiosInstance';
import { useSelector } from 'react-redux';
import MainNavbar from '../HomePage/MainNavbar'

const AttendanceUpdate = () => {
  // const faculty_id = "F030"; // Replace with actual faculty ID
  const { facultyId } = useSelector((state) => state.auth);

  console.log(facultyId)


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
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');

  // Function to fetch criteria options
  const fetchCriteriaOptions = async () => {
    try {
      // const response = await axios.get(`http://localhost:4545/faculty/getFacultyTeachingData?faculty_id=${faculty_id}`, {
      //   withCredentials: true
      // });

      const response = await axiosInstance.get(`/faculty/getFacultyTeachingData?faculty_id=${facultyId}`);
      const data = response.data;
      setCriteriaData(data);

      // Set semester options
      setSemesterOptions(data.semesters.map(sem => ({ id: sem, value: sem })));
      setError('');
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
      // const response = await axios.get('http://localhost:4545/faculty/getAllAttendanceData', {
      //   params: {
      //     semester: semester,
      //     branch: branch,
      //     division: division,
      //     batch: batch,
      //     subject: subject,
      //   },
      //   withCredentials: true
      // });

      const response = await axiosInstance.get('/faculty/getAllAttendanceData', {
        params: {
          semester: semester,
          branch: branch,
          division: division,
          batch: batch,
          subject: subject,
        }
      });
      const data = response.data.attendance;

      const dates = data.map((record) => record.date).filter(date => date !== null).sort();
      setLectureDates(dates);

      const updatedAttendanceRecords = data.map(record => ({
        ...record,
        students: (record.students || []).map(student => ({
          ...student,
          attendance: student.attendance || 0
        }))
      }));
      setAttendanceRecords(updatedAttendanceRecords);
      setError("");
    } catch (error) {
      setError('Failed to fetch attendance data');
    }
  };

  const handleAddDate = () => {
    if (newDate && newTime) {
      const localDateTime = new Date(`${newDate}T${newTime}:00`);
      const utcDateTime = formatISO(localDateTime, { representation: 'dateTime' });
  
      if (!lectureDates.includes(utcDateTime)) {
        const updatedLectureDates = [...lectureDates, utcDateTime].sort();
        setLectureDates(updatedLectureDates);
  
        // Update attendance records
        setAttendanceRecords(prevRecords => {
          // Create new record with all students marked as present (checked)
          const newRecord = {
            date: utcDateTime,
            students: (prevRecords[0]?.students || []).map(student => ({
              ...student,
              attendance: 1 // Mark as present by default
            }))
          };
          return [...prevRecords, newRecord];
        });
  
        setNewDate('');
        setNewTime('');
      }
    }
  };
  

  const handleAttendanceChange = (studentIndex, date, isChecked) => {
    setAttendanceRecords(prevRecords => {
      const updatedRecords = [...prevRecords];
      const dateIndex = updatedRecords.findIndex(record => record.date === date);

      if (dateIndex !== -1) {
        updatedRecords[dateIndex].students[studentIndex].attendance = isChecked ? 1 : 0;
      }

      return updatedRecords;
    });
  };

  

  const handleSubmit = async () => {
    try {
      // Filter out records with null or empty dates
      const filteredAttendanceRecords = attendanceRecords.filter(record => record.date);
  
      // Proceed only if there are valid records
      if (filteredAttendanceRecords.length === 0) {
        alert('No valid attendance records to submit.');
        return;
      }
  
      await axiosInstance.put('/faculty/updateAttendanceData', {
        semester: semester,
        branch: branch,
        division: division,
        batch: batch,
        subject: subject,
        faculty_id: facultyId,
        attendance: filteredAttendanceRecords, // Use the filtered records
      });
  
      // Handle success scenario
      alert('Attendance records updated successfully!');
      setAttendanceRecords([]);
    } catch (error) {
      // Handle error scenario
      alert(`Failed to update attendance: ${error.message}`);
    }
  };
  

  const formatDate = (dateString) => {
    const date = parseISO(dateString);
    return format(date, 'dd-MM-yyyy hh:mm:ss a');
  };

  return (
    <div className='AttendanceUpdate' id="AttendanceUpdate">
    <MainNavbar />


    <div className="container shadow-none" style={{ paddingTop: '20px' }}>
      <div className="row">
        <div className='d-flex justify-content-between'>
        <div className="col">
          <select className="form-select mb-3 rounded-0" value={semester} onChange={handleSemesterChange}>
            <option value="" className=' rounded-0'>Select Semester</option>
            {semesterOptions.map((item) => (
              <option key={item.id} value={item.value} className='rounded-0'>{item.value}</option>
            ))}
          </select>
        </div>
        <div className="col">
          <select className="form-select mb-3 rounded-0" value={branch} onChange={handleBranchChange} disabled={!semester}>
            <option value="" className=' rounded-0'>Select Branch</option>
            {branchOptions.map((item) => (
              <option key={item.id} value={item.value} className=' rounded-0'>{item.value}</option>
            ))}
          </select>
        </div>
        <div className="col">
          <select className="form-select mb-3 rounded-0" value={division} onChange={handleDivisionChange} disabled={!branch}>
            <option value="" className=' rounded-0'>Select Division</option>
            {divisionOptions.map((item) => (
              <option key={item.id} value={item.value} className=' rounded-0'>{item.value}</option>
            ))}
          </select>
        </div>
        <div className="col">
          <select className="form-select mb-3 rounded-0" value={subject} onChange={handleSubjectChange} disabled={!division}>
            <option value="" className=' rounded-0'>Select Subject</option>
            {subjectOptions.map((item) => (
              <option key={item.id} value={item.value} className=' rounded-0'>{item.value}</option>
            ))}
          </select>
        </div>
        {subjectOptions.find(option => option.value === subject)?.type === 'P' && (
          <div className="col">
            <select className="form-select mb-3 rounded-0" value={batch} onChange={handleBatchChange} disabled={!subject}>
              <option value="" className=' rounded-0'>Select Batch</option>
              {batchOptions.map((item) => (
                <option key={item.id} value={item.value} className=' rounded-0'>{item.value}</option>
              ))}
            </select>
          </div>
        )}
        <div className="col d-flex justify-content-end">
          <button className="btn btn-primary mb-3 mt-0 rounded-0" onClick={fetchAttendanceData}>
            Fetch Attendance
          </button>
        </div>
        </div>

        <div className="col-md-3 ms-auto">
          <label>Enter Date: </label>
          <input
            type="date"
            className="form-control mb-3 mt-0"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
          />
          <label>Enter Time: 24 Hr</label>
          <input
            type="time"
            className="form-control mb-3 mt-0"
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
          />
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
                    {lectureDates.length ? lectureDates.map((date) => (
                      <th key={date} scope="col">{formatDate(date)}</th>
                    )) : <th scope="col">Attendance</th>}
                  </tr>
                </thead>
                <tbody>
                  {attendanceRecords.length > 0 ?
                    attendanceRecords[0].students.map((student, studentIndex) => (
                      <tr key={student.prn}>
                        <td className="sticky-col prn-col">{student.prn}</td>
                        <td className="sticky-col name-col">{student.name}</td>
                        {lectureDates.map((date) => {
                          const record = attendanceRecords.find(record => record.date === date);
                          const isChecked = record ? record.students[studentIndex]?.attendance === 1 : true; // Default to true if record not found
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
                    )) :
                    <tr><td colSpan={lectureDates.length + 2}>No records available</td></tr>
                  }

                </tbody>
              </table>
            </div>

            <button className="btn btn-primary" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        ) : (
          <div className='container shadow-none' style={{ minHeight: '100%' }}>
            <div className='row'>
              <h1 className='display-4 text-primary text-center py-md-5 '>No Records to display.</h1>
            </div>
          </div>
        )}
    </div>
    </div>
  );
};

export default AttendanceUpdate;




