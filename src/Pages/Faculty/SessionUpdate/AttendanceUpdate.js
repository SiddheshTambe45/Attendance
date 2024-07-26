// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AttendanceUpdate = () => {
//   const [year] = useState('2024'); // Assuming year is static or received from parent component
//   const [selectedDate, setSelectedDate] = useState(''); // State to store selected session timing

//   // States for criteria options
//   const [semesterOptions, setSemesterOptions] = useState([]);
//   const [branchOptions, setBranchOptions] = useState([]);
//   const [divisionOptions, setDivisionOptions] = useState([]);
//   const [batchOptions, setBatchOptions] = useState([]);
//   const [subjectOptions, setSubjectOptions] = useState([]);

//   // Selected values for semester, branch, division, batch, subject
//   const [semester, setSemester] = useState('');
//   const [branch, setBranch] = useState('');
//   const [division, setDivision] = useState('');
//   const [batch, setBatch] = useState('');
//   const [subject, setSubject] = useState('');

//   const [lectureDates, setLectureDates] = useState([]);
//   const [attendanceRecords, setAttendanceRecords] = useState([]);
//   const [error, setError] = useState('');

//   // Function to fetch criteria options
//   const fetchCriteriaOptions = async () => {
//     try {
//       const faculty_id = "F001"; // Replace with actual faculty ID
//       const response = await axios.get(`http://localhost:4545/faculty/getFacultyTeachingData?faculty_id=${faculty_id}`);
//       const { semester, branch, division, batch, subject } = response.data;
//       console.log(semester, branch, division, batch, subject);

//       // Assuming semester, branch, division, batch, subject are arrays of objects with id, value, label
//       setSemesterOptions(semester || []);
//       setBranchOptions(branch || []);
//       setDivisionOptions(division || []);
//       setBatchOptions(batch || []);
//       setSubjectOptions(subject || []);

//       // Set default values for semester, branch, division, batch, subject
//       if (semester && semester.length > 0) setSemester(semester[0].value);
//       if (branch && branch.length > 0) setBranch(branch[0].value);
//       if (division && division.length > 0) setDivision(division[0].value);
//       if (batch && batch.length > 0) setBatch(batch[0].value);
//       if (subject && subject.length > 0) setSubject(subject[0].value);

//     } catch (error) {
//       setError('Failed to fetch criteria options');
//     }
//   };

//   useEffect(() => {
//     fetchCriteriaOptions();
//   }, []);

//   const handleSemesterChange = (e) => {
//     setSemester(e.target.value);
//   };

//   const handleBranchChange = (e) => {
//     setBranch(e.target.value);
//   };

//   const handleDivisionChange = (e) => {
//     setDivision(e.target.value);
//   };

//   const handleBatchChange = (e) => {
//     setBatch(e.target.value);
//   };

//   const handleSubjectChange = (e) => {
//     setSubject(e.target.value);
//   };

//   const fetchLectureDates = async () => {
//     try {
//       const response = await axios.get('http://localhost:4545/faculty/getLectureDates', {
//         params: {
//           semester: semester,
//           branch: branch,
//           division: division,
//           batch: batch,
//           subject: subject,
//         }
//       });
//       console.log(response.data);

//       const dates = response.data.lectureDates || []; // Ensure lectureDates is correctly fetched
//       setLectureDates(dates);
//     } catch (error) {
//       setError('Failed to fetch lecture dates');
//     }
//   };

//   const fetchAttendanceData = async () => {
//     try {
//       console.log(semester, branch, division, batch, subject, selectedDate);
//       const response = await axios.get('http://localhost:4545/faculty/getAttendanceData', {
//         params: {
//           semester: semester,
//           branch: branch,
//           division: division,
//           batch: batch,
//           subject: subject,
//           date: selectedDate
//         }
//       });
//       const data = response.data;
//       console.log(data);
//       setAttendanceRecords(data || []);
//     } catch (error) {
//       setError('Failed to fetch attendance data');
//     }
//   };

//   const handleDateChange = (e) => {
//     const selectedDate = e.target.value;
//     setSelectedDate(selectedDate);
//     // Fetch attendance data for the selected date
//     // Disable automatic fetching of attendance data here
//   };

//   const handleFetchAttendance = () => {
//     // Fetch attendance data manually after selecting date
//     fetchAttendanceData();
//   };

//   const handleAttendanceChange = (studentIndex, isChecked) => {
//     const updatedAttendance = [...attendanceRecords];
//     updatedAttendance[studentIndex] = {
//       ...updatedAttendance[studentIndex],
//       attendance: isChecked ? 1 : 0, // Ensure 'attendance' is the correct property
//     };
//     setAttendanceRecords(updatedAttendance);
//   };

