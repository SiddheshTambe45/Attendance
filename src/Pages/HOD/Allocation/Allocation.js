
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Styles/Allocation.css';
// import { BsPlus, BsPencil, BsDash } from 'react-icons/bs';

// const Allocation = () => {
//   const hodDepartment = 'IOT';

//   const [selectedBranch, setSelectedBranch] = useState('');
//   const [currentSemester, setCurrentSemester] = useState('');
//   const [subjects, setSubjects] = useState([]);
//   const [teachers, setTeachers] = useState([]);
//   const [selectedDivision, setSelectedDivision] = useState('');
//   const [selectedBatch, setSelectedBatch] = useState('');
//   const [selectedTeachers, setSelectedTeachers] = useState({});

//   const [branches, setBranches] = useState([]);
//   const [divisions, setDivisions] = useState([]);
//   const [batches, setBatches] = useState([]);
//   const [semesters, setSemesters] = useState([]);

//   useEffect(() => {
//     const fetchCriteria = async () => {
//       try {
//         const response = await axios.get('http://localhost:4545/hod/getCriteriaFacSub', {
//           params: { hodDepartment: hodDepartment }
//         });

//         const { branch, division, batch, semester } = response.data;
//         setBranches(branch);
//         setDivisions(division);
//         setBatches(batch);
//         setSemesters(semester);
//       } catch (error) {
//         console.error('Error fetching criteria:', error);
//       }
//     };

//     fetchCriteria();
//   }, [hodDepartment]);

//   useEffect(() => {
//     if (selectedBranch && currentSemester && selectedDivision && selectedBatch) {
//       const fetchSubjectsAndTeachers = async () => {
//         try {
//           const response = await axios.get('http://localhost:4545/hod/getSubjectsAndFaculty', {
//             params: {
//               branch: selectedBranch,
//               semester: currentSemester,
//               hodDepartment: hodDepartment
//             }
//           });

//           const { subjects, teachers } = response.data;
//           setSubjects(subjects || []);
//           setTeachers(teachers || []);
//           setSelectedTeachers({});
//         } catch (error) {
//           console.error('Error fetching subjects and teachers:', error);
//         }
//       };

//       fetchSubjectsAndTeachers();
//     }
//   }, [selectedBranch, currentSemester, selectedDivision, selectedBatch]);

//   const handleAddSubject = () => {
//     const newSubject = prompt('Enter new subject:');
//     const newSubjectId = prompt('Enter new subject id:');
//     if (newSubject) {
//       setSubjects([...subjects, { subjectId: newSubjectId, subjectName: newSubject }]);
//     }
//   };

//   const handleRemoveSubject = (index) => {
//     if (window.confirm('Are you sure you want to remove this subject?')) {
//       const subjectId = subjects[index].subjectId;
//       setSubjects(subjects.filter((_, i) => i !== index));
//       const updatedSelectedTeachers = { ...selectedTeachers };
//       delete updatedSelectedTeachers[subjectId];
//       setSelectedTeachers(updatedSelectedTeachers);
//     }
//   };

//   const handleEditSubject = (index) => {
//     const editedSubject = prompt('Edit subject:', subjects[index].subjectName);
//     if (editedSubject) {
//       setSubjects(subjects.map((subject, i) =>
//         i === index ? { ...subject, subjectName: editedSubject } : subject
//       ));
//     }
//   };

//   const handleTeacherChange = (index, facultyName) => {
//     const selectedTeacher = teachers.find(teacher => teacher.facultyName === facultyName);
//     const facultyId = selectedTeacher ? selectedTeacher.facultyId : '';

//     setSelectedTeachers({
//       ...selectedTeachers,
//       [subjects[index].subjectId]: facultyId,
//     });
//   };

