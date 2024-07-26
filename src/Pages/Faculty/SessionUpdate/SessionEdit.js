import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

export default function SessionEdit() {
  //const { year, branch, subject, sessionTiming } = useParams();

  const location = useLocation();
  const { year, branch, subject, sessionTiming } = location.state || {};

  const [attendanceRecords, setAttendanceRecords] = useState([
    {
      prn: "1234567890",
      name: "John Doe",
      lecture: 1,
    },
    {
      prn: "0987654321",
      name: "Jane Smith",
      lecture: 0,
    },
    {
      prn: "1122334455",
      name: "Alice Johnson",
      lecture: 1,
    },
    {
      prn: "11223344554",
      name: "Bob Martin",
      lecture: 1,
    },
    {
      prn: "9876543210",
      name: "David Lee",
      lecture: 0,
    },
    {
      prn: "3344556677",
      name: "Michael Brown",
      lecture: 1,
    },
    {
      prn: "8899001122",
      name: "Emily Garcia",
      lecture: 0,
    },
    {
      prn: "5566778899",
      name: "Olivia Jones",
      lecture: 1,
    },
    {
      prn: "1212334456",
      name: "William Miller",
      lecture: 1,
    },
    {
      prn: "7788990011",
      name: "Sophia Hernandez",
      lecture: 0,
    },
    {
      prn: "2233445566",
      name: "Charles Davis",
      lecture: 1,
    },
    {
      prn: "4455667788",
      name: "Isabella Garcia",
      lecture: 1,
    },
  ]);

  const handleAttendanceChange = (studentIndex, isChecked) => {
    const updatedAttendance = [...attendanceRecords];
    updatedAttendance[studentIndex] = {
      ...updatedAttendance[studentIndex],
      lecture: isChecked ? 1 : 0, // Assuming 'lecture' field denotes attendance status
    };
    setAttendanceRecords(updatedAttendance);
  };

  const handleSubmit = async () => {
    // Simulated API call to update attendance records
    try {
      // Simulate success
      alert('Attendance records updated successfully!');
    } catch (error) {
      // Simulate error
      alert(`Failed to update attendance: ${error.message}`);
    }
  };

  return (
    <div>
      <div className="container">
        <h2>
          Date: {sessionTiming}
        </h2>
        <h2>
          Edit Attendance for {year} - {branch} - {subject}
        </h2>

        <div className="table-responsive">
          <table className="table table-bordered mb-0">
            <thead>
              <tr>
                <th scope="col">Student PRN</th>
                <th scope="col">Name</th>
                <th scope="col">Today's Attendance</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.map((student, index) => (
                <tr key={student.prn}>
                  <td>{student.prn}</td>
                  <td>{student.name}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={student.lecture === 1}
                      onChange={(e) =>
                        handleAttendanceChange(index, e.target.checked)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button className="btn btn-primary mt-3" onClick={handleSubmit}>
          Submit Attendance
        </button>
      </div>
    </div>
  );
}