//   const handleSubmit = async () => {
//     try {
//       const response = await axios.put('http://localhost:4545/faculty/updateAttendanceData', {
//         year: year,
//         semester: semester,
//         branch: branch,
//         division: division,
//         batch: batch,
//         subject: subject,
//         date: selectedDate,
//         attendance: attendanceRecords
//       });
//       // Handle success scenario
//       alert('Attendance records updated successfully!');
//     } catch (error) {
//       // Handle error scenario
//       alert(`Failed to update attendance: ${error.message}`);
//     }
//   };

//   useEffect(() => {
//     // Fetch lecture dates when semester, branch, division, batch, or subject change
//     if (semester && branch && division && batch && subject) {
//       fetchLectureDates();
//     }
//   }, [semester, branch, division, batch, subject]);

//   return (
//     <div className="container">
//       <h2>Edit Attendance for {year}</h2>

//       <div className="row">
//         <div className="col-md-2">
//           <select className="form-select mb-3" value={semester} onChange={handleSemesterChange}>
//             <option value="">Select Semester</option>
//             {semesterOptions.map((item) => (
//               <option key={item.id} value={item}>{item}</option> // Make sure value and label are correct
//             ))}
//           </select>
//         </div>
//         <div className="col-md-2">
//           <select className="form-select mb-3" value={branch} onChange={handleBranchChange}>
//             <option value="">Select Branch</option>
//             {branchOptions.map((item) => (
//               <option key={item.id} value={item}>{item}</option> // Make sure value and label are correct
//             ))}
//           </select>
//         </div>
//         <div className="col-md-2">
//           <select className="form-select mb-3" value={division} onChange={handleDivisionChange}>
//             <option value="">Select Division</option>
//             {divisionOptions.map((item) => (
//               <option key={item.id} value={item}>{item}</option> // Make sure value and label are correct
//             ))}
//           </select>
//         </div>
//         <div className="col-md-2">
//           <select className="form-select mb-3" value={batch} onChange={handleBatchChange}>
//             <option value="">Select Batch</option>
//             {batchOptions.map((item) => (
//               <option key={item.id} value={item}>{item}</option> // Make sure value and label are correct
//             ))}
//           </select>
//         </div>
//         <div className="col-md-2">
//           <select className="form-select mb-3" value={subject} onChange={handleSubjectChange}>
//             <option value="">Select Subject</option>
//             {subjectOptions.map((item) => (
//               <option key={item.id} value={item}>{item}</option> // Make sure value and label are correct
//             ))}
//           </select>
//         </div>
//         <div className="col-md-2">
//           <select className="form-select mb-3" value={selectedDate} onChange={handleDateChange}>
//             <option value="">Select Date</option>
//             {lectureDates.map((date) => (
//               <option key={date} value={date}>{date}</option>
//             ))}
//           </select>
//           {selectedDate && (
//             <button className="btn btn-primary mt-3 mb-3 w-100" onClick={handleFetchAttendance}>
//               Fetch Attendance
//             </button>
//           )}
//         </div>
//       </div>

//       <div className="table-responsive">
//         <table className="table table-bordered mb-0">
//           <thead>
//             <tr>
//               <th scope="col">Student PRN</th>
//               <th scope="col">Name</th>
//               <th scope="col">Today's Attendance</th>
//             </tr>
//           </thead>
//           <tbody>
//             {attendanceRecords.map((student, index) => (
//               <tr key={student.prn}>
//                 <td>{student.prn}</td>
//                 <td>{student.name}</td>
//                 <td>
//                   <input
//                     type="checkbox"
//                     checked={student.attendance === 1}
//                     onChange={(e) => handleAttendanceChange(index, e.target.checked)}
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <button className="btn btn-primary mt-3 mb-3" onClick={handleSubmit}>
//         Submit Attendance
//       </button>

//       {error && (
//         <div className="alert alert-danger mt-3" role="alert">
//           {error}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AttendanceUpdate;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AttendanceUpdate = () => {
//   const [year] = useState('2024'); // Assuming year is static or received from parent component

//   // States for criteria options
//   const [semesterOptions, setSemesterOptions] = useState([]);
//   const [branchOptions, setBranchOptions] = useState([]);
//   const [divisionOptions, setDivisionOptions] = useState([]);
//   const [batchOptions, setBatchOptions] = useState([]);
//   const [subjectOptions, setSubjectOptions] = useState([]);

//   // Selected values for semester, branch, division, batch, subject
//   const [semester, setSemester] = useState('');
//   const [branch, setBranch] = useState('');
//   const [division, setDivision] = useState('');
//   const [batch, setBatch] = useState('');
//   const [subject, setSubject] = useState('');

//   const [lectureDates, setLectureDates] = useState([]);
//   const [attendanceRecords, setAttendanceRecords] = useState([]);
//   const [error, setError] = useState('');