//   const applyChanges = async() => {
//     try {
//       const dataToSend = subjects.map(subject => ({
//         semester: currentSemester,
//         branch: selectedBranch,
//         division: selectedDivision,
//         batch: selectedBatch,
//         subject_id: subject.subjectId,
//         faculty_id: selectedTeachers[subject.subjectId] || "",
//       })).filter(item => item.faculty_id); // Filter out entries with no faculty_id
//       console.log(dataToSend)
//       await axios.post('http://localhost:4545/hod/updateSubjects', dataToSend);
//       console.log('Changes applied successfully');
//       alert('Changes applied successfully');
//       setSelectedBranch('');
//       setSelectedBatch('');
//       setCurrentSemester('');
//       setSelectedDivision('');
//       setSubjects([]);
//       setTeachers([]);
//       setSelectedTeachers({});
//     } catch (error) {
//       console.error('Error applying changes:', error);
//     }
//   };

//   const getAvailableTeachers = (index) => {
//     // Collect all selected faculty IDs
//     const selectedFacultyIds = new Set(Object.values(selectedTeachers));

//     // Filter teachers excluding those who are already selected for other subjects
//     return teachers.filter(teacher => !selectedFacultyIds.has(teacher.facultyId) || teacher.facultyId === selectedTeachers[subjects[index].subjectId]);
//   };

//   return (
//     <div className="container mt-5">
//       <h1 className="mb-4 text-center">Department of {hodDepartment}</h1>
//       <div className="row mb-3">
//         <div className="col-12 col-md-3">
//           <label htmlFor="branchSelect" className="form-label">
//             Select Branch:
//           </label>
//           <select
//             id="branchSelect"
//             className="form-select"
//             value={selectedBranch}
//             onChange={(e) => setSelectedBranch(e.target.value)}
//           >
//             <option value="" disabled>Select Branch</option>
//             {branches && branches.map((branch) => (
//               <option key={branch} value={branch}>
//                 {branch}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="col-12 col-md-3">
//           <label htmlFor="semesterSelect" className="form-label">
//             Select Semester:
//           </label>
//           <select
//             id="semesterSelect"
//             className="form-select"
//             value={currentSemester}
//             onChange={(e) => setCurrentSemester(e.target.value)}
//           >
//             <option value="" disabled>Select Semester</option>
//             {semesters && semesters.map((sem) => (
//               <option key={sem} value={sem}>
//                 Semester {sem}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="col-12 col-md-3">
//           <label htmlFor="divisionSelect" className="form-label">
//             Select Division:
//           </label>
//           <select
//             id="divisionSelect"
//             className="form-select"
//             value={selectedDivision}
//             onChange={(e) => setSelectedDivision(e.target.value)}
//           >
//             <option value="" disabled>Select Division</option>
//             {divisions && divisions.map((division) => (
//               <option key={division} value={division}>
//                 {division}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="col-12 col-md-3">
//           <label htmlFor="batchSelect" className="form-label">
//             Select Batch:
//           </label>
//           <select
//             id="batchSelect"
//             className="form-select"
//             value={selectedBatch}
//             onChange={(e) => setSelectedBatch(e.target.value)}
//           >
//             <option value="" disabled>Select Batch</option>
//             {batches && batches.map((batch) => (
//               <option key={batch} value={batch}>
//                 {batch}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>
//       <div className="row mb-3">
//         <div className="col-12">
//           <button
//             className="btn btn-primary me-2"
//             onClick={handleAddSubject}
//           >
//             <BsPlus /> Add Subject
//           </button>
//           <button
//             className="btn btn-success ms-2"
//             onClick={applyChanges}
//           >
//             Apply Changes
//           </button>
//         </div>
//       </div>
//       <div className="table-responsive">
//         <table className="table table-striped table-hover">
//           <thead className="table-dark">
//             <tr>
//               <th>Subject</th>
//               <th>Teacher</th>
//             </tr>
//           </thead>
//           <tbody>
//             {subjects.map((subject, index) => (
//               <tr key={subject.subjectId}>
//                 <td>
//                   {subject.subjectName}
//                   <button
//                     className="btn btn-sm btn-outline-warning ms-2"
//                     onClick={() => handleEditSubject(index)}
//                   >
//                     <BsPencil />
//                   </button>
//                   <button
//                     className="btn btn-sm btn-outline-danger ms-2"
//                     onClick={() => handleRemoveSubject(index)}
//                   >
//                     <BsDash />
//                   </button>
//                 </td>
//                 <td>
//                   <select
//                     className="form-select"
//                     value={teachers.find(teacher => teacher.facultyId === selectedTeachers[subject.subjectId])?.facultyName || ''}
//                     onChange={(e) => handleTeacherChange(index, e.target.value)}
//                   >
//                     <option value="">Select Teacher</option>
//                     {getAvailableTeachers(index).map((teacher) => (
//                       <option key={teacher.facultyId} value={teacher.facultyName}>
//                         {teacher.facultyName}
//                       </option>
//                     ))}
//                   </select>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Allocation;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Styles/Allocation.css';
import { BsPlus, BsPencil, BsDash } from 'react-icons/bs';

