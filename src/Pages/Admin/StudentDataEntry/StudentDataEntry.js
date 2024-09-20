// import React, { useState } from 'react';
// import * as XLSX from 'xlsx';

// const StudentDataEntry = () => {
//     const [branch, setBranch] = useState('');
//     const [division, setDivision] = useState('');
//     const [semester, setSemester] = useState('');
//     const [students, setStudents] = useState([]);

//     const branches = ['Computer Engineering', 'Information Technology', 'Mechanical Engineering'];
//     const divisions = ['Division A', 'Division B', 'Division C'];
//     const semesters = ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4'];

//     const handleFileUpload = (e) => {
//         const file = e.target.files[0];
//         const reader = new FileReader();
//         reader.onload = (event) => {
//             const data = new Uint8Array(event.target.result);
//             const workbook = XLSX.read(data, { type: 'array' });
//             const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
//             const jsonData = XLSX.utils.sheet_to_json(firstSheet);
//             setStudents(jsonData);
//         };
//         reader.readAsArrayBuffer(file);
//     };

//     const handleStudentEdit = (index, key, value) => {
//         const updatedStudents = students.map((student, i) => {
//             if (i === index) {
//                 return { ...student, [key]: value };
//             }
//             return student;
//         });
//         setStudents(updatedStudents);
//     };

//     const handleSubmit = () => {
//         const data = { branch, division, semester, students };
//         // Submit data to backend here
//         console.log(data);
//     };

//     return (
//         <div className="container mt-4">
//             <h2>Student Data Entry</h2>
//             <div className="row mb-3">
//                 <div className="col">
//                     <label>Branch</label>
//                     <select className="form-select" value={branch} onChange={e => setBranch(e.target.value)}>
//                         <option value="">Select Branch</option>
//                         {branches.map((branch, index) => (
//                             <option key={index} value={branch}>{branch}</option>
//                         ))}
//                     </select>
//                 </div>
//                 <div className="col">
//                     <label>Division</label>
//                     <select className="form-select" value={division} onChange={e => setDivision(e.target.value)}>
//                         <option value="">Select Division</option>
//                         {divisions.map((div, index) => (
//                             <option key={index} value={div}>{div}</option>
//                         ))}
//                     </select>
//                 </div>
//                 <div className="col">
//                     <label>Semester</label>
//                     <select className="form-select" value={semester} onChange={e => setSemester(e.target.value)}>
//                         <option value="">Select Semester</option>
//                         {semesters.map((sem, index) => (
//                             <option key={index} value={sem}>{sem}</option>
//                         ))}
//                     </select>
//                 </div>
//             </div>

//             <div className="mb-3">
//                 <label>Upload Student List (Excel)</label>
//                 <input type="file" className="form-control" onChange={handleFileUpload} />
//             </div>

//             {students.length > 0 && (
//                 <>
//                     <h4>Student List</h4>
//                     <table className="table table-bordered">
//                         <thead>
//                             <tr>
//                                 <th>PRN</th>
//                                 <th>Name</th>
//                                 <th>Batch</th>
//                                 <th>Edit</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {students.map((student, index) => (
//                                 <tr key={index}>
//                                     <td>
//                                         <input
//                                             type="text"
//                                             className="form-control"
//                                             value={student.PRN}
//                                             onChange={(e) => handleStudentEdit(index, 'PRN', e.target.value)}
//                                         />
//                                     </td>
//                                     <td>
//                                         <input
//                                             type="text"
//                                             className="form-control"
//                                             value={student.Name}
//                                             onChange={(e) => handleStudentEdit(index, 'Name', e.target.value)}
//                                         />
//                                     </td>
//                                     <td>
//                                         <input
//                                             type="text"
//                                             className="form-control"
//                                             value={student.Batch}
//                                             onChange={(e) => handleStudentEdit(index, 'Batch', e.target.value)}
//                                         />
//                                     </td>
//                                     <td>
//                                         <button className="btn btn-danger" onClick={() => setStudents(students.filter((_, i) => i !== index))}>
//                                             Delete
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                     <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
//                 </>
//             )}
//         </div>
//     );
// };

// export default StudentDataEntry;



import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import axiosInstance from '../../../Utils/AxiosInstance';

