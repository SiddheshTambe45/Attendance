

import React, { useState } from 'react';
import './Styles/Report.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFileCsv } from '@fortawesome/free-solid-svg-icons';
import { saveAs } from 'file-saver';

const Report = ({ attendanceData }) => {

  
  const [searchTerm, setSearchTerm] = useState('');
  const [attendanceFilter, setAttendanceFilter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  if (!attendanceData || attendanceData.length === 0) {
    return (
      <div className='container' style={{minHeight:'100%'}}>
        <div className='row'>
          <h1 className='display-4 text-primary text-center py-md-5 '>No Records to display.</h1>
        </div>
      </div>
    );
  }

  if (!attendanceData || attendanceData.length === 0) {
    return null;
  }

  const dates = attendanceData.length > 0 ? attendanceData[0].dates : [];

  const cumulativeAttendance = (lectures, filteredDates) => {
    return filteredDates.map((date) => {
      const index = dates.indexOf(date);
      if (index !== -1) {
        let presentCount = 0;
        for (let i = 0; i <= index; i++) {
          if (lectures[i]) {
            presentCount++;
          }
        }
        return presentCount;
      }
      return null; // Return null for dates not in the filtered range
    });
  };

  const calculateAttendancePercentage = (lectures, filteredDates) => {
    const totalLectures = filteredDates.length;
    const attendedLectures = lectures.reduce((count, attended, idx) => {
      if (filteredDates.includes(dates[idx]) && attended) {
        return count + 1;
      }
      return count;
    }, 0);
    return (attendedLectures / totalLectures) * 100;
  };

  const filteredDates = dates.filter(date => {
    if (!startDate || !endDate) {
      return true; // Return true to include all dates if no date range is specified
    }
  
    const start = new Date(startDate);
    const end = new Date(endDate);
    const currentDate = new Date(date);
  
    return currentDate >= start && currentDate <= end;
  });

  const filteredAttendance = attendanceData.filter(student => {
    const percentage = calculateAttendancePercentage(student.lectures, filteredDates);

    const meetsSearchCriteria = () => {
      if (!searchTerm) return true;
      return (
        student.prn.toString().includes(searchTerm) ||
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    };

    const meetsAttendanceCriteria = () => {
      if (!attendanceFilter) return true;
      return (
        (attendanceFilter === 'below50' && percentage < 50) ||
        (attendanceFilter === '50to65' && percentage >= 50 && percentage < 65) ||
        (attendanceFilter === '65to75' && percentage >= 65 && percentage < 75) ||
        (attendanceFilter === 'above75' && percentage >= 75)
      );
    };

    return meetsSearchCriteria() && meetsAttendanceCriteria();
  });

  const generateCSV = () => {
    // const csvContent = [
    //   ["Student PRN", "Name", ...filteredDates, "Percentage"], // Headers
    //   ...filteredAttendance.map(student => [
    //     student.prn,
    //     student.name,
    //     ...cumulativeAttendance(student.lectures, filteredDates),
    //     `${calculateAttendancePercentage(student.lectures, filteredDates).toFixed(2)}%`
    //   ])
    // ];

    const csvContent = [
      ["Student PRN", "Name", ...filteredDates, "Percentage", "Signature"], // Headers
      ...filteredAttendance.map(student => [
        student.prn,
        student.name,
        ...cumulativeAttendance(student.lectures, filteredDates),
        `${calculateAttendancePercentage(student.lectures, filteredDates).toFixed(2)}%`,
        "" // Empty string for the Signature column
      ])
    ];
    
    const csvString = csvContent.map(row => row.join(",")).join("\n");

    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'AttendanceReport.csv');
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-12">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by PRN or Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
          </div>
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="attendanceFilter" className="form-label">Attendance Filter:</label>
              <select className="form-select" id="attendanceFilter" value={attendanceFilter} onChange={(e) => setAttendanceFilter(e.target.value)}>
                <option value="">Select Attendance Filter</option>
                <option value="below50">Below 50%</option>
                <option value="50to65">50% to 65%</option>
                <option value="65to75">65% to 75%</option>
                <option value="above75">Above 75%</option>
              </select>
            </div>
            <div className="col">
              <label htmlFor="startDate" className="form-label">Start Date:</label>
              <input
                type="date"
                className="form-control"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="col">
              <label htmlFor="endDate" className="form-label">End Date:</label>
              <input
                type="date"
                className="form-control"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            
            <div className="col-auto align-self-end">
              <button className="btn btn-primary mt-2" onClick={generateCSV}>
                <FontAwesomeIcon icon={faFileCsv} /> Generate CSV
              </button>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="">
                <tr className='sticky-top' style={{ backgroundColor: '#f3be49' }}>
                  <th scope="col" className="sticky-column prn-col" style={{ zIndex: '999', backgroundColor: '#f3be49' }}>Student PRN</th>
                  <th scope="col" className="sticky-column name-col" style={{ zIndex: '999', backgroundColor: '#f3be49' }}>Name</th>
                  {filteredDates.map((date, idx) => (
                    <th scope="col" className='sticky-column' style={{ backgroundColor: '#f3be49' }} key={idx}>{date}</th>
                  ))}
                  <th scope="col" className='sticky-column' style={{ backgroundColor: '#f3be49' }}>Percentage</th>
                </tr>
              </thead>
              <tbody>
                {filteredAttendance.map((student) => (
                  <tr key={student.prn}>
                    <td className="sticky-column prn-col" style={{ backgroundColor: '#c1cfc3' }}>{student.prn}</td>
                    <td className="sticky-column name-col" style={{ backgroundColor: '#c1cfc3' }}>{student.name}</td>
                    {filteredDates.map((date, idx) => (
                      cumulativeAttendance(student.lectures, filteredDates)[idx] !== null ? (
                        <td key={idx}>{cumulativeAttendance(student.lectures, filteredDates)[idx]}</td>
                      ) : (
                        <td key={idx}></td>
                      )
                    ))}
                    <td>{calculateAttendancePercentage(student.lectures, filteredDates).toFixed(2)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