//   // Function to fetch criteria options
//   const fetchCriteriaOptions = async () => {
//     try {
//       const faculty_id = "F001"; // Replace with actual faculty ID
//       const response = await axios.get(`http://localhost:4545/faculty/getFacultyTeachingData?faculty_id=${faculty_id}`);
//       const { semester, branch, division, batch, subject } = response.data;
//       console.log(semester, branch, division, batch, subject);

//       // Assuming semester, branch, division, batch, subject are arrays of objects with id, value, label
//       setSemesterOptions(semester || []);
//       setBranchOptions(branch || []);
//       setDivisionOptions(division || []);
//       setBatchOptions(batch || []);
//       setSubjectOptions(subject || []);

//       // Set default values for semester, branch, division, batch, subject
//       if (semester && semester.length > 0) setSemester(semester[0].value);
//       if (branch && branch.length > 0) setBranch(branch[0].value);
//       if (division && division.length > 0) setDivision(division[0].value);
//       if (batch && batch.length > 0) setBatch(batch[0].value);
//       if (subject && subject.length > 0) setSubject(subject[0].value);

//     } catch (error) {
//       setError('Failed to fetch criteria options');
//     }
//   };

//   useEffect(() => {
//     fetchCriteriaOptions();
//   }, []);

//   const handleSemesterChange = (e) => {
//     setSemester(e.target.value);
//   };

//   const handleBranchChange = (e) => {
//     setBranch(e.target.value);
//   };

//   const handleDivisionChange = (e) => {
//     setDivision(e.target.value);
//   };

//   const handleBatchChange = (e) => {
//     setBatch(e.target.value);
//   };

//   const handleSubjectChange = (e) => {
//     setSubject(e.target.value);
//   };

//   const fetchAttendanceData = async () => {
//     try {
//       const response = await axios.get('http://localhost:4545/faculty/getAllAttendanceData', {
//         params: {
//           semester: semester,
//           branch: branch,
//           division: division,
//           batch: batch,
//           subject: subject,
//         }
//       });
//       const data = response.data.attendance;
//       console.log(data);

//       const dates = data.map((record) => record.date);
//       setLectureDates(dates);
//       setAttendanceRecords(data);
//     } catch (error) {
//       setError('Failed to fetch attendance data');
//     }
//   };

//   const isValidDate = (dateString) => {
//     // Date format: yyyy-mm-dd
//     const regex = /^\d{4}-\d{2}-\d{2}$/;
//     if (!dateString.match(regex)) return false;
  
//     const date = new Date(dateString);
//     return date.toISOString().slice(0, 10) === dateString;
//   };

//   const handleAddDate = () => {
//     const newDate = prompt("Enter the new date (yyyy-mm-dd):");
//     if (newDate && isValidDate(newDate) && !lectureDates.includes(newDate)) {
//       setLectureDates([...lectureDates, newDate]);
//       setAttendanceRecords([
//         ...attendanceRecords,
//         {
//           date: newDate,
//           students: attendanceRecords[0]?.students.map(student => ({
//             ...student,
//             attendance: 0 // Default attendance for new dates
//           })) || []
//         }
//       ]);
//     } else if (!isValidDate(newDate)) {
//       alert("Invalid date format. Please enter the date in yyyy-mm-dd format.");
//     }
//   };

//   const handleAttendanceChange = (studentIndex, date, isChecked) => {
//     const updatedRecords = [...attendanceRecords];
//     const dateIndex = updatedRecords.findIndex(record => record.date === date);

//     if (dateIndex !== -1) {
//       updatedRecords[dateIndex].students[studentIndex].attendance = isChecked ? 1 : 0;
//     }

//     setAttendanceRecords(updatedRecords);
//   };

//   const handleSubmit = async () => {
//   try {
//     const response = await axios.put('http://localhost:4545/faculty/updateAttendanceData', {
//       semester: semester,
//       branch: branch,
//       division: division,
//       batch: batch,
//       subject: subject,
//       attendance: attendanceRecords
//     });
//     // Handle success scenario
//     alert('Attendance records updated successfully!');
//   } catch (error) {
//     // Handle error scenario
//     alert(`Failed to update attendance: ${error.message}`);
//   }
// };

//   return (
//     <div className="container">
//       <h2>Edit Attendance for {year}</h2>

