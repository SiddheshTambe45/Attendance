
// import React, { useState } from 'react';
// import HeaderCriteria from './HeaderCriteria';
// import ShowReport from './ShowReport';
// // import Students from '../../JSON/Students.json'; // Assuming you have imported the JSON data
// import axios from 'axios';

// export default function HodReport() {
//   const [attendance, setAttendance] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   // Criteria state management
//   const [selectedSemester, setSelectedSemester] = useState('');
//   const [selectedBranch, setSelectedBranch] = useState('IT');
//   const [selectedDivision, setSelectedDivision] = useState('');
//   const [selectedBatch, setSelectedBatch] = useState('');

//   const handleFetchAttendance = async () => {
//     setLoading(true);
//     try {
//       // Create criteria object
//       const criteria = {
//         selectedSemester,
//         selectedBranch,
//         selectedDivision,
//         selectedBatch,
//       };
      
//       const response = await axios.get('http://localhost:4545/hod/fetchAttendanceData',{
//         params:{
//           semester:selectedSemester,
//           branch:selectedBranch,
//           division:selectedDivision,
//           batch:selectedBatch
//         }
//       });
//       console.log(response.data[0].subjects)
//       setAttendance(response.data)
//       setError('');
//     } catch (err) {
//       setError(err.toString());
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <HeaderCriteria
//         selectedSemester={selectedSemester}
//         setSelectedSemester={setSelectedSemester}
//         selectedBranch={selectedBranch}
//        // setSelectedBranch={setSelectedBranch}
//         selectedDivision={selectedDivision}
//         setSelectedDivision={setSelectedDivision}
//         selectedBatch={selectedBatch}
//         setSelectedBatch={setSelectedBatch}
//         onFetchAttendance={handleFetchAttendance}
//       />
//       <ShowReport attendance={attendance} loading={loading} error={error} />
//     </div>
//   );
// }



import React, { useState } from 'react';
import HeaderCriteria from './HeaderCriteria';
import ShowReport from './ShowReport';
import axios from 'axios';

export default function HodReport() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Criteria state management
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('IOT');
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');

  const handleFetchAttendance = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:4545/hod/fetchAttendanceData', {
        params: {
          semester: selectedSemester,
          branch: selectedBranch,
          division: selectedDivision,
          batch: selectedBatch
        }
      });
      setAttendance(response.data);
      setError('');
    } catch (err) {
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <HeaderCriteria
        selectedSemester={selectedSemester}
        setSelectedSemester={setSelectedSemester}
        selectedBranch={selectedBranch}
        setSelectedBranch={setSelectedBranch}
        selectedDivision={selectedDivision}
        setSelectedDivision={setSelectedDivision}
        selectedBatch={selectedBatch}
        setSelectedBatch={setSelectedBatch}
        onFetchAttendance={handleFetchAttendance}
      />
      <ShowReport attendance={attendance} loading={loading} error={error} />
    </div>
  );
}
