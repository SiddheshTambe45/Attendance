import React, { useState, useRef } from 'react';
import './Styles/ShowReport.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFileCsv } from '@fortawesome/free-solid-svg-icons';

const ShowReport = ({ attendance, loading, error }) => {
  // Extract subjects from the first student to create table headers
  const subjects = attendance.length > 0 ? Object.keys(attendance[0].subjects) : [];

  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('default');
  const componentRef = useRef();

  const calculateAttendance = (lectures) => {
    const totalLectures = lectures.length;
    const attendedLectures = lectures.filter((lecture) => lecture === 1).length;
    return totalLectures === 0 ? 0 : (attendedLectures / totalLectures) * 100;
  };

  const handleCSVDownload = () => {
    const tableRows = componentRef.current.querySelectorAll('tbody tr');
    const visibleData = Array.from(tableRows).map((row) => {
      const prn = row.querySelector('.prn-col').innerText;
      const name = row.querySelector('.name-col').innerText;
      const subjectsData = Array.from(row.querySelectorAll('.subject-data')).map((td) => td.innerText);
      return [prn, name, ...subjectsData];
    });

    // Generate CSV data
    const headerRow = 'Student PRN,Name,' + subjects.join(',') + '\n';
    const csvData = visibleData.map((row) => row.join(',')).join('\n');
    const csvContent = 'data:text/csv;charset=utf-8,' + headerRow + csvData;

    // Create download link and trigger download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'attendance.csv');
    document.body.appendChild(link);
    link.click();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching attendance data: {error}</p>;

  const combinedAttendance = attendance.map((student) => {
    const subjectsAttendance = {};

    subjects.forEach((subject) => {
      const subjectData = student.subjects[subject] || [];
      const attendancePercentage = calculateAttendance(subjectData);
      subjectsAttendance[subject] = attendancePercentage.toFixed(2);
    });

    return {
      ...student,
      subjects: subjectsAttendance,
    };
  });

  const filteredAttendance = combinedAttendance.filter((student) => {
    const matchesSearch =
      student.prn.toString().includes(searchTerm) || student.name.toLowerCase().includes(searchTerm.toLowerCase());

    let matchesFilter = true;
    if (filter !== 'default') {
      const minAttendance = Math.min(...subjects.map((subject) => parseFloat(student.subjects[subject])));

      if (filter === '75-65') {
        matchesFilter = minAttendance >= 65 && minAttendance < 75;
      } else if (filter === '<65') {
        matchesFilter = minAttendance < 65;
      } else if (filter === '>75') {
        matchesFilter = minAttendance >= 75;
      }
    }

    return matchesSearch && matchesFilter;
  });

  return (
    <div className='container'>
      <div className="row align-items-center mb-4">
        <div className="col-md-4">
          <div className="input-group">
            <span className="input-group-text" id="basic-addon1">
              <FontAwesomeIcon icon={faSearch} />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search by PRN or Name"
              aria-label="Search"
              aria-describedby="basic-addon1"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="input-group">
            <select
              className="form-select"
              aria-label="Filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="default">Select Filter</option>
              <option value=">75">Above 75%</option>
              <option value="75-65">75% to 65%</option>
              <option value="<65">Below 65%</option>
            </select>
          </div>
        </div>
        <div className="col-md-4 text-end">
          <button className="btn btn-primary" onClick={handleCSVDownload}>
            <FontAwesomeIcon icon={faFileCsv} /> Download CSV
          </button>
        </div>
      </div>

      <div ref={componentRef} className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr className="subjects-row">
              <th className="align-middle prn-col">Student PRN</th>
              <th className="align-middle name-col">Name</th>
              {subjects.map((subject, index) => (
                <th key={index} className="text-center">
                  {subject}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredAttendance.map((student) => (
              <tr key={student.prn}>
                <td className="prn-col">{student.prn}</td>
                <td className="name-col">{student.name}</td>
                {subjects.map((subject, index) => (
                  <td key={index} className="text-center subject-data">{student.subjects[subject]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowReport;