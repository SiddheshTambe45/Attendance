
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const HeaderCriteria = ({
//   selectedSemester,
//   setSelectedSemester,
//   selectedBranch,
//   setSelectedBranch,
//   selectedDivision,
//   setSelectedDivision,
//   selectedBatch,
//   setSelectedBatch,
//   onFetchAttendance,
// }) => {
//   const [branches, setBranches] = useState([]);
//   const [semesterOptions,setSemesterOptions] = useState([]); // ['1', '2', '3', '4'];
//   const [divisionOptions,setDivisionOptions] =  useState([]); // ['A', 'B', 'C'];
//   const [batchOptions,setBatchOptions] = useState([]); // ['batch1', 'batch2', 'batch3'];
//   const [error, setErrorMsg] = useState('');



//   useEffect(() => {
//     const fetchCriteria = async () => {
//       try {
//         // Simulate fetching criteria
//         const response = await axios.get(`http://localhost:4545/principal/getCriteria`);
//         // console.log(response.data)
//         const data = response.data
//         // const data = {
//         //   branches: ['CE', 'IT', 'AIDS', 'AIML', 'CSE(IOT)', 'ECS', 'EXTC', 'Mech'],
//         // };
//         setSemesterOptions(data.semester);
//         setBatchOptions(data.batch);
//         setDivisionOptions(data.division);
//       } catch (err) {
//         setErrorMsg(err.toString());
//       }
//     };

//     fetchCriteria();
//   }, []);

//   const handleGetData = () => {
//     if (!selectedSemester  || !selectedDivision || !selectedBatch) {
//       setErrorMsg('Please select all options (Year, Branch, Division, Batch) to fetch data.');
//       return;
//     }
//     onFetchAttendance(); // Criteria are now passed automatically since they're managed in FacultyDashboard
//     setErrorMsg('');
//   };

  

//   return (
//     <div className="container mt-4">
//       <div className="row">
//         <div className="col">
//           <label htmlFor="semester" className="form-label">
//             Semester:
//           </label>
//           <select
//             className="form-select"
//             id="semester"
//             value={selectedSemester}
//             onChange={(e) => setSelectedSemester(e.target.value)}
//           >
//             <option value="">Select Semester</option>
//             {semesterOptions.map((semester) => (
//               <option key={semester} value={semester}>{`SEM ${semester}`}</option>
//             ))}
//           </select>
//         </div>
//         {/* <div className="col">
//           <label htmlFor="branch" className="form-label">
//             Branch:
//           </label>
//           <select
//             className="form-select"
//             id="branch"
//             value={selectedBranch}
//             onChange={(e) => setSelectedBranch(e.target.value)}
//           >
//             <option value="">Select Branch</option>
//             {branches.map((branch, idx) => (
//               <option key={branch} value={branch}>
//                 {branch}
//               </option>
//             ))}
//           </select>
//         </div> */}
//         <div className="col">
//           <label htmlFor="division" className="form-label">
//             Division:
//           </label>
//           <select
//             className="form-select"
//             id="division"
//             value={selectedDivision}
//             onChange={(e) => setSelectedDivision(e.target.value)}
//           >
//             <option value="">Select Division</option>
//             {divisionOptions.map((division) => (
//               <option key={division} value={division}>
//                 {division}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="col">
//           <label htmlFor="batch" className="form-label">
//             Batch:
//           </label>
//           <select
//             className="form-select"
//             id="batch"
//             value={selectedBatch}
//             onChange={(e) => setSelectedBatch(e.target.value)}
//           >
//             <option value="">Select Batch</option>
//             {batchOptions.map((batch) => (
//               <option key={batch} value={batch}>
//                 {batch}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="col-auto align-self-end">
//           <button className="btn btn-primary" onClick={handleGetData}>
//             Get Data
//           </button>
//         </div>
//       </div>
//       {error && (
//         <div className="row mt-2">
//           <div className="col">
//             <div className="alert alert-danger" role="alert">
//               {error}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HeaderCriteria;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const HeaderCriteria = ({
//   selectedSemester,
//   setSelectedSemester,
//   selectedBranch,
//   setSelectedBranch,
//   selectedDivision,
//   setSelectedDivision,
//   selectedBatch,
//   setSelectedBatch,
//   onFetchAttendance,
// }) => {
//   const [branches, setBranches] = useState([]); // Initialize branches state
//   const [semesterOptions, setSemesterOptions] = useState([]);
//   const [divisionOptions, setDivisionOptions] = useState([]);
//   const [batchOptions, setBatchOptions] = useState([]);
//   const [error, setErrorMsg] = useState('');

//   useEffect(() => {
//     const fetchCriteria = async () => {
//       try {
//         const response = await axios.get('http://localhost:4545/principal/getCriteria');
//         const data = response.data;
        
//         // Set options for dropdowns
//         setSemesterOptions(data.semester);
//         setBatchOptions(data.batch);
//         setDivisionOptions(data.division);
//         setBranches(data.branch); // Set branches from the response
//       } catch (err) {
//         setErrorMsg(err.toString());
//       }
//     };

//     fetchCriteria();
//   }, []);

//   const handleGetData = () => {
//     if (!selectedSemester || !selectedBranch || !selectedDivision || !selectedBatch) {
//       setErrorMsg('Please select all options (Semester, Branch, Division, Batch) to fetch data.');
//       return;
//     }
//     onFetchAttendance(); // Fetch attendance data based on selected criteria
//     setErrorMsg('');
//   };

//   return (
//     <div className="container mt-4">
//       <div className="row">
//         <div className="col">
//           <label htmlFor="semester" className="form-label">
//             Semester:
//           </label>
//           <select
//             className="form-select"
//             id="semester"
//             value={selectedSemester}
//             onChange={(e) => setSelectedSemester(e.target.value)}
//           >
//             <option value="">Select Semester</option>
//             {semesterOptions.map((semester) => (
//               <option key={semester} value={semester}>{`SEM ${semester}`}</option>
//             ))}
//           </select>
//         </div>
//         <div className="col">
//           <label htmlFor="branch" className="form-label">
//             Branch:
//           </label>
//           <select
//             className="form-select"
//             id="branch"
//             value={selectedBranch}
//             onChange={(e) => setSelectedBranch(e.target.value)}
//           >
//             <option value="">Select Branch</option>
//             {branches.map((branch) => (
//               <option key={branch} value={branch}>
//                 {branch}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="col">
//           <label htmlFor="division" className="form-label">
//             Division:
//           </label>
//           <select
//             className="form-select"
//             id="division"
//             value={selectedDivision}
//             onChange={(e) => setSelectedDivision(e.target.value)}
//           >
//             <option value="">Select Division</option>
//             {divisionOptions.map((division) => (
//               <option key={division} value={division}>
//                 {division}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="col">
//           <label htmlFor="batch" className="form-label">
//             Batch:
//           </label>
//           <select
//             className="form-select"
//             id="batch"
//             value={selectedBatch}
//             onChange={(e) => setSelectedBatch(e.target.value)}
//           >
//             <option value="">Select Batch</option>
//             {batchOptions.map((batch) => (
//               <option key={batch} value={batch}>
//                 {batch}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="col-auto align-self-end">
//           <button className="btn btn-primary" onClick={handleGetData}>
//             Get Data
//           </button>
//         </div>
//       </div>
//       {error && (
//         <div className="row mt-2">
//           <div className="col">
//             <div className="alert alert-danger" role="alert">
//               {error}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HeaderCriteria;


// -=-=-=-=-

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const HeaderCriteria = ({
//   selectedSemester,
//   setSelectedSemester,
//   selectedBranch,
//   setSelectedBranch,
//   selectedDivision,
//   setSelectedDivision,
//   selectedBatch,
//   setSelectedBatch,
//   onFetchAttendance,
// }) => {
//   const [criteriaData, setCriteriaData] = useState([]);
//   const [semesterOptions, setSemesterOptions] = useState([]);
//   const [branchOptions, setBranchOptions] = useState([]);
//   const [divisionOptions, setDivisionOptions] = useState([]);
//   const [batchOptions, setBatchOptions] = useState([]);
//   const [error, setErrorMsg] = useState('');

//   useEffect(() => {
//     const fetchCriteria = async () => {
//       try {
//         const response = await axios.get('http://localhost:4545/principal/getCriteria');
//         const data = response.data;

//         // Extract unique semesters
//         const semesters = Array.from(new Set(data.map(item => item.semester)));
//         setSemesterOptions(semesters);

//         // Initialize criteriaData
//         setCriteriaData(data);
//       } catch (err) {
//         setErrorMsg(err.toString());
//       }
//     };

//     fetchCriteria();
//   }, []);

//   useEffect(() => {
//     if (selectedSemester) {
//       // Filter data for the selected semester
//       const semesterData = criteriaData.filter(item => item.semester === selectedSemester);
//       setBranchOptions(Array.from(new Set(semesterData.map(item => item.branch))));
//       setSelectedBranch(''); // Clear selected branch
//       setDivisionOptions([]); // Clear division options
//       setBatchOptions([]); // Clear batch options
//     }
//   }, [selectedSemester, criteriaData]);

//   useEffect(() => {
//     if (selectedBranch && selectedSemester) {
//       const semesterData = criteriaData.find(item => item.semester === selectedSemester);
//       if (semesterData) {
//         // Filter data for the selected branch
//         const branchData = criteriaData.filter(item => item.semester === selectedSemester && item.branch === selectedBranch);
//         setDivisionOptions(Array.from(new Set(branchData.flatMap(item => item.division))));
//         setBatchOptions(Array.from(new Set(branchData.flatMap(item => item.batch))));
//       }
//     }
//   }, [selectedBranch, selectedSemester, criteriaData]);

//   const handleGetData = () => {
//     if (!selectedSemester || !selectedBranch || !selectedDivision || !selectedBatch) {
//       setErrorMsg('Please select all options (Semester, Branch, Division, Batch) to fetch data.');
//       return;
//     }
//     onFetchAttendance(); // Fetch attendance data based on selected criteria
//     setErrorMsg('');
//   };

//   return (
//     <div className="container mt-4">
//       <div className="row">
//         <div className="col">
//           <label htmlFor="semester" className="form-label">
//             Semester:
//           </label>
//           <select
//             className="form-select"
//             id="semester"
//             value={selectedSemester}
//             onChange={(e) => setSelectedSemester(e.target.value)}
//           >
//             <option value="">Select Semester</option>
//             {semesterOptions.map((semester) => (
//               <option key={semester} value={semester}>{`SEM ${semester}`}</option>
//             ))}
//           </select>
//         </div>
//         <div className="col">
//           <label htmlFor="branch" className="form-label">
//             Branch:
//           </label>
//           <select
//             className="form-select"
//             id="branch"
//             value={selectedBranch}
//             onChange={(e) => setSelectedBranch(e.target.value)}
//           >
//             <option value="">Select Branch</option>
//             {branchOptions.map((branch) => (
//               <option key={branch} value={branch}>
//                 {branch}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="col">
//           <label htmlFor="division" className="form-label">
//             Division:
//           </label>
//           <select
//             className="form-select"
//             id="division"
//             value={selectedDivision}
//             onChange={(e) => setSelectedDivision(e.target.value)}
//           >
//             <option value="">Select Division</option>
//             {divisionOptions.map((division) => (
//               <option key={division} value={division}>
//                 {division}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="col">
//           <label htmlFor="batch" className="form-label">
//             Batch:
//           </label>
//           <select
//             className="form-select"
//             id="batch"
//             value={selectedBatch}
//             onChange={(e) => setSelectedBatch(e.target.value)}
//           >
//             <option value="">Select Batch</option>
//             {batchOptions.map((batch) => (
//               <option key={batch} value={batch}>
//                 {batch}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="col-auto align-self-end">
//           <button className="btn btn-primary" onClick={handleGetData}>
//             Get Data
//           </button>
//         </div>
//       </div>
//       {error && (
//         <div className="row mt-2">
//           <div className="col">
//             <div className="alert alert-danger" role="alert">
//               {error}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HeaderCriteria;



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
        const response = await axios.get('http://localhost:4545/principal/getCriteria');
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