const StudentDataEntry = () => {
    const [branch, setBranch] = useState('');
    const [division, setDivision] = useState('');
    const [students, setStudents] = useState([]);
    const [branches, setBranches] = useState([]);
    const [divisions, setDivisions] = useState([]); // State for divisions
    const [allDivisions, setAllDivisions] = useState({}); // Store divisions by branch
    const [semester, setSemester] = useState(1); // Default semester is 1

    useEffect(() => {
        const fetchCriteriaData = async () => {
            try {
                const response = await axiosInstance.get('/admin/getBranchDivisionSemesterData');
                const criteriaData = response.data;
                
                // Create an object to store divisions by branch
                const branchDivisions = {};
                criteriaData.forEach(({ branch, division }) => {
                    branchDivisions[branch] = division; // Directly map branch to divisions
                });

                setAllDivisions(branchDivisions); // Save all divisions
                setBranches(Object.keys(branchDivisions)); // Set branches
            } catch (error) {
                console.error('Error fetching criteria data:', error);
            }
        };

        fetchCriteriaData();
    }, []);

    useEffect(() => {
        if (branch) {
            setDivision(''); // Reset division when branch changes
            setDivisions(allDivisions[branch] || []); // Set divisions based on selected branch
        } else {
            setDivisions([]);
        }
    }, [branch, allDivisions]);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
    const allowedTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];

    if (file && allowedTypes.includes(file.type)) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(firstSheet);
            setStudents(jsonData);
        };
        reader.readAsArrayBuffer(file);
    } else {
        alert('Please upload a valid Excel file.');
        // Clear the file input
        e.target.value = '';
    }
    };

    const handleStudentEdit = (index, key, value) => {
        const updatedStudents = students.map((student, i) => {
            if (i === index) {
                return { ...student, [key]: value };
            }
            return student;
        });
        setStudents(updatedStudents);
    };

    const handleSubmit = async () => {
        // Prepare students data in the required format
        const formattedStudents = students.map(student => ({
            PRN: student.PRN,
            Name: student.Name,
            Batch: student.Batch
        }));
    
        const data = {
            branch,
            division,
            semester,
            students: formattedStudents
        };
    
        try {
            const response = await axiosInstance.post('/admin/addStudents', data);
            console.log(response.data);
            alert("Students Data added successfully.")

            // Reset states to default values
            setBranch('');
            setDivision('');
            setStudents([]);
            document.getElementById('studentDataUploadInput').value = ''; // Clear the file input


        } catch (error) {
            console.error('Error submitting student data:', error);
        }
    };
    

    const generateExcelTemplate = () => {
        const worksheet = XLSX.utils.json_to_sheet([
            { PRN: '', Name: '', Batch: '' } // Define the headers and an example row
        ]);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'StudentData');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'StudentDataTemplate.xlsx';
        link.click();
    };

    return (
        <div className='StudentsDataEntry' id='StudentsDataEntry'>
        <div className="container mt-4">
            <h2>Student Data Entry</h2>
            <div className="row mb-3">
                <div className="col">
                    <label>Branch</label>
                    <select className="form-select" value={branch} onChange={e => setBranch(e.target.value)}>
                        <option value="">Select Branch</option>
                        {branches.map((branch, index) => (
                            <option key={index} value={branch}>{branch}</option>
                        ))}
                    </select>
                </div>
                <div className="col">
                    <label>Division</label>
                    <select className="form-select" value={division} onChange={e => setDivision(e.target.value)} disabled={!branch}>
                        <option value="">Select Division</option>
                        {divisions.map((div, index) => (
                            <option key={index} value={div}>{div}</option>
                        ))}
                    </select>
                </div>
                <div className="col d-flex justify-content-end align-items-end">
                <button className="btn btn-primary" onClick={generateExcelTemplate}>
                    Download Excel Template
                </button>
                </div>
            </div>

            <div className="mb-3">
                <label className='shadow-none p-0'>Upload Student List (Excel)</label>
                <input type="file" className="form-control shadow-none p-2" id="studentDataUploadInput" onChange={handleFileUpload} />
            </div>

            {/*
            {students.length > 0 && (
                <>
                    <h4>Student List</h4>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>PRN</th>
                                <th>Name</th>
                                <th>Batch</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student, index) => (
                                <tr key={index}>
                                    <td>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={student.PRN}
                                            onChange={(e) => handleStudentEdit(index, 'PRN', e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={student.Name}
                                            onChange={(e) => handleStudentEdit(index, 'Name', e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={student.Batch}
                                            onChange={(e) => handleStudentEdit(index, 'Batch', e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => setStudents(students.filter((_, i) => i !== index))}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                </>
            )}
            */}

{students.length > 0 ? (
                <>
                    <h4>Student List</h4>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>PRN</th>
                                <th>Name</th>
                                <th>Batch</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student, index) => (
                                <tr key={index}>
                                    <td>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={student.PRN}
                                            onChange={(e) => handleStudentEdit(index, 'PRN', e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={student.Name}
                                            onChange={(e) => handleStudentEdit(index, 'Name', e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={student.Batch}
                                            onChange={(e) => handleStudentEdit(index, 'Batch', e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => setStudents(students.filter((_, i) => i !== index))}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                </>
            ) : (
                <div className='d-flex justify-content-center py-4'>
                    <p className='text-secondary' style={{ fontSize: '2rem' }}>
                        No file uploaded to display students.
                    </p>
                </div>    
            )}
        </div>
        </div>
    );
};

export default StudentDataEntry;
