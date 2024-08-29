
import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../Utils/AxiosInstance'
import { useSelector } from 'react-redux';


const ReportCriteriaSelection = ({ setAttendanceData, setCriteria, criteria }) => {

  const { faculty_id } = useSelector((state) => state.auth);

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
        // const faculty_id = "F030";
        // const response = await axios.get(`http://localhost:4545/faculty/getFacultyTeachingData?faculty_id=${faculty_id}`,{
        //   withCredentials:true
        // });

        const response = await axiosInstance.get(`/faculty/getFacultyTeachingData?faculty_id=${faculty_id}`);

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
  
      // const response = await axios.get('http://localhost:4545/faculty/getParticularData', { params,
      //   withCredentials:true });

      const response = await axiosInstance.get('/faculty/getParticularData', { params });
  
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
