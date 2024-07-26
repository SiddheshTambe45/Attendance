
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const HeaderCriteria = ({
//   selectedSemester,
//   setSelectedSemester,
//   selectedBranch,
//   selectedDivision,
//   setSelectedDivision,
//   selectedBatch,
//   setSelectedBatch,
//   onFetchAttendance,
// }) => {
//   const [branches, setBranches] = useState(selectedBranch);
//   const [semesterOptions,setSemesterOptions] = useState([]); // ['1', '2', '3', '4'];
//   const [divisionOptions,setDivisionOptions] =  useState([]); // ['A', 'B', 'C'];
//   const [batchOptions,setBatchOptions] = useState([]); // ['batch1', 'batch2', 'batch3'];
//   const [error, setErrorMsg] = useState('');



//   useEffect(() => {
//     const fetchCriteria = async () => {
//       try {
//         // Simulate fetching criteria
//         const response = await axios.get(`http://localhost:4545/hod/getCriteria?branch=${selectedBranch}`);
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
//             {semesterOptions && semesterOptions.map((semester) => (
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
//             {divisionOptions && divisionOptions.map((division) => (
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
//             {batchOptions && batchOptions.map((batch) => (
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
  selectedDivision,
  setSelectedDivision,
  selectedBatch,
  setSelectedBatch,
  onFetchAttendance,
}) => {
  const [branches, setBranches] = useState(selectedBranch);
  const [criteria, setCriteria] = useState(null);
  const [semesterOptions, setSemesterOptions] = useState([]);
  const [divisionOptions, setDivisionOptions] = useState([]);
  const [batchOptions, setBatchOptions] = useState([]);
  const [error, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchCriteria = async () => {
      try {
        const response = await axios.get(`http://localhost:4545/hod/getCriteria?branch=${branches}`);
        const fetchedCriteria = response.data;
        setCriteria(fetchedCriteria);

        // Set Semester Options
        setSemesterOptions(fetchedCriteria.semesters);
      } catch (err) {
        setErrorMsg('Failed to fetch criteria');
      }
    };

    fetchCriteria();
  }, [branches]);

  useEffect(() => {
    if (criteria && selectedSemester) {
      // Set Division Options based on selected semester
      const divisions = criteria.divisions[selectedSemester] || [];
      setDivisionOptions(divisions);

      // Reset selected division if not in options
      if (!divisions.includes(selectedDivision)) {
        setSelectedDivision('');
      }
    }
  }, [criteria, selectedSemester, selectedDivision, setSelectedDivision]);

  useEffect(() => {
    if (criteria && selectedSemester && selectedDivision) {
      // Set Batch Options based on selected semester and division
      const batches = criteria.batches[selectedSemester]?.[selectedDivision] || [];
      setBatchOptions(batches);

      // Set 'ALL' as the default batch if none is selected
      if (!selectedBatch || selectedBatch === '') {
        setSelectedBatch('ALL');
      }
    }
  }, [criteria, selectedSemester, selectedDivision, selectedBatch, setSelectedBatch]);

  const handleGetData = () => {
    if (!selectedSemester || !selectedDivision) {
      setErrorMsg('Please select all options (Semester, Division) to fetch data.');
      return;
    }
    onFetchAttendance(); // Criteria are now passed automatically since they're managed in FacultyDashboard
    setErrorMsg('');
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col">
          <label htmlFor="semester" className="form-label">
            Semester:
          </label>
          <select
            className="form-select"
            id="semester"
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
          >
            <option value="">Select Semester</option>
            {semesterOptions.map((semester) => (
              <option key={semester} value={semester}>{`SEM ${semester}`}</option>
            ))}
          </select>
        </div>
        <div className="col">
          <label htmlFor="division" className="form-label">
            Division:
          </label>
          <select
            className="form-select"
            id="division"
            value={selectedDivision}
            onChange={(e) => setSelectedDivision(e.target.value)}
            disabled={!selectedSemester} // Disable until semester is selected
          >
            <option value="">Select Division</option>
            {divisionOptions.map((division) => (
              <option key={division} value={division}>
                {division}
              </option>
            ))}
          </select>
        </div>
        <div className="col">
          <label htmlFor="batch" className="form-label">
            Batch:
          </label>
          <select
            className="form-select"
            id="batch"
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
            disabled={!selectedDivision} // Disable until division is selected
          >
            {batchOptions.map((batch) => (
              <option key={batch} value={batch}>
                {batch}
              </option>
            ))}
          </select>
        </div>
        <div className="col-auto align-self-end">
          <button className="btn btn-primary" onClick={handleGetData}>
            Get Data
          </button>
        </div>
      </div>
      {error && (
        <div className="row mt-2">
          <div className="col">
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderCriteria;
