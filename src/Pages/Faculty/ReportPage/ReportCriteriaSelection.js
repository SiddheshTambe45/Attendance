

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';


// const ReportCriteriaSelection = ({ setAttendanceData, setCriteria, criteria }) => {
//   const [semester, setSemester] = useState('');
//   const [branch, setBranch] = useState('');
//   const [subject, setSubject] = useState('');
//   const [division, setDivision] = useState('');
//   const [batch, setBatch] = useState('');
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchCriteria = async () => {
//       try {
//         const faculty_id = "F001";
//         const response = await axios.get(`http://localhost:4545/faculty/getFacultyTeachingData?faculty_id=${faculty_id}`);
//         const data = response.data;

//         setCriteria({
//           semesters: data.semester || [], // Ensure arrays are initialized even if empty
//           branches: data.branch || [],
//           subjects: data.subject || [],
//           divisions: data.division || [],
//           batches: data.batch || []
//         });
//       } catch (error) {
//         setError(error.toString());
//       }
//     };

//     fetchCriteria();
//   }, [setCriteria]);

//   const handleGetData = () => {
//     if (!semester || !branch || !subject || !division || !batch) {
//       setError('Please select all options (Semester, Branch, Subject, Division, Batch) to fetch data.');
//       return;
//     }

//     fetchData();
//   };

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(`http://localhost:4545/faculty/getParticularData`, {
//         params:{
//           sem: 2,
//           branch: 'IT',
//           batch: 'E1',
//           div: 'E',
//           sub_id: 'AB12'
//         }
//       });
  
//       const studentsData = response.data;
//       console.log(studentsData)
  
//       // Transform the response data to match frontend expectations
//       const transformedData = studentsData.map(student => ({
//         prn: student.prn,
//         name: student.email, // Extracting name from email, adjust as per your actual data structure
//         lectures: student.lectures.map(lecture => lecture), // Assuming lectures are stored as strings '1' or '0'
//         dates: student.dates // Assuming dates are already in the correct format
//       }));

//       console.log(transformedData)
  
//       setAttendanceData(transformedData);
//       // const data = studentsData
//       //   setAttendanceData(data);
//       setError(''); 
//     } catch (error) {
//       setError(error.toString());
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <div className='row'>
//         <div className="col">
//           <label htmlFor="year" className="form-label">Year:</label>
//           <select className="form-select" id="year" value={semester} onChange={(e) => setSemester(e.target.value)}>
//             <option value="">Select Year</option>
//             {criteria.semesters && criteria.semesters.map((sem, idx) => (
//               <option key={idx} value={sem}>{sem}</option>
//             ))}
//           </select>
//         </div>
//         <div className="col">
//           <label htmlFor="branch" className="form-label">Branch:</label>
//           <select className="form-select" id="branch" value={branch} onChange={(e) => setBranch(e.target.value)}>
//             <option value="">Select Branch</option>
//             {criteria.branches && criteria.branches.map((br, idx) => (
//               <option key={idx} value={br}>{br}</option>
//             ))}
//           </select>
//         </div>
//         <div className="col">
//           <label htmlFor="subject" className="form-label">Subject:</label>
//           <select className="form-select" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)}>
//             <option value="">Select Subject</option>
//             {criteria.subjects && criteria.subjects.map((subj, idx) => (
//               <option key={idx} value={subj}>{subj}</option>
//             ))}
//           </select>
//         </div>
//         <div className="col">
//           <label htmlFor="division" className="form-label">Division:</label>
//           <select className="form-select" id="division" value={division} onChange={(e) => setDivision(e.target.value)}>
//             <option value="">Select Division</option>
//             {criteria.divisions && criteria.divisions.map((div, idx) => (
//               <option key={idx} value={div}>{div}</option>
//             ))}
//           </select>
//         </div>
//         <div className="col">
//           <label htmlFor="batch" className="form-label">Batch:</label>
//           <select className="form-select" id="batch" value={batch} onChange={(e) => setBatch(e.target.value)}>
//             <option value="">Select Batch</option>
//             {criteria.batches && criteria.batches.map((batch, idx) => (
//               <option key={idx} value={batch}>{batch}</option>
//             ))}
//           </select>
//         </div>
//         <div className="col-auto align-self-end">
//           <button className="btn btn-primary" onClick={handleGetData}>Get Data</button>
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

// export default ReportCriteriaSelection;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ReportCriteriaSelection = ({ setAttendanceData, setCriteria, criteria }) => {
//   const [semester, setSemester] = useState('');
//   const [branch, setBranch] = useState('');
//   const [subject, setSubject] = useState('');
//   const [division, setDivision] = useState('');
//   const [batch, setBatch] = useState(''); // Default to empty; will set 'all' based on criteria
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchCriteria = async () => {
//       try {
//         const faculty_id = "F001";
//         const response = await axios.get(`http://localhost:4545/faculty/getFacultyTeachingData?faculty_id=${faculty_id}`);
//         const data = response.data;

//         // Determine if 'all' should be a selectable option and if it should be the default
//         const hasAllBatches = data.batch.length > 1; // Assume multiple batches means 'all' is applicable
//         setBatch(hasAllBatches ? 'all' : ''); // Set 'all' if available, otherwise set to empty

//         setCriteria({
//           semesters: data.semester || [],
//           branches: data.branch || [],
//           subjects: data.subject || [],
//           divisions: data.division || [],
//           batches: hasAllBatches ? ['all', ...data.batch] : data.batch // Include 'all' if applicable
//         });
//       } catch (error) {
//         setError(error.toString());
//       }
//     };

//     fetchCriteria();
//   }, [setCriteria]);

//   const handleGetData = () => {
//     if (!semester || !branch || !subject || !division) {
//       setError('Please select all options (Semester, Branch, Subject, Division) to fetch data.');
//       return;
//     }

//     fetchData();
//   };

//   const fetchData = async () => {
//     try {
//       const params = {
//         sem: semester,
//         branch: branch,
//         div: division,
//         sub_id: subject,
//         batch: batch && batch !== 'all' ? batch : undefined // Exclude batch parameter if 'all' is selected
//       };

//       const response = await axios.get('http://localhost:4545/faculty/getParticularData', { params });

//       const studentsData = response.data;
//       console.log(studentsData);

//       if (studentsData.length === 0) {
//         setError('No records to show. Select some combination.');
//         setAttendanceData([]);
//         return;
//       }

//       const transformedData = studentsData.map(student => ({
//         prn: student.prn,
//         name: student.name, // Extracting name from email, adjust as per your actual data structure
//         lectures: student.lectures.map(lecture => lecture), // Assuming lectures are stored as strings '1' or '0'
//         dates: student.dates // Assuming dates are already in the correct format
//       }));

//       console.log(transformedData);

//       setAttendanceData(transformedData);
//       setError(''); 
//     } catch (error) {
//       setError(error.toString());
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <div className='row'>
//         <div className="col">
//           <label htmlFor="semester" className="form-label">Semester:</label>
//           <select className="form-select" id="semester" value={semester} onChange={(e) => setSemester(e.target.value)}>
//             <option value="">Select Semester</option>
//             {criteria.semesters && criteria.semesters.map((sem, idx) => (
//               <option key={idx} value={sem}>{sem}</option>
//             ))}
//           </select>
//         </div>
//         <div className="col">
//           <label htmlFor="branch" className="form-label">Branch:</label>
//           <select className="form-select" id="branch" value={branch} onChange={(e) => setBranch(e.target.value)}>
//             <option value="">Select Branch</option>
//             {criteria.branches && criteria.branches.map((br, idx) => (
//               <option key={idx} value={br}>{br}</option>
//             ))}
//           </select>
//         </div>
//         <div className="col">
//           <label htmlFor="subject" className="form-label">Subject:</label>
//           <select className="form-select" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)}>
//             <option value="">Select Subject</option>
//             {criteria.subjects && criteria.subjects.map((subj, idx) => (
//               <option key={idx} value={subj}>{subj}</option>
//             ))}
//           </select>
//         </div>
//         <div className="col">
//           <label htmlFor="division" className="form-label">Division:</label>
//           <select className="form-select" id="division" value={division} onChange={(e) => setDivision(e.target.value)}>
//             <option value="">Select Division</option>
//             {criteria.divisions && criteria.divisions.map((div, idx) => (
//               <option key={idx} value={div}>{div}</option>
//             ))}
//           </select>
//         </div>
//         <div className="col">
//           <label htmlFor="batch" className="form-label">Batch:</label>
//           <select className="form-select" id="batch" value={batch} onChange={(e) => setBatch(e.target.value)}>
//             <option value="">Select Batch</option>
//             {criteria.batches && criteria.batches.map((batchOption, idx) => (
//               <option key={idx} value={batchOption}>{batchOption}</option>
//             ))}
//           </select>
//         </div>
//         <div className="col-auto align-self-end">
//           <button className="btn btn-primary" onClick={handleGetData}>Get Data</button>
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

// export default ReportCriteriaSelection;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ReportCriteriaSelection = ({ setAttendanceData, setCriteria, criteria }) => {
//   const [semester, setSemester] = useState('');
//   const [branch, setBranch] = useState('');
//   const [subject, setSubject] = useState('');
//   const [division, setDivision] = useState('');
//   const [batch, setBatch] = useState('');
//   const [error, setError] = useState('');
//   const [subjectType, setSubjectType] = useState('');
//   const [filteredSubjects, setFilteredSubjects] = useState([]);

//   useEffect(() => {
//     const fetchCriteria = async () => {
//       try {
//         const faculty_id = "F001";
//         const response = await axios.get(`http://localhost:4545/faculty/getFacultyTeachingData?faculty_id=${faculty_id}`);
//         const data = response.data;
//         setCriteria({
//           semesters: data.semesters || [],
//           branches: data.branches || {},
//           subjects: data.subjects || {},
//           divisions: data.divisions || {},
//           batches: data.batches || {}
//         });
//       } catch (error) {
//         setError(error.toString());
//       }
//     };

//     fetchCriteria();
//   }, [setCriteria]);

//   useEffect(() => {
//     if (branch && division) {
//       // Access subjects based on branch, division, and batch
//       const subjectsInDivision = criteria.subjects[branch]?.[division] || {};
//       const subjects = Object.keys(subjectsInDivision).reduce((acc, batchKey) => {
//         // Flatten the subjects for all batches if batch is empty
//         return acc.concat(Object.keys(subjectsInDivision[batchKey]));
//       }, []);
      
//       console.log('Branch:', branch);
//       console.log('Division:', division);
//       console.log('Batch:', batch);
//       console.log('Filtered Subjects:', subjects);
      
//       // Set filtered subjects
//       setFilteredSubjects(subjects);
//     } else {
//       setFilteredSubjects([]);
//     }
//   }, [branch, division, batch, criteria.subjects]);

//   const handleSubjectChange = (e) => {
//     const selectedSubject = e.target.value;
//     setSubject(selectedSubject);
    
//     // Determine if the selected subject is practical or theoretical
//     const subjectType = Object.values(criteria.subjects[branch]?.[division] || {}).find(
//       batchSubjects => batchSubjects[selectedSubject]
//     )?.[selectedSubject] || '';
//     console.log(subjectType)
//     setSubjectType(subjectType);
//   };

//   const handleGetData = () => {
//     if (!semester || !branch || !subject || !division) {
//       setError('Please select all options (Semester, Branch, Subject, Division) to fetch data.');
//       return;
//     }

//     fetchData();
//   };

//   const fetchData = async () => {
//     try {
//       const params = {
//         sem: semester,
//         branch: branch,
//         div: division,
//         sub_id: subject,
//         batch: batch || undefined
//       };
  
//       const response = await axios.get('http://localhost:4545/faculty/getParticularData', { params });
  
//       // Access the array from the response
//       const studentsData = response.data.attendanceData || [];
//       console.log(studentsData);
  
//       if (studentsData.length === 0) {
//         setError('No records to show. Select some combination.');
//         setAttendanceData([]);
//         return;
//       }
  
//       // Transform the data
//       const transformedData = studentsData.map(student => ({
//         prn: student.prn,
//         name: student.name,
//         lectures: student.lectures.map(lecture => lecture),
//         dates: student.dates
//       }));
  
//       console.log(transformedData);
  
//       setAttendanceData(transformedData);
//       setError('');
//     } catch (error) {
//       setError(error.toString());
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <div className='row'>
//         <div className="col">
//           <label htmlFor="semester" className="form-label">Semester:</label>
//           <select className="form-select" id="semester" value={semester} onChange={(e) => setSemester(e.target.value)}>
//             <option value="">Select Semester</option>
//             {criteria.semesters && criteria.semesters.map((sem, idx) => (
//               <option key={idx} value={sem}>{sem}</option>
//             ))}
//           </select>
//         </div>
//         <div className="col">
//           <label htmlFor="branch" className="form-label">Branch:</label>
//           <select className="form-select" id="branch" value={branch} onChange={(e) => setBranch(e.target.value)}>
//             <option value="">Select Branch</option>
//             {/* Iterate over semesters and branches */}
//             {Object.keys(criteria.branches).map((sem, idx) => (
//               criteria.branches[sem].length > 0 && (
//                 <optgroup key={sem} label={`Semester ${sem}`}>
//                   {criteria.branches[sem].map((br, brIdx) => (
//                     <option key={brIdx} value={br}>{br}</option>
//                   ))}
//                 </optgroup>
//               )
//             ))}
//           </select>
//         </div>
//         <div className="col">
//           <label htmlFor="division" className="form-label">Division:</label>
//           <select className="form-select" id="division" value={division} onChange={(e) => setDivision(e.target.value)}>
//             <option value="">Select Division</option>
//             {criteria.divisions[branch] && criteria.divisions[branch].map((div, idx) => (
//               <option key={idx} value={div}>{div}</option>
//             ))}
//           </select>
//         </div>
//         <div className="col">
//           <label htmlFor="subject" className="form-label">Subject:</label>
//           <select className="form-select" id="subject" value={subject} onChange={handleSubjectChange}>
//             <option value="">Select Subject</option>
//             {filteredSubjects.length > 0 ? (
//               filteredSubjects.map((subj, idx) => (
//                 <option key={idx} value={subj}>{subj}</option>
//               ))
//             ) : (
//               <option value="">No Subjects Available</option>
//             )}
//           </select>
//         </div>

//         {subjectType === 'P' && (
//           <div className="col">
//             <label htmlFor="batch" className="form-label">Batch:</label>
//             <select className="form-select" id="batch" value={batch} onChange={(e) => setBatch(e.target.value)}>
//               <option value="">Select Batch</option>
//               {criteria.batches[division]?.map((batchOption, idx) => (
//                 <option key={idx} value={batchOption}>{batchOption}</option>
//               ))}
//             </select>
//           </div>
//         )}
//         <div className="col-auto align-self-end">
//           <button className="btn btn-primary" onClick={handleGetData}>Get Data</button>
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

// export default ReportCriteriaSelection;




import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReportCriteriaSelection = ({ setAttendanceData, setCriteria, criteria }) => {
  const [semester, setSemester] = useState('');
  const [branch, setBranch] = useState('');
  const [subject, setSubject] = useState('');
  const [division, setDivision] = useState('');
  const [batch, setBatch] = useState('');
  const [error, setError] = useState('');
  const [subjectType, setSubjectType] = useState('');
  const [filteredSubjects, setFilteredSubjects] = useState([]);

  useEffect(() => {
    const fetchCriteria = async () => {
      try {
        const faculty_id = "F001";
        const response = await axios.get(`http://localhost:4545/faculty/getFacultyTeachingData?faculty_id=${faculty_id}`);
        const data = response.data;
        setCriteria({
          semesters: data.semesters || [],
          branches: data.branches || {},
          divisions: data.divisions || {},
          batches: data.batches || {},
          subjects: data.subjects || {}
        });
      } catch (error) {
        setError(error.toString());
      }
    };

    fetchCriteria();
  }, [setCriteria]);

  useEffect(() => {
    if (branch && division) {
      const subjectsInDivision = criteria.subjects[semester]?.[branch]?.[division] || {};
      const subjects = Object.keys(subjectsInDivision).reduce((acc, batchKey) => {
        return acc.concat(Object.keys(subjectsInDivision[batchKey]));
      }, []);
      
      console.log('Branch:', branch);
      console.log('Division:', division);
      console.log('Batch:', batch);
      console.log('Filtered Subjects:', subjects);
      
      setFilteredSubjects(subjects);
    } else {
      setFilteredSubjects([]);
    }
  }, [branch, division, batch, semester, criteria.subjects]);

  const handleSubjectChange = (e) => {
    const selectedSubject = e.target.value;
    setSubject(selectedSubject);
    
    const subjectType = Object.values(criteria.subjects[semester]?.[branch]?.[division] || {}).find(
      batchSubjects => batchSubjects[selectedSubject]
    )?.[selectedSubject] || '';
    console.log(subjectType);
    setSubjectType(subjectType);
  };

  const handleGetData = () => {
    if (!semester || !branch || !subject || !division) {
      setError('Please select all options (Semester, Branch, Subject, Division) to fetch data.');
      return;
    }

    fetchData();
  };

  const fetchData = async () => {
    try {
      const params = {
        sem: semester,
        branch: branch,
        div: division,
        sub_id: subject,
        batch: batch || undefined
      };
  
      const response = await axios.get('http://localhost:4545/faculty/getParticularData', { params });
  
      const studentsData = response.data.attendanceData || [];
      console.log(studentsData);
  
      if (studentsData.length === 0) {
        setError('No records to show. Select some combination.');
        setAttendanceData([]);
        return;
      }
  
      const transformedData = studentsData.map(student => ({
        prn: student.prn,
        name: student.name,
        lectures: student.lectures.map(lecture => lecture),
        dates: student.dates
      }));
  
      console.log(transformedData);
  
      setAttendanceData(transformedData);
      setError('');
    } catch (error) {
      setError(error.toString());
    }
  };

  return (
    <div className="container mt-4">
      <div className='row'>
        <div className="col">
          <label htmlFor="semester" className="form-label">Semester:</label>
          <select className="form-select" id="semester" value={semester} onChange={(e) => setSemester(e.target.value)}>
            <option value="">Select Semester</option>
            {criteria.semesters && criteria.semesters.map((sem, idx) => (
              <option key={idx} value={sem}>{sem}</option>
            ))}
          </select>
        </div>
        <div className="col">
          <label htmlFor="branch" className="form-label">Branch:</label>
          <select className="form-select" id="branch" value={branch} onChange={(e) => setBranch(e.target.value)}>
            <option value="">Select Branch</option>
            {semester && criteria.branches[semester] && criteria.branches[semester].map((br, brIdx) => (
              <option key={brIdx} value={br}>{br}</option>
            ))}
          </select>
        </div>
        <div className="col">
          <label htmlFor="division" className="form-label">Division:</label>
          <select className="form-select" id="division" value={division} onChange={(e) => setDivision(e.target.value)}>
            <option value="">Select Division</option>
            {semester && branch && criteria.divisions[semester]?.[branch] && criteria.divisions[semester][branch].map((div, idx) => (
              <option key={idx} value={div}>{div}</option>
            ))}
          </select>
        </div>
        <div className="col">
          <label htmlFor="subject" className="form-label">Subject:</label>
          <select className="form-select" id="subject" value={subject} onChange={handleSubjectChange}>
            <option value="">Select Subject</option>
            {filteredSubjects.length > 0 ? (
              filteredSubjects.map((subj, idx) => (
                <option key={idx} value={subj}>{subj}</option>
              ))
            ) : (
              <option value="">No Subjects Available</option>
            )}
          </select>
        </div>

        {subjectType === 'P' && (
          <div className="col">
            <label htmlFor="batch" className="form-label">Batch:</label>
            <select className="form-select" id="batch" value={batch} onChange={(e) => setBatch(e.target.value)}>
              <option value="">Select Batch</option>
              {semester && branch && division && criteria.batches[semester]?.[branch]?.[division] && criteria.batches[semester][branch][division].map((batchOption, idx) => (
                <option key={idx} value={batchOption}>{batchOption}</option>
              ))}
            </select>
          </div>
        )}
        <div className="col-auto align-self-end">
          <button className="btn btn-primary" onClick={handleGetData}>Get Data</button>
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

export default ReportCriteriaSelection;