//       <div className="row">
//         <div className="col-md-2">
//           <select className="form-select mb-3" value={semester} onChange={handleSemesterChange}>
//             <option value="">Select Semester</option>
//             {semesterOptions.map((item) => (
//               <option key={item.id} value={item}>{item}</option>
//             ))}
//           </select>
//         </div>
//         <div className="col-md-2">
//           <select className="form-select mb-3" value={branch} onChange={handleBranchChange}>
//             <option value="">Select Branch</option>
//             {branchOptions.map((item) => (
//               <option key={item.id} value={item}>{item}</option>
//             ))}
//           </select>
//         </div>
//         <div className="col-md-2">
//           <select className="form-select mb-3" value={division} onChange={handleDivisionChange}>
//             <option value="">Select Division</option>
//             {divisionOptions.map((item) => (
//               <option key={item.id} value={item}>{item}</option>
//             ))}
//           </select>
//         </div>
//         <div className="col-md-2">
//           <select className="form-select mb-3" value={batch} onChange={handleBatchChange}>
//             <option value="">Select Batch</option>
//             {batchOptions.map((item) => (
//               <option key={item.id} value={item}>{item}</option>
//             ))}
//           </select>
//         </div>
//         <div className="col-md-2">
//           <select className="form-select mb-3" value={subject} onChange={handleSubjectChange}>
//             <option value="">Select Subject</option>
//             {subjectOptions.map((item) => (
//               <option key={item.id} value={item}>{item}</option>
//             ))}
//           </select>
//         </div>
//         <div className="col-md-2">
//           <button className="btn btn-primary mb-3" onClick={fetchAttendanceData}>
//             Fetch Attendance
//           </button>
//         </div>
//       </div>

//       <div className="mt-3">
//         <button className="btn btn-secondary" onClick={handleAddDate}>
//           Add New Date
//         </button>
//       </div>

//       <div className="table-responsive mt-3">
//         <table className="table table-bordered mb-0 table-hover">
//           <thead>
//             <tr>
//               <th scope="col">Student PRN</th>
//               <th scope="col">Name</th>
//               {lectureDates.map((date) => (
//                 <th key={date} scope="col">{new Date(date).toLocaleDateString()}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {attendanceRecords.length > 0 && attendanceRecords[0].students.map((student, studentIndex) => (
//               <tr key={student.prn}>
//                 <td>{student.prn}</td>
//                 <td>{student.name}</td>
//                 {lectureDates.map((date) => {
//                   const record = attendanceRecords.find(record => record.date === date);
//                   const isChecked = record ? record.students[studentIndex].attendance === 1 : false;
//                   return (
//                     <td key={date}>
//                       <input
//                         type="checkbox"
//                         checked={isChecked}
//                         onChange={(e) =>
//                           handleAttendanceChange(studentIndex, date, e.target.checked)
//                         }
//                       />
//                     </td>
//                   );
//                 })}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="mt-3">
//         <button className="btn btn-success" onClick={handleSubmit}>
//           Save Attendance
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AttendanceUpdate;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './AttendanceUpdate.css'; // Import the CSS file

// const AttendanceUpdate = () => {
//   const faculty_id = "F001"; // Replace with actual faculty ID

//   // States for criteria options
//   const [semesterOptions, setSemesterOptions] = useState([]);
//   const [branchOptions, setBranchOptions] = useState([]);
//   const [divisionOptions, setDivisionOptions] = useState([]);
//   const [batchOptions, setBatchOptions] = useState([]);
//   const [subjectOptions, setSubjectOptions] = useState([]);

//   // Selected values for semester, branch, division, batch, subject
//   const [semester, setSemester] = useState('');
//   const [branch, setBranch] = useState('');
//   const [division, setDivision] = useState('');
//   const [batch, setBatch] = useState('');
//   const [subject, setSubject] = useState('');

//   const [lectureDates, setLectureDates] = useState([]);
//   const [attendanceRecords, setAttendanceRecords] = useState([]);
//   const [error, setError] = useState('');
//   const [criteriaData, setCriteriaData] = useState({});

//   // Function to fetch criteria options
//   const fetchCriteriaOptions = async () => {
//     try {
//       // const faculty_id = "F001"; // Replace with actual faculty ID
//       const response = await axios.get(`http://localhost:4545/faculty/getFacultyTeachingData?faculty_id=${faculty_id}`);
//       const data = response.data;
//       setCriteriaData(data);

//       // Set semester options
//       setSemesterOptions(data.semesters.map(sem => ({ id: sem, value: sem })));
//     } catch (error) {
//       setError('Failed to fetch criteria options');
//     }
//   };

//   useEffect(() => {
//     fetchCriteriaOptions();
//   }, []);

//   useEffect(() => {
//     if (semester) {
//       setBranchOptions(criteriaData.branches[semester]?.map(branch => ({ id: branch, value: branch })) || []);
//     } else {
//       setBranchOptions([]);
//     }
//   }, [semester, criteriaData]);

//   useEffect(() => {
//     if (branch) {
//       setDivisionOptions(criteriaData.divisions[branch]?.map(division => ({ id: division, value: division })) || []);
//     } else {
//       setDivisionOptions([]);
//     }
//   }, [branch, criteriaData]);