const Allocation = () => {
  const hodDepartment = 'IOT';

  const [selectedBranch, setSelectedBranch] = useState('');
  const [currentSemester, setCurrentSemester] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');
  const [selectedOptions, setSelectedOptions] = useState({});

  const [branches, setBranches] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [batches, setBatches] = useState([]);
  const [semesters, setSemesters] = useState([]);

  useEffect(() => {
    const fetchCriteria = async () => {
      try {
        const response = await axios.get('http://localhost:4545/hod/getCriteriaFacSub', {
          params: { hodDepartment: hodDepartment }
        });

        const { branch, division, batch, semester } = response.data;
        setBranches(branch);
        setDivisions(division);
        setBatches(batch);
        setSemesters(semester);
      } catch (error) {
        console.error('Error fetching criteria:', error);
      }
    };

    fetchCriteria();
  }, [hodDepartment]);

  useEffect(() => {
    const fetchSubjectsAndTeachers = async () => {
      if (selectedBranch && currentSemester && selectedDivision && selectedBatch) {
        try {
          const response = await axios.get('http://localhost:4545/hod/getSubjectsAndFaculty', {
            params: {
              branch: selectedBranch,
              semester: currentSemester,
              hodDepartment: hodDepartment
            }
          });

          const { subjects, teachers } = response.data;
          setSubjects(subjects || []);
          setTeachers(teachers || []);
          setSelectedOptions({});
        } catch (error) {
          console.error('Error fetching subjects and teachers:', error);
        }
      }
    };

    fetchSubjectsAndTeachers();
  }, [selectedBranch, currentSemester, selectedDivision, selectedBatch, hodDepartment]);

  const handleAddSubject = () => {
    const newSubject = prompt('Enter new subject:');
    const newSubjectId = prompt('Enter new subject id:');
    if (newSubject) {
      setSubjects([...subjects, { subjectId: newSubjectId, subjectName: newSubject }]);
    }
  };

  const handleRemoveSubject = (index) => {
    if (window.confirm('Are you sure you want to remove this subject?')) {
      const subjectId = subjects[index].subjectId;
      setSubjects(subjects.filter((_, i) => i !== index));
      const updatedSelectedOptions = { ...selectedOptions };
      delete updatedSelectedOptions[subjectId];
      setSelectedOptions(updatedSelectedOptions);
    }
  };

  const handleEditSubject = (index) => {
    const editedSubject = prompt('Edit subject:', subjects[index].subjectName);
    if (editedSubject) {
      setSubjects(subjects.map((subject, i) =>
        i === index ? { ...subject, subjectName: editedSubject } : subject
      ));
    }
  };

  const handleTeacherChange = (index, facultyName) => {
    const selectedTeacher = teachers.find(teacher => teacher.facultyName === facultyName);
    const facultyId = selectedTeacher ? selectedTeacher.facultyId : '';

    setSelectedOptions({
      ...selectedOptions,
      [subjects[index].subjectId]: facultyId,
    });
  };

  const applyChanges = async () => {
    try {
      const dataToSend = subjects.map(subject => ({
        semester: currentSemester,
        branch: selectedBranch,
        division: selectedDivision,
        batch: selectedBatch,
        subject_id: subject.subjectId,
        faculty_id: selectedOptions[subject.subjectId] || "",
      })).filter(item => item.faculty_id); // Filter out entries with no faculty_id

      console.log(dataToSend);
      await axios.post('http://localhost:4545/hod/updateSubjects', dataToSend);
      console.log('Changes applied successfully');
      alert('Changes applied successfully');
      setSelectedBranch('');
      setSelectedBatch('');
      setCurrentSemester('');
      setSelectedDivision('');
      setSubjects([]);
      setTeachers([]);
      setSelectedOptions({});
    } catch (error) {
      console.error('Error applying changes:', error);
    }
  };

  const getAvailableTeachers = (index) => {
    // Collect all selected faculty IDs
    const selectedFacultyIds = new Set(Object.values(selectedOptions));

    // Filter teachers excluding those who are already selected for other subjects
    return teachers.filter(teacher => !selectedFacultyIds.has(teacher.facultyId) || teacher.facultyId === selectedOptions[subjects[index].subjectId]);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Department of {hodDepartment}</h1>
      <div className="row mb-3">
        <div className="col-12 col-md-3">
          <label htmlFor="branchSelect" className="form-label">
            Select Branch:
          </label>
          <select
            id="branchSelect"
            className="form-select"
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
          >
            <option value="" disabled>Select Branch</option>
            {branches && branches.map((branch) => (
              <option key={branch} value={branch}>
                {branch}
              </option>
            ))}
          </select>
        </div>
        <div className="col-12 col-md-3">
          <label htmlFor="semesterSelect" className="form-label">
            Select Semester:
          </label>
          <select
            id="semesterSelect"
            className="form-select"
            value={currentSemester}
            onChange={(e) => setCurrentSemester(e.target.value)}
          >
            <option value="" disabled>Select Semester</option>
            {semesters && semesters.map((sem) => (
              <option key={sem} value={sem}>
                Semester {sem}
              </option>
            ))}
          </select>
        </div>
        <div className="col-12 col-md-3">
          <label htmlFor="divisionSelect" className="form-label">
            Select Division:
          </label>
          <select
            id="divisionSelect"
            className="form-select"
            value={selectedDivision}
            onChange={(e) => setSelectedDivision(e.target.value)}
          >
            <option value="" disabled>Select Division</option>
            {divisions && divisions.map((division) => (
              <option key={division} value={division}>
                {division}
              </option>
            ))}
          </select>
        </div>
        <div className="col-12 col-md-3">
          <label htmlFor="batchSelect" className="form-label">
            Select Batch:
          </label>
          <select
            id="batchSelect"
            className="form-select"
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
          >
            <option value="" disabled>Select Batch</option>
            {batches && batches.map((batch) => (
              <option key={batch} value={batch}>
                {batch}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-12">
          <button
            className="btn btn-primary me-2"
            onClick={handleAddSubject}
          >
            <BsPlus /> Add Subject
          </button>
          <button
            className="btn btn-success ms-2"
            onClick={applyChanges}
          >
            Apply Changes
          </button>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Subject</th>
              <th>Teacher</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject, index) => (
              <tr key={subject.subjectId}>
                <td>
                  {subject.subjectName}
                  <button
                    className="btn btn-sm btn-outline-warning ms-2"
                    onClick={() => handleEditSubject(index)}
                  >
                    <BsPencil />
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger ms-2"
                    onClick={() => handleRemoveSubject(index)}
                  >
                    <BsDash />
                  </button>
                </td>
                <td>
                  <select
                    className="form-select"
                    value={teachers.find(teacher => teacher.facultyId === selectedOptions[subject.subjectId])?.facultyName || ''}
                    onChange={(e) => handleTeacherChange(index, e.target.value)}
                  >
                    <option value="">Select Teacher</option>
                    {getAvailableTeachers(index).map((teacher) => (
                      <option key={teacher.facultyId} value={teacher.facultyName}>
                        {teacher.facultyName}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Allocation;
