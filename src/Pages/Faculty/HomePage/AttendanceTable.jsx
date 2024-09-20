// import React from 'react';

// const AttendanceTable = () => {
//   const data = [
//     {
//       dateOfLectue:'13-09-2024',
//       semBranchDivBatch:'4/IOT/H/H2',
//       attendanceHighlights:'69-53-16',
//       type:'P',
//       dateModified:'20-09-2024'
//     },
//     {
//         dateOfLectue:'13-09-2024',
//         semBranchDivBatch:'4/IOT/H/H2',
//         attendanceHighlights:'69-53-16',
//         type:'P',
//         dateModified:'20-09-2024'
//     },
//     {
//         dateOfLectue:'13-09-2024',
//         semBranchDivBatch:'4/IOT/H/ALL',
//         attendanceHighlights:'69-53-16',
//         type:'T',
//         dateModified:'20-09-2024'
//       }
//   ];

//   return (
//     <div className="table-responsive">
//       <table className="table table-hover table-nowrap fw-lighter">
//         <thead className="table-light">
//           <tr>
//             <th scope="col">Date of Lecture</th>
//             <th scope="col">SEM/BRANCH/DIV/BATCH</th>
//             <th scope="col">Attendance Highlights</th>
//             <th scope='col'>Type</th>
//             <th scope="col">Date Modified</th>
//             <th></th>
//           </tr>
//         </thead>
//         <tbody>
//             {
//                 data.length > 0 && data.map((record,index)=>{
//                     return(
//                             <tr key={index}>
//                                 <th className='fw-normal'>{record.dateOfLectue}</th>
//                                 <th className='fw-normal'>{record.semBranchDivBatch}</th>
//                                 <th className='fw-normal'>{
//                                     <><span className='' style={{ color: '#ffa439' }}>{record.attendanceHighlights.split('-')[0]}</span>/<span className='text-success'>{record.attendanceHighlights.split('-')[1]}</span>/<span className='text-danger'>{record.attendanceHighlights.split('-')[2]}</span></>
//                                 }</th>
//                                 <th className='fw-normal'>{record.type}</th>
//                                 <th className='fw-normal'>{record.dateModified}</th>
//                             </tr>
//                     )
//                 })
//             }
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AttendanceTable;


import React from 'react';

const AttendanceTable = () => {
  const data = [
    {
      dateOfLecture: '13-09-2024',
      semBranchDivBatch: '4/IOT/H/H2',
      attendanceHighlights: '69-53-16',
      type: 'P',
      dateModified: '20-09-2024',
    },
    {
      dateOfLecture: '14-09-2024',
      semBranchDivBatch: '4/IOT/H/H1',
      attendanceHighlights: '75-50-25',
      type: 'T',
      dateModified: '21-09-2024',
    },
    {
      dateOfLecture: '15-09-2024',
      semBranchDivBatch: '4/IOT/H/H3',
      attendanceHighlights: '80-60-20',
      type: 'P',
      dateModified: '22-09-2024',
    },
    {
      dateOfLecture: '16-09-2024',
      semBranchDivBatch: '4/IOT/H/ALL',
      attendanceHighlights: '90-70-20',
      type: 'P',
      dateModified: '23-09-2024',
    },
    {
      dateOfLecture: '17-09-2024',
      semBranchDivBatch: '4/IOT/H/H2',
      attendanceHighlights: '65-50-15',
      type: 'T',
      dateModified: '24-09-2024',
    },
  ];

  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split('-');
    const formattedDate = `${year}-${month}-${day}`; // Convert to YYYY-MM-DD
    return new Date(formattedDate).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="table-responsive border border-2">
      <table className="table table-hover table-nowrap">
        <thead className="table-success">
          <tr >
            <th scope="col" className='text-secondary'>Date of Lecture</th>
            <th scope="col" className='text-secondary'>SEM/BRANCH/DIV/BATCH</th>
            <th scope="col" className='text-secondary'>Attendance Highlights (T/P/A)</th>
            <th scope='col' className='text-secondary'>Type</th>
            <th scope="col" className='text-secondary'>Date Modified</th>
          </tr>
        </thead>
        <tbody >
          {data.length > 0 ? (
            data.map((record, index) => (
              <tr key={index} className='my-3'>
                <td className='fw-bolder text-dark py-3'>{formatDate(record.dateOfLecture)}</td>
                <td className='fw-bolder text-dark py-3'>{record.semBranchDivBatch}</td>
                <td className='fw-bolder  py-3'>
                  <span style={{ color: '#ffa439' }}> {record.attendanceHighlights.split('-')[0]} </span>/
                  <span className='text-success'> {record.attendanceHighlights.split('-')[1]} </span>/
                  <span className='text-danger'> {record.attendanceHighlights.split('-')[2]} </span>
                </td>
                <td className='fw-bolder text-dark py-3'>{record.type}</td>
                <td className='fw-bolder text-dark py-3'>{formatDate(record.dateModified)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;