//   useEffect(() => {
//     if (division) {
//       const subjects = criteriaData.subjects[branch]?.[division] || {};
//       console.log(subjects)
//       setSubjectOptions(
//        Object.entries(subjects).reduce((acc, [batch, batchSubjects]) => {
//           return acc.concat(Object.entries(batchSubjects).map(([code, type]) => ({ id: code, value: code, type })));
//         }, [])
//       );
//     } else {
//       setSubjectOptions([]);
//     }
//   }, [division, criteriaData, branch]);

//   const handleSemesterChange = (e) => {
//     const selectedSemester = e.target.value;
//     setSemester(selectedSemester);

//     // Reset dependent dropdowns
//     setBranch('');
//     setDivision('');
//     setSubject('');
//     setBatch('');
//   };

//   const handleBranchChange = (e) => {
//     const selectedBranch = e.target.value;
//     setBranch(selectedBranch);

//     // Reset dependent dropdowns
//     setDivision('');
//     setSubject('');
//     setBatch('');
//   };

//   const handleDivisionChange = (e) => {
//     const selectedDivision = e.target.value;
//     setDivision(selectedDivision);

//     // Reset dependent dropdowns
//     setSubject('');
//     setBatch('');
//   };

//   const handleSubjectChange = (e) => {
//     const selectedSubject = e.target.value;
//     setSubject(selectedSubject);

//     // Check the type of the selected subject and show/hide batch dropdown
//     const subjectType = subjectOptions.find(option => option.value === selectedSubject)?.type;
//     if (subjectType === "P") {
//       setBatchOptions(criteriaData.batches[division]?.map(batch => ({ id: batch, value: batch })) || []);
//     } else {
//       setBatch('');
//       setBatchOptions([]);
//     }
//   };

//   const handleBatchChange = (e) => {
//     setBatch(e.target.value);
//   };

//   const fetchAttendanceData = async () => {
//     try {
//       console.log(semester, branch, division, subject, batch);
//       const response = await axios.get('http://localhost:4545/faculty/getAllAttendanceData', {
//         params: {
//           semester: semester,
//           branch: branch,
//           division: division,
//           batch: batch,
//           subject: subject,
//         }
//       });
//       const data = response.data.attendance;
//       console.log(data);

//       const dates = data.map((record) => record.date);
//       setLectureDates(dates);
//       setAttendanceRecords(data);
//     } catch (error) {
//       setError('Failed to fetch attendance data');
//     }
//   };

//   const isValidDate = (dateString) => {
//     // Date format: yyyy-mm-dd
//     const regex = /^\d{4}-\d{2}-\d{2}$/;
//     if (!dateString.match(regex)) return false;
  
//     const date = new Date(dateString);
//     return date.toISOString().slice(0, 10) === dateString;
//   };

//   const handleAddDate = () => {
//     const newDate = prompt("Enter the new date (yyyy-mm-dd):");
//     if (newDate && isValidDate(newDate) && !lectureDates.includes(newDate)) {
//       setLectureDates([...lectureDates, newDate]);
//       setAttendanceRecords([
//         ...attendanceRecords,
//         {
//           date: newDate,
//           students: attendanceRecords[0]?.students.map(student => ({
//             ...student,
//             attendance: 0 // Default attendance for new dates
//           })) || []
//         }
//       ]);
//     } else if (!isValidDate(newDate)) {
//       alert("Invalid date format. Please enter the date in yyyy-mm-dd format.");
//     }
//   };

//   const handleAttendanceChange = (studentIndex, date, isChecked) => {
//     const updatedRecords = [...attendanceRecords];
//     const dateIndex = updatedRecords.findIndex(record => record.date === date);

//     if (dateIndex !== -1) {
//       updatedRecords[dateIndex].students[studentIndex].attendance = isChecked ? 1 : 0;
//     }

//     setAttendanceRecords(updatedRecords);
//   };

//   const handleSubmit = async () => {
//     try {
//       console.log(attendanceRecords)
//       await axios.put('http://localhost:4545/faculty/updateAttendanceData', {
//         semester: semester,
//         branch: branch,
//         division: division,
//         batch: batch,
//         subject: subject,
//         faculty_id: faculty_id,
//         attendance: attendanceRecords
//       });
//       // Handle success scenario
//       alert('Attendance records updated successfully!');
//       setAttendanceRecords([]);
//     } catch (error) {
//       // Handle error scenario
//       alert(`Failed to update attendance: ${error.message}`);
//     }
//   };

//   return (
//     <div className="container">
      

