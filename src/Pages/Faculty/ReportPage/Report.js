

import React, { useState, useMemo } from 'react';
import './Styles/Report.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFileExcel } from '@fortawesome/free-solid-svg-icons'; // Changed to faFileExcel
import * as XLSX from 'xlsx'; // Import XLSX

const Report = ({ attendanceData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [attendanceFilter, setAttendanceFilter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(); // Format date to local date string
  };

  const cumulativeAttendance = (lectures, filteredDates) => {
    return filteredDates.map((date) => {
      const index = sortedDates.indexOf(date);
      if (index !== -1) {
        let presentCount = 0;
        for (let i = 0; i <= index; i++) {
          if (lectures[i]) {
            presentCount++;
          }
        }
        return presentCount;
      }
      return null;
    });
  };

  const calculateAttendancePercentage = (lectures, filteredDates) => {
    const totalLectures = filteredDates.length;
    const attendedLectures = lectures.reduce((count, attended, idx) => {
      if (filteredDates.includes(sortedDates[idx]) && attended) {
        return count + 1;
      }
      return count;
    }, 0);
    return (attendedLectures / totalLectures) * 100;
  };

  const dates = attendanceData.length > 0 ? attendanceData[0].dates : [];
  const sortedDates = useMemo(() => [...dates].sort((a, b) => new Date(a) - new Date(b)), [dates]);

  const filteredDates = useMemo(() => {
    return sortedDates.filter(date => {
      if (!startDate || !endDate) {
        return true;
      }
      const start = new Date(startDate);
      const end = new Date(endDate);
      const currentDate = new Date(date);
      return currentDate >= start && currentDate <= end;
    });
  }, [sortedDates, startDate, endDate]);

  const filteredAttendance = useMemo(() => {
    return attendanceData.filter(student => {
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
  }, [attendanceData, searchTerm, attendanceFilter, filteredDates]);

  const counts = useMemo(() => {
    const studentCount = filteredAttendance.length;
    return filteredDates.map(date => {
      const count = filteredAttendance.reduce((total, student) => {
        const index = sortedDates.indexOf(date);
        return student.lectures[index] ? total + 1 : total;
      }, 0);
      return count;
    });
  }, [filteredAttendance, sortedDates, filteredDates]);

  const percentages = useMemo(() => {
    const studentCount = filteredAttendance.length;
    return counts.map(count => (studentCount > 0 ? (count / studentCount) * 100 : 0).toFixed(2));
  }, [counts, filteredAttendance]);

  const generateXLSX = () => {
    // Create data array for the Excel file
    const headers = ['Student PRN', 'Name', ...filteredDates.map((date, idx) => `${formatDate(date)}`), 'Percentage'];
    
    // Prepare data
    const data = filteredAttendance.map(student => {
      const percentage = calculateAttendancePercentage(student.lectures, filteredDates);
      return [
        student.prn,
        student.name,
        ...sortedDates.map((date, idx) => student.lectures[idx] ? 'P' : 'A'),
        `${percentage.toFixed(2)}%`
      ];
    });
    
    // Add header row
    const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);
  
    // Format date cells
    const dateCells = filteredDates.map((date, idx) => ({
      t: 'n', // Number type for date
      z: 'dd-mm-yyyy', // Format as dd-mm-yyyy
      v: new Date(date).getTime() // Convert date to timestamp
    }));
    
    // Create row for lecture numbers
    const lectureRow = ['', 'Lecture Numbers'] // First two cells
    .concat(filteredDates.map((date, idx) => `Lec ${idx + 1}`))
    .concat(['']);
  
    // Add lecture numbers row
    XLSX.utils.sheet_add_aoa(ws, [lectureRow], { origin: 'A1' });
  
    // Add data row below
    XLSX.utils.sheet_add_aoa(ws, [headers, ...data], { origin: 'A2' });
  
    // Add worksheet to workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Attendance Report');
  
    // Write to file
    XLSX.writeFile(wb, 'AttendanceReport.xlsx');
  };
  

  if (!attendanceData || attendanceData.length === 0) {
    return (
      <div className='container shadow-none' style={{ minHeight: '100%' }}>
        <div className='row'>
          <h1 className='display-4 text-primary text-center py-md-5'>No Records to display.</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4 shadow-none">
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
              <button className="btn btn-primary mt-2" onClick={generateXLSX}>
                <FontAwesomeIcon icon={faFileExcel} /> Generate XLSX
              </button>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className='sticky-top'>
                <tr className='sticky-top' style={{ backgroundColor: '#f3be49' }}>
                  <th scope="col" className="sticky-column prn-col" style={{ zIndex: '999', backgroundColor: '#f3be49' }}>Student PRN</th>
                  <th scope="col" className="sticky-column name-col" style={{ zIndex: '999', backgroundColor: '#f3be49' }}>Name</th>
                  {filteredDates.map((date, idx) => (
                    <th scope="col" className='sticky-column' style={{ backgroundColor: '#f3be49' }} key={idx}>
                      <div>Lec {idx + 1}</div>
                      <div>{formatDate(date)}</div>
                    </th>
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
                    <td style={{ backgroundColor: '#f3be49' }}>{calculateAttendancePercentage(student.lectures, filteredDates).toFixed(2)}%</td>
                  </tr>
                ))}
                <tr>
                  <td className='sticky-column' colSpan={2} style={{ textAlign: 'center', backgroundColor: '#f3be49', fontWeight: 'bold' }}>
                    Count of Students Present
                  </td>
                  {counts.map((count, idx) => (
                    <td key={idx} style={{ textAlign: 'center', backgroundColor: '#f3be49' }}>{count}</td>
                  ))}
                  <td></td>
                </tr>
                <tr>
                  <td className='sticky-column' colSpan={2} style={{ textAlign: 'center', backgroundColor: '#f3be49', fontWeight: 'bold' }}>
                    Percentage of Students Present
                  </td>
                  {percentages.map((percentage, idx) => (
                    <td key={idx} style={{ textAlign: 'center', backgroundColor: '#f3be49' }}>{percentage}%</td>
                  ))}
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;




// import React, { useState, useMemo } from 'react';
// import './Styles/Report.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFileExcel } from '@fortawesome/free-solid-svg-icons'; // Only import faFileExcel
// import * as XLSX from 'xlsx'; // Import XLSX

// const Report = ({ attendanceData }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [attendanceFilter, setAttendanceFilter] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');

//   const formatDate = (date) => {
//     return new Date(date).toLocaleDateString(); // Format date to local date string
//   };

//   const cumulativeAttendance = (lectures, filteredDates) => {
//     return filteredDates.map((date) => {
//       const index = sortedDates.indexOf(date);
//       if (index !== -1) {
//         let presentCount = 0;
//         for (let i = 0; i <= index; i++) {
//           if (lectures[i]) {
//             presentCount++;
//           }
//         }
//         return presentCount;
//       }
//       return null;
//     });
//   };

//   const calculateAttendancePercentage = (lectures, filteredDates) => {
//     const totalLectures = filteredDates.length;
//     const attendedLectures = lectures.reduce((count, attended, idx) => {
//       if (filteredDates.includes(sortedDates[idx]) && attended) {
//         return count + 1;
//       }
//       return count;
//     }, 0);
//     return (attendedLectures / totalLectures) * 100;
//   };

//   const sortedDates = useMemo(() => {
//     const dates = attendanceData.length > 0 ? attendanceData[0].dates : [];
//     return [...dates].sort((a, b) => new Date(a) - new Date(b));
//   }, [attendanceData]);

//   const filteredDates = useMemo(() => {
//     return sortedDates.filter(date => {
//       if (!startDate || !endDate) {
//         return true;
//       }
//       const start = new Date(startDate);
//       const end = new Date(endDate);
//       const currentDate = new Date(date);
//       return currentDate >= start && currentDate <= end;
//     });
//   }, [sortedDates, startDate, endDate]);

//   const filteredAttendance = useMemo(() => {
//     return attendanceData.filter(student => {
//       const percentage = calculateAttendancePercentage(student.lectures, filteredDates);

//       const meetsSearchCriteria = () => {
//         if (!searchTerm) return true;
//         return (
//           student.prn.toString().includes(searchTerm) ||
//           student.name.toLowerCase().includes(searchTerm.toLowerCase())
//         );
//       };

//       const meetsAttendanceCriteria = () => {
//         if (!attendanceFilter) return true;
//         return (
//           (attendanceFilter === 'below50' && percentage < 50) ||
//           (attendanceFilter === '50to65' && percentage >= 50 && percentage < 65) ||
//           (attendanceFilter === '65to75' && percentage >= 65 && percentage < 75) ||
//           (attendanceFilter === 'above75' && percentage >= 75)
//         );
//       };

//       return meetsSearchCriteria() && meetsAttendanceCriteria();
//     });
//   }, [attendanceData, searchTerm, attendanceFilter, filteredDates, calculateAttendancePercentage]);

//   const counts = useMemo(() => {
//     return filteredDates.map(date => {
//       const count = filteredAttendance.reduce((total, student) => {
//         const index = sortedDates.indexOf(date);
//         return student.lectures[index] ? total + 1 : total;
//       }, 0);
//       return count;
//     });
//   }, [filteredAttendance, sortedDates, filteredDates]);

//   const percentages = useMemo(() => {
//     return counts.map(count => (filteredAttendance.length > 0 ? (count / filteredAttendance.length) * 100 : 0).toFixed(2));
//   }, [counts, filteredAttendance]);

//   const generateXLSX = () => {
//     const headers = ['Student PRN', 'Name', ...filteredDates.map((date) => `${formatDate(date)}`), 'Percentage'];
    
//     const data = filteredAttendance.map(student => {
//       const percentage = calculateAttendancePercentage(student.lectures, filteredDates);
//       return [
//         student.prn,
//         student.name,
//         ...sortedDates.map((date, idx) => student.lectures[idx] ? 'P' : 'A'),
//         `${percentage.toFixed(2)}%`
//       ];
//     });
    
//     const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);
    
//     const lectureRow = ['', 'Lecture Numbers'] 
//       .concat(filteredDates.map((date, idx) => `Lec ${idx + 1}`))
//       .concat(['']);
    
//     XLSX.utils.sheet_add_aoa(ws, [lectureRow], { origin: 'A1' });
//     XLSX.utils.sheet_add_aoa(ws, [headers, ...data], { origin: 'A2' });
    
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, 'Attendance Report');
    
//     XLSX.writeFile(wb, 'AttendanceReport.xlsx');
//   };

//   if (!attendanceData || attendanceData.length === 0) {
//     return (
//       <div className='container' style={{ minHeight: '100%' }}>
//         <div className='row'>
//           <h1 className='display-4 text-primary text-center py-md-5'>No Records to display.</h1>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mt-4">
//       <div className="row justify-content-center">
//         <div className="col-12">
//           <div className="input-group mb-3">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Search by PRN or Name"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//           <div className="row mb-3">
//             <div className="col">
//               <label htmlFor="attendanceFilter" className="form-label">Attendance Filter:</label>
//               <select className="form-select" id="attendanceFilter" value={attendanceFilter} onChange={(e) => setAttendanceFilter(e.target.value)}>
//                 <option value="">Select Attendance Filter</option>
//                 <option value="below50">Below 50%</option>
//                 <option value="50to65">50% to 65%</option>
//                 <option value="65to75">65% to 75%</option>
//                 <option value="above75">Above 75%</option>
//               </select>
//             </div>
//             <div className="col">
//               <label htmlFor="startDate" className="form-label">Start Date:</label>
//               <input
//                 type="date"
//                 className="form-control"
//                 id="startDate"
//                 value={startDate}
//                 onChange={(e) => setStartDate(e.target.value)}
//               />
//             </div>
//             <div className="col">
//               <label htmlFor="endDate" className="form-label">End Date:</label>
//               <input
//                 type="date"
//                 className="form-control"
//                 id="endDate"
//                 value={endDate}
//                 onChange={(e) => setEndDate(e.target.value)}
//               />
//             </div>
//             <div className="col-auto align-self-end">
//               <button className="btn btn-primary mt-2" onClick={generateXLSX}>
//                 <FontAwesomeIcon icon={faFileExcel} /> Generate XLSX
//               </button>
//             </div>
//           </div>
//           <div className="table-responsive">
//             <table className="table table-bordered table-hover">
//               <thead className='sticky-top'>
//                 <tr className='sticky-top' style={{ backgroundColor: '#f3be49' }}>
//                   <th scope="col" className="sticky-column prn-col" style={{ zIndex: '999', backgroundColor: '#f3be49' }}>Student PRN</th>
//                   <th scope="col" className="sticky-column name-col" style={{ zIndex: '999', backgroundColor: '#f3be49' }}>Name</th>
//                   {filteredDates.map((date, idx) => (
//                     <th scope="col" className='sticky-column' style={{ backgroundColor: '#f3be49' }} key={idx}>
//                       <div>Lec {idx + 1}</div>
//                       <div>{formatDate(date)}</div>
//                     </th>
//                   ))}
//                   <th scope="col" className='sticky-column' style={{ backgroundColor: '#f3be49' }}>Percentage</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredAttendance.map((student) => (
//                   <tr key={student.prn}>
//                     <td className="sticky-column prn-col" style={{ backgroundColor: '#c1cfc3' }}>{student.prn}</td>
//                     <td className="sticky-column name-col" style={{ backgroundColor: '#c1cfc3' }}>{student.name}</td>
//                     {filteredDates.map((date, idx) => (
//                       cumulativeAttendance(student.lectures, filteredDates)[idx] !== null ? (
//                         <td key={idx}>{cumulativeAttendance(student.lectures, filteredDates)[idx]}</td>
//                       ) : (
//                         <td key={idx}></td>
//                       )
//                     ))}
//                     <td style={{ backgroundColor: '#f3be49' }}>{calculateAttendancePercentage(student.lectures, filteredDates).toFixed(2)}%</td>
//                   </tr>
//                 ))}
//                 <tr>
//                   <td className='sticky-column' colSpan={2} style={{ textAlign: 'center', backgroundColor: '#f3be49', fontWeight: 'bold' }}>
//                     Count of Students Present
//                   </td>
//                   {counts.map((count, idx) => (
//                     <td key={idx} style={{ textAlign: 'center', backgroundColor: '#f3be49' }}>{count}</td>
//                   ))}
//                   <td></td>
//                 </tr>
//                 <tr>
//                   <td className='sticky-column' colSpan={2} style={{ textAlign: 'center', backgroundColor: '#f3be49', fontWeight: 'bold' }}>
//                     Percentage of Students Present
//                   </td>
//                   {percentages.map((percentage, idx) => (
//                     <td key={idx} style={{ textAlign: 'center', backgroundColor: '#f3be49' }}>{percentage}%</td>
//                   ))}
//                   <td></td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Report;
