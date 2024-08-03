import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Styles/Allocation.css';
import { BsPlus, BsPencil, BsDash } from 'react-icons/bs';

const Allocation = () => {
  const hodDepartment = "IOT"; // This is your department
  const [selectedBranch, setSelectedBranch] = useState('');
  const [currentSemester, setCurrentSemester] = useState('');
  const [subjects, setSubjects] = useState([]); // State for subjects
  const [teachers, setTeachers] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');
  const [selectedOptions, setSelectedOptions] = useState({}); // Faculty assignment options
  const [branches, setBranches] = useState([]);
  const [divisions, setDivisions] = useState({});
  const [batches, setBatches] = useState({});
  const [semesters, setSemesters] = useState([]);
  const [departments, setDepartments] = useState([]); // State for departments

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [newSubject, setNewSubject] = useState({ id: '', name: '', type: 'T', isNew: true });
  const [editSubject, setEditSubject] = useState({ id: '', name: '', type: 'T', isNew: false });
  const [editSubjectIndex, setEditSubjectIndex] = useState(null);

  useEffect(() => {
    const fetchCriteria = async () => {
      try {
        const response = await axios.get('http://localhost:4545/hod/getCriteriaFacSub', {
          params: { department: hodDepartment }
        });
        const { semesters, divisions, batches } = response.data;
        setSemesters(semesters || []);
        setDivisions(divisions || {});
        setBatches(batches || {});
      } catch (error) {
        console.error('Error fetching criteria:', error);
        alert('Failed to fetch criteria.');
      }
    };

    fetchCriteria();
  }, []);

  const fetchSubjectsAndFaculty = async () => {
    try {
      const response = await axios.get('http://localhost:4545/hod/getSubjectsAndFaculty', {
        params: { branch: hodDepartment, semester: currentSemester, division: selectedDivision, batch: selectedBatch }
      });
      const { faculty, subjects, allDepartments } = response.data;

      setSubjects(subjects || []);
      setTeachers(faculty || []);
      setDepartments(allDepartments || []);
    } catch (error) {
      console.error('Error fetching subjects and faculty:', error);
      alert('Failed to fetch subjects and faculty.');
    }
  };

  const fetchFacultyByDepartment = async (department) => {
    if (!department) {
      alert('Please select a department.');
      return;
    }

    try {
      const response = await axios.get('http://localhost:4545/hod/getFacultyByDepartment', {
        params: { department }
      });

      const faculty = response.data;
      setTeachers(faculty || []);
    } catch (error) {
      console.error('Error fetching faculty:', error);
      alert('Failed to fetch faculty.');
    }
  };

  const handleAddSubject = () => {
    if (!currentSemester || !selectedDivision || !selectedBatch) {
      alert('Please select semester, division, and batch before adding a subject.');
      return;
    }

    setShowModal(true);
    setNewSubject({ id: '', name: '', type: 'T', isNew: true });
    setEditSubjectIndex(null);
  };

  const handleSaveSubject = () => {
    if (newSubject.id && newSubject.name) {
      setSubjects((prevSubjects) => [
        ...prevSubjects,
        {
          SUBJECT_ID: newSubject.id.toUpperCase(),
          SUBJECT_NAME: newSubject.name.toUpperCase(),
          TYPE: newSubject.type,
          SEMESTER: parseInt(currentSemester),
          DIVISION: selectedDivision,
          BATCH: selectedBatch,
          isNew: true
        }
      ]);
      setSelectedOptions((prevOptions) => ({ ...prevOptions, [newSubject.id.toUpperCase()]: '' }));
      setShowModal(false);
    }
  };

  const handleRemoveSubject = (subjectId) => {
    if (window.confirm('Are you sure you want to remove this subject?')) {
      setSubjects((prevSubjects) => prevSubjects.filter(subject => subject.SUBJECT_ID !== subjectId));
      setSelectedOptions((prevOptions) => {
        const updatedSelectedOptions = { ...prevOptions };
        delete updatedSelectedOptions[subjectId];
        return updatedSelectedOptions;
      });
    }
  };

  const handleEditSubject = (index) => {
    const subject = subjects[index];
    if (subject) {
      setEditSubjectIndex(index);
      setEditSubject({
        id: subject.SUBJECT_ID || '',
        name: subject.SUBJECT_NAME || '',
        type: subject.TYPE || 'T',
        isNew: subject.isNew,
        originalName: subject.SUBJECT_NAME,
        originalId: subject.SUBJECT_ID,
        originalType: subject.TYPE
      });
      setShowModal(true);
    }
  };

  const handleSaveEditSubject = () => {
    if (editSubject.id && editSubject.name && editSubjectIndex !== null) {
      setSubjects((prevSubjects) =>
        prevSubjects.map((subject, index) =>
          index === editSubjectIndex ? {
            SUBJECT_ID: editSubject.id.toUpperCase(),
            SUBJECT_NAME: editSubject.name.toUpperCase(),
            TYPE: editSubject.type,
            SEMESTER: parseInt(currentSemester),
            DIVISION: selectedDivision,
            BATCH: selectedBatch,
            isNew: editSubject.isNew
          } : subject
        )
      );
      setEditSubjectIndex(null);
      setShowModal(false);
    }
  };

  const handleTeacherChange = (index, facultyId) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [subjects[index].SUBJECT_ID]: facultyId
    }));
  };

  const handleSubjectTypeChange = (subjectId, type) => {
    setSubjects((prevSubjects) =>
      prevSubjects.map((subject) =>
        subject.SUBJECT_ID === subjectId ? { ...subject, TYPE: type } : subject
      )
    );
  };

  const applyChanges = async () => {
    try {
      const dataToSend = subjects
        .map((subject) => {
          const isNew = subject.isNew ? 'yes' : '';
          const isUpdated = !subject.isNew && (subject.SUBJECT_NAME !== (subject.originalName || '') ||
            subject.SUBJECT_ID !== (subject.originalId || '') ||
            subject.TYPE !== (subject.originalType || '')) ? 'yes' : '';
          
          return {
            semester: currentSemester,
            branch: hodDepartment,
            division: selectedDivision,
            batch: selectedBatch,
            subject_id: subject.SUBJECT_ID,
            faculty_id: selectedOptions[subject.SUBJECT_ID] || "",
            subject_type: subject.TYPE || 'T',
            new: isNew,
            update: isUpdated,
            subject_name: subject.SUBJECT_NAME,
          };
        })
        .filter(item => item.subject_name && item.subject_id && item.subject_type && item.faculty_id);
        
      console.log(dataToSend)
      await axios.post('http://localhost:4545/hod/allocateFacultyToSubject', dataToSend);
      alert('Changes applied successfully');
      resetForm();
    } catch (error) {
      console.error('Error applying changes:', error);
      alert('Failed to apply changes.');
    }
  };

  const resetForm = () => {
    setSelectedBranch('');
    setSelectedBatch('');
    setCurrentSemester('');
    setSelectedDivision('');
    setSubjects([]);
    setTeachers([]);
    setSelectedOptions({});
  };

  const getAvailableTeachers = (index) => {
    const selectedFacultyIds = new Set(Object.values(selectedOptions));
    return teachers.filter(teacher => !selectedFacultyIds.has(teacher.FACULTY_ID) || teacher.FACULTY_ID === selectedOptions[subjects[index].SUBJECT_ID]);
  };

  // Filtering divisions based on the selected semester
  const filteredDivisions = currentSemester ? (divisions[currentSemester] || []) : [];

  // Filtering batches based on the selected division and semester
  const filteredBatches = currentSemester && selectedDivision ? (batches[currentSemester]?.[selectedDivision] || []) : [];

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Department Allocation</h1>
      <div className="row mb-3">
        <div className="col-12 col-md-3">
          <label htmlFor="departmentSelect" className="form-label">Select Department:</label>
          <select
            id="departmentSelect"
            className="form-select"
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
          >
            <option value="">Select Department</option>
            {departments.map((department) => (
              <option key={department} value={department}>{department}</option>
            ))}
          </select>
        </div>

        <div className="col-12 col-md-3">
          <label htmlFor="semesterSelect" className="form-label">Select Semester:</label>
          <select
            id="semesterSelect"
            className="form-select"
            value={currentSemester}
            onChange={(e) => setCurrentSemester(e.target.value)}
          >
            <option value="">Select Semester</option>
            {semesters.map((semester) => (
              <option key={semester} value={semester}>{semester}</option>
            ))}
          </select>
        </div>

        <div className="col-12 col-md-3">
          <label htmlFor="divisionSelect" className="form-label">Select Division:</label>
          <select
            id="divisionSelect"
            className="form-select"
            value={selectedDivision}
            onChange={(e) => setSelectedDivision(e.target.value)}
          >
            <option value="">Select Division</option>
            {filteredDivisions.map((division) => (
              <option key={`${currentSemester}-${division}`} value={division}>{division}</option>
            ))}
          </select>
        </div>

        <div className="col-12 col-md-3">
          <label htmlFor="batchSelect" className="form-label">Select Batch:</label>
          <select
            id="batchSelect"
            className="form-select"
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
          >
            <option value="">Select Batch</option>
            {filteredBatches.map((batch) => (
              <option key={batch} value={batch}>{batch}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-3 text-center">
        <button className="btn btn-primary" onClick={fetchSubjectsAndFaculty}>Get Data</button>
        <button className="btn btn-secondary ml-2" onClick={() => fetchFacultyByDepartment(selectedBranch)}>Fetch Faculty by Department</button>
      </div>

      <div className="mb-3">
        <button className="btn btn-success" onClick={handleAddSubject}>
          <BsPlus /> Add New Subject
        </button>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Subject ID</th>
            <th>Subject Name</th>
            <th>Type</th>
            <th>Faculty</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject, index) => (
            <tr key={subject.SUBJECT_ID}>
              <td>{subject.SUBJECT_ID}</td>
              <td>{subject.SUBJECT_NAME}</td>
              <td>
                <select
                  value={subject.TYPE}
                  onChange={(e) => handleSubjectTypeChange(subject.SUBJECT_ID, e.target.value)}
                >
                  <option value="T">Theory</option>
                  <option value="P">Practical</option>
                </select>
              </td>
              <td>
                <select
                  value={selectedOptions[subject.SUBJECT_ID] || ''}
                  onChange={(e) => handleTeacherChange(index, e.target.value)}
                >
                  <option value="">Select Faculty</option>
                  {getAvailableTeachers(index).map((teacher) => (
                    <option key={teacher.FACULTY_ID} value={teacher.FACULTY_ID}>
                      {teacher.FACULTY_NAME}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <button className="btn btn-warning btn-sm" onClick={() => handleEditSubject(index)}>
                  <BsPencil /> Edit
                </button>
                <button className="btn btn-danger btn-sm ml-2" onClick={() => handleRemoveSubject(subject.SUBJECT_ID)}>
                  <BsDash /> Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal fade show" style={{ display: 'block' }} role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{newSubject.isNew ? 'Add New Subject' : 'Edit Subject'}</h5>
                <button type="button" className="close" onClick={() => setShowModal(false)}>&times;</button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="subjectId">Subject ID:</label>
                  <input
                    type="text"
                    id="subjectId"
                    className="form-control"
                    value={newSubject.id}
                    onChange={(e) => setNewSubject({ ...newSubject, id: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subjectName">Subject Name:</label>
                  <input
                    type="text"
                    id="subjectName"
                    className="form-control"
                    value={newSubject.name}
                    onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subjectType">Subject Type:</label>
                  <select
                    id="subjectType"
                    className="form-control"
                    value={newSubject.type}
                    onChange={(e) => setNewSubject({ ...newSubject, type: e.target.value })}
                  >
                    <option value="T">Theory</option>
                    <option value="P">Practical</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                {newSubject.isNew ? (
                  <button type="button" className="btn btn-primary" onClick={handleSaveSubject}>Save</button>
                ) : (
                  <button type="button" className="btn btn-primary" onClick={handleSaveEditSubject}>Save Changes</button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="text-center mt-4">
        <button className="btn btn-primary" onClick={applyChanges}>Apply Changes</button>
        <button className="btn btn-secondary ml-2" onClick={resetForm}>Reset</button>
      </div>
    </div>
  );
};

export default Allocation;