//       <div className="row">
//         <div className="col-md-3">
//           <select className="form-select mb-3" value={semester} onChange={handleSemesterChange}>
//             <option value="">Select Semester</option>
//             {semesterOptions.map((item) => (
//               <option key={item.id} value={item.value}>{item.value}</option>
//             ))}
//           </select>
//         </div>
//         <div className="col-md-3">
//           <select className="form-select mb-3" value={branch} onChange={handleBranchChange} disabled={!semester}>
//             <option value="">Select Branch</option>
//             {branchOptions.map((item) => (
//               <option key={item.id} value={item.value}>{item.value}</option>
//             ))}
//           </select>
//         </div>
//         <div className="col-md-3">
//           <select className="form-select mb-3" value={division} onChange={handleDivisionChange} disabled={!branch}>
//             <option value="">Select Division</option>
//             {divisionOptions.map((item) => (
//               <option key={item.id} value={item.value}>{item.value}</option>
//             ))}
//           </select>
//         </div>
//         <div className="col-md-3">
//           <select className="form-select mb-3" value={subject} onChange={handleSubjectChange} disabled={!division}>
//             <option value="">Select Subject</option>
//             {subjectOptions.map((item) => (
//               <option key={item.id} value={item.value}>{item.value}</option>
//             ))}
//           </select>
//         </div>
//         {subjectOptions.find(option => option.value === subject)?.type === 'P' && (
//           <div className="col-md-3">
//             <select className="form-select mb-3" value={batch} onChange={handleBatchChange} disabled={!subject}>
//               <option value="">Select Batch</option>
//               {batchOptions.map((item) => (
//                 <option key={item.id} value={item.value}>{item.value}</option>
//               ))}
//             </select>
//           </div>
//         )}
//         <div className="col-md-3">
//           <button className="btn btn-primary mb-3 mt-0" onClick={fetchAttendanceData}>
//             Fetch Attendance
//           </button>
//           <button className="btn btn-secondary mb-3 mt-0 float-end" onClick={handleAddDate}>
//             Add Date
//           </button>
//         </div>
//         {error && <p className="text-danger">{error}</p>}
//       </div>

//       {/* Display attendance data */}
    
//       <div className="table-responsive mt-3">
//   <table className="table attendance-table table-bordered mb-0 table-hover">
//     <thead>
//       <tr>
//         <th className="sticky-col prn-col" scope="col">Student PRN</th>
//         <th className="sticky-col name-col" scope="col">Name</th>
//         {lectureDates.map((date) => (
//           <th key={date} scope="col">{new Date(date).toLocaleDateString()}</th>
//         ))}
//       </tr>
//     </thead>
//     <tbody>
//       {attendanceRecords.length > 0 && attendanceRecords[0].students.map((student, studentIndex) => (
//         <tr key={student.prn}>
//           <td className="sticky-col prn-col">{student.prn}</td>
//           <td className="sticky-col name-col">{student.name}</td>
//           {lectureDates.map((date) => {
//             const record = attendanceRecords.find(record => record.date === date);
//             const isChecked = record ? record.students[studentIndex].attendance === 1 : false;
//             return (
//               <td key={date}>
//                 <input
//                   type="checkbox"
//                   checked={isChecked}
//                   onChange={(e) =>
//                     handleAttendanceChange(studentIndex, date, e.target.checked)
//                   }
//                 />
//               </td>
//             );
//           })}
//         </tr>
//       ))}
//     </tbody>
//   </table>
// </div>

//       <button className="btn btn-primary" onClick={handleSubmit}>
//         Submit
//       </button>
//     </div>
//   );
// };

// export default AttendanceUpdate;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './AttendanceUpdate.css'; // Import the CSS file

// const AttendanceUpdate = () => {
//   const faculty_id = "F001"; // Replace with actual faculty ID

//   // States for criteria options
//   const [semesterOptions, setSemesterOptions] = useState([]);
//   const [branchOptions, setBranchOptions] = useState([]);
//   const [divisionOptions, setDivisionOptions] = useState([]);
//   const [batchOptions, setBatchOptions] = useState([]);
//   const [subjectOptions, setSubjectOptions] = useState([]);

//   // Selected values for semester, branch, division, batch, subject
//   const [semester, setSemester] = useState('');
//   const [branch, setBranch] = useState('');
//   const [division, setDivision] = useState('');
//   const [batch, setBatch] = useState('');
//   const [subject, setSubject] = useState('');

//   const [lectureDates, setLectureDates] = useState([]);
//   const [attendanceRecords, setAttendanceRecords] = useState([]);
//   const [error, setError] = useState('');
//   const [criteriaData, setCriteriaData] = useState({});

//   // Function to fetch criteria options
//   const fetchCriteriaOptions = async () => {
//     try {
//       const response = await axios.get(`http://localhost:4545/faculty/getFacultyTeachingData?faculty_id=${faculty_id}`);
//       const data = response.data;
//       setCriteriaData(data);

//       // Set semester options
//       setSemesterOptions(data.semesters.map(sem => ({ id: sem, value: sem })));
//     } catch (error) {
//       setError('Failed to fetch criteria options');
//     }
//   };

//   useEffect(() => {
//     fetchCriteriaOptions();
//   }, []);

//   useEffect(() => {
//     if (semester) {
//       setBranchOptions(
//         criteriaData.branches[semester]?.map(branch => ({ id: branch, value: branch })) || []
//       );
//     } else {
//       setBranchOptions([]);
//     }
//     // Reset dependent dropdowns
//     setBranch('');
//     setDivision('');
//     setSubject('');
//     setBatch('');
//   }, [semester, criteriaData]);

//   useEffect(() => {
//     if (branch) {
//       setDivisionOptions(
//         criteriaData.divisions[branch]?.map(division => ({ id: division, value: division })) || []
//       );
//     } else {
//       setDivisionOptions([]);
//     }
//     // Reset dependent dropdowns
//     setDivision('');
//     setSubject('');
//     setBatch('');
//   }, [branch, criteriaData]);

//   useEffect(() => {
//     if (division) {
//       const subjects = criteriaData.subjects[branch]?.[division] || {};
//       setSubjectOptions(
//         Object.entries(subjects).reduce((acc, [batch, batchSubjects]) => {
//           return acc.concat(Object.entries(batchSubjects).map(([code, type]) => ({ id: code, value: code, type })));
//         }, [])
//       );
//     } else {
//       setSubjectOptions([]);
//     }
//     // Reset dependent dropdowns
//     setSubject('');
//     setBatch('');
//   }, [division, criteriaData, branch]);

//   useEffect(() => {
//     if (subject && subjectOptions.find(option => option.value === subject)?.type === 'P') {
//       setBatchOptions(
//         criteriaData.batches[division]?.map(batch => ({ id: batch, value: batch })) || []
//       );
//     } else {
//       setBatchOptions([]);
//     }
//   }, [subject, division, criteriaData]);

//   const handleSemesterChange = (e) => {
//     const selectedSemester = e.target.value;
//     setSemester(selectedSemester);

//     // Reset dependent dropdowns
//     setBranch('');
//     setDivision('');
//     setSubject('');
//     setBatch('');
//   };

//   const handleBranchChange = (e) => {
//     const selectedBranch = e.target.value;
//     setBranch(selectedBranch);

//     // Reset dependent dropdowns
//     setDivision('');
//     setSubject('');
//     setBatch('');
//   };

//   const handleDivisionChange = (e) => {
//     const selectedDivision = e.target.value;
//     setDivision(selectedDivision);

//     // Reset dependent dropdowns
//     setSubject('');
//     setBatch('');
//   };

//   const handleSubjectChange = (e) => {
//     const selectedSubject = e.target.value;
//     setSubject(selectedSubject);

//     // Check the type of the selected subject and show/hide batch dropdown
//     const subjectType = subjectOptions.find(option => option.value === selectedSubject)?.type;
//     if (subjectType === 'P') {
//       setBatchOptions(
//         criteriaData.batches[division]?.map(batch => ({ id: batch, value: batch })) || []
//       );
//     } else {
//       setBatch('');
//       setBatchOptions([]);
//     }
//   };

//   const handleBatchChange = (e) => {
//     setBatch(e.target.value);
//   };

//   const fetchAttendanceData = async () => {
//     try {
//       console.log(semester, branch, division, subject, batch);
//       const response = await axios.get('http://localhost:4545/faculty/getAllAttendanceData', {
//         params: {
//           semester: semester,
//           branch: branch,
//           division: division,
//           batch: batch,
//           subject: subject,
//         }
//       });
//       const data = response.data.attendance;
//       console.log(data);

//       const dates = data.map((record) => record.date);
//       setLectureDates(dates);
//       setAttendanceRecords(data);
//     } catch (error) {
//       setError('Failed to fetch attendance data');
//     }
//   };

//   const isValidDate = (dateString) => {
//     // Date format: yyyy-mm-dd
//     const regex = /^\d{4}-\d{2}-\d{2}$/;
//     if (!dateString.match(regex)) return false;
  
//     const date = new Date(dateString);
//     return date.toISOString().slice(0, 10) === dateString;
//   };

//   const handleAddDate = () => {
//     const newDate = prompt("Enter the new date (yyyy-mm-dd):");
//     if (newDate && isValidDate(newDate) && !lectureDates.includes(newDate)) {
//       setLectureDates([...lectureDates, newDate]);
//       setAttendanceRecords([
//         ...attendanceRecords,
//         {
//           date: newDate,
//           students: attendanceRecords[0]?.students.map(student => ({
//             ...student,
//             attendance: 0 // Default attendance for new dates
//           })) || []
//         }
//       ]);
//     } else if (!isValidDate(newDate)) {
//       alert("Invalid date format. Please enter the date in yyyy-mm-dd format.");
//     }
//   };

//   const handleAttendanceChange = (studentIndex, date, isChecked) => {
//     const updatedRecords = [...attendanceRecords];
//     const dateIndex = updatedRecords.findIndex(record => record.date === date);

//     if (dateIndex !== -1) {
//       updatedRecords[dateIndex].students[studentIndex].attendance = isChecked ? 1 : 0;
//     }

//     setAttendanceRecords(updatedRecords);
//   };

//   const handleSubmit = async () => {
//     try {
//       console.log(attendanceRecords)
//       await axios.put('http://localhost:4545/faculty/updateAttendanceData', {
//         semester: semester,
//         branch: branch,
//         division: division,
//         batch: batch,
//         subject: subject,
//         faculty_id: faculty_id,
//         attendance: attendanceRecords
//       });
//       // Handle success scenario
//       alert('Attendance records updated successfully!');
//       setAttendanceRecords([]);
//     } catch (error) {
//       // Handle error scenario
//       alert(`Failed to update attendance: ${error.message}`);
//     }
//   };

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-md-3">
//           <select className="form-select mb-3" value={semester} onChange={handleSemesterChange}>
//             <option value="">Select Semester</option>
//             {semesterOptions.map((item) => (
//               <option key={item.id} value={item.value}>{item.value}</option>
//             ))}
//           </select>
//         </div>
//         <div className="col-md-3">
//           <select className="form-select mb-3" value={branch} onChange={handleBranchChange} disabled={!semester}>
//             <option value="">Select Branch</option>
//             {branchOptions.map((item) => (
//               <option key={item.id} value={item.value}>{item.value}</option>
//             ))}
//           </select>
//         </div>
//         <div className="col-md-3">
//           <select className="form-select mb-3" value={division} onChange={handleDivisionChange} disabled={!branch}>
//             <option value="">Select Division</option>
//             {divisionOptions.map((item) => (
//               <option key={item.id} value={item.value}>{item.value}</option>
//             ))}
//           </select>
//         </div>
//         <div className="col-md-3">
//           <select className="form-select mb-3" value={subject} onChange={handleSubjectChange} disabled={!division}>
//             <option value="">Select Subject</option>
//             {subjectOptions.map((item) => (
//               <option key={item.id} value={item.value}>{item.value}</option>
//             ))}
//           </select>
//         </div>
//         {subjectOptions.find(option => option.value === subject)?.type === 'P' && (
//           <div className="col-md-3">
//             <select className="form-select mb-3" value={batch} onChange={handleBatchChange} disabled={!subject}>
//               <option value="">Select Batch</option>
//               {batchOptions.map((item) => (
//                 <option key={item.id} value={item.value}>{item.value}</option>
//               ))}
//             </select>
//           </div>
//         )}
//         <div className="col-md-3">
//           <button className="btn btn-primary mb-3 mt-0" onClick={fetchAttendanceData}>
//             Fetch Attendance
//           </button>
//           <button className="btn btn-secondary mb-3 mt-0 float-end" onClick={handleAddDate}>
//             Add Date
//           </button>
//         </div>
//         {error && <p className="text-danger">{error}</p>}
//       </div>

//       {/* Display attendance data */}
//       <div className="table-responsive mt-3">
//         <table className="table attendance-table table-bordered mb-0 table-hover">
//           <thead>
//             <tr>
//               <th className="sticky-col prn-col" scope="col">Student PRN</th>
//               <th className="sticky-col name-col" scope="col">Name</th>
//               {lectureDates.map((date) => (
//                 <th key={date} scope="col">{new Date(date).toLocaleDateString()}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {attendanceRecords.length > 0 && attendanceRecords[0].students.map((student, studentIndex) => (
//               <tr key={student.prn}>
//                 <td className="sticky-col prn-col">{student.prn}</td>
//                 <td className="sticky-col name-col">{student.name}</td>
//                 {lectureDates.map((date) => {
//                   const record = attendanceRecords.find(record => record.date === date);
//                   const isChecked = record ? record.students[studentIndex].attendance === 1 : false;
//                   return (
//                     <td key={date}>
//                       <input
//                         type="checkbox"
//                         checked={isChecked}
//                         onChange={(e) =>
//                           handleAttendanceChange(studentIndex, date, e.target.checked)
//                         }
//                       />
//                     </td>
//                   );
//                 })}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <button className="btn btn-primary" onClick={handleSubmit}>
//         Submit
//       </button>
//     </div>
//   );
// };

// export default AttendanceUpdate;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AttendanceUpdate.css'; // Import the CSS file

const AttendanceUpdate = () => {
  const faculty_id = "F001"; // Replace with actual faculty ID

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
      const response = await axios.get(`http://localhost:4545/faculty/getFacultyTeachingData?faculty_id=${faculty_id}`);
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
        }
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
      });
      // Handle success scenario
      alert('Attendance records updated successfully!');
      setAttendanceRecords([]);
    } catch (error) {
      // Handle error scenario
      alert(`Failed to update attendance: ${error.message}`);
    }
  };

  return (
    <div className="container">
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
  );
};

export default AttendanceUpdate;
