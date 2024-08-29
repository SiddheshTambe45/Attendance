import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for API calls
import { FaFileCsv, FaFileExcel, FaPencilAlt } from 'react-icons/fa'; // Import CSV, Excel and Pencil icons
import './Styles/UploadCriteria.css'; // Import the CSS file
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { useSelector } from 'react-redux';
import axiosInstance from '../../../Utils/AxiosInstance';

const UploadStudents = () => {

  const { department } = useSelector((state)=> state.auth);
  // const hodDepartment = department;

  const hodDepartment= "FIRST_YEAR";

  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('');
  const [semesterOptions, setSemesterOptions] = useState([]);
  const [divisionOptions, setDivisionOptions] = useState([]);
  const [error, setErrorMsg] = useState('');
  const [file, setFile] = useState(null);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetchSemestersAndDivisions();
  }, []);

  const fetchSemestersAndDivisions = async () => {
    try {
      // const response = await axios.get('http://localhost:4545/hod/getSemestersAndDivisions', { params: { department: hodDepartment },withCredentials: true });

      const response = await axiosInstance.get('/hod/getSemestersAndDivisions', { params: { department: hodDepartment }});
      setSemesterOptions(response.data.semesters);
      setDivisionOptions(response.data.divisions[response.data.semesters[0]]); // Assuming the first semester for initial load
    } catch (error) {
      setErrorMsg('Error fetching criteria data');
    }
  };

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      const fileExtension = uploadedFile.name.split('.').pop();
      if (fileExtension !== 'csv' && fileExtension !== 'xlsx') {
        setErrorMsg('Please upload a valid CSV or XLSX file.');
        setFile(null);
      } else {
        setErrorMsg('');
        setFile(uploadedFile);
        processFile(uploadedFile);
      }
    }
  };

  const processFile = (uploadedFile) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      let workbook;
      
      if (uploadedFile.name.endsWith('.csv')) {
        // Handle CSV files
        const csvData = data.split('\n').map(row => row.split(','));
        workbook = {
          SheetNames: ['Sheet1'],
          Sheets: {
            'Sheet1': XLSX.utils.aoa_to_sheet(csvData)
          }
        };
      } else {
        // Handle XLSX files
        workbook = XLSX.read(data, { type: 'array' });
      }
  
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  
      // Validate columns
      if (validateColumns(json)) {
        setTableData(json);
      } else {
        setErrorMsg('Uploaded file does not have the required columns: PRN, Student Name, Batch, DLOA Subject.');
        setFile(null);
      }
    };
  
    if (uploadedFile.name.endsWith('.csv')) {
      reader.readAsText(uploadedFile);
    } else {
      reader.readAsArrayBuffer(uploadedFile);
    }
  };
  
  

  const validateColumns = (json) => {
    const requiredColumns = ['PRN', 'Student Name', 'Batch'];
    if (parseInt(selectedSemester) >= 5) {
      requiredColumns.push('DLOA Subject');
    }
    const fileColumns = json[0];
    return requiredColumns.every((col) => fileColumns.includes(col));
  };

  const handleEdit = (rowIndex, colIndex, newValue) => {
    const updatedData = [...tableData];
    updatedData[rowIndex][colIndex] = newValue;
    setTableData(updatedData);
  };

  const handleSaveFile = () => {
    const worksheet = XLSX.utils.aoa_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });

    const s2ab = (s) => {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
      return buf;
    };

    const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
    saveAs(blob, 'edited_data.xlsx');
  };

  const handleSaveToBackend = async () => {
    try {
      const students = tableData.slice(1).map((row) => ({
        name: row[1],
        prn: row[0],
        batch: row[2],
        dlo: row[3] || null, // Handle DLOA Subject if exists
      }));

      const payload = {
        criteria: {
          semester: selectedSemester,
          division: selectedDivision,
          department: hodDepartment,
        },
        students,
      };

      // console.log(payload)
      // const response = await axios.post('http://localhost:4545/hod/addStudents', payload, { withCredentials: true });

      const response = await axiosInstance.post('/hod/addStudents', payload);
      alert(response.data.message);
    } catch (error) {
      setErrorMsg('Error saving data to the backend');
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col">
          <label htmlFor="semester" className="form-label">
            Semester:
          </label>
          <select
            className="form-select"
            id="semester"
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
          >
            <option value="">Select Semester</option>
            {semesterOptions.map((semester) => (
              <option key={semester} value={semester}>{`SEM ${semester}`}</option>
            ))}
          </select>
        </div>
        <div className="col">
          <label htmlFor="division" className="form-label">
            Division:
          </label>
          <select
            className="form-select"
            id="division"
            value={selectedDivision}
            onChange={(e) => setSelectedDivision(e.target.value)}
          >
            <option value="">Select Division</option>
            {divisionOptions.map((division) => (
              <option key={division} value={division}>
                {division}
              </option>
            ))}
          </select>
        </div>
        <div className="col upload-button-col">
          <div className="upload-button-container">
            <label htmlFor="fileUpload" className="upload-button">
              <FaFileCsv className="icon" />
              <FaFileExcel className="icon" />
              Upload CSV or XLSX
            </label>
            <input
              type="file"
              id="fileUpload"
              accept=".csv, .xlsx" // Restrict file picker to CSV and XLSX files
              onChange={handleFileUpload}
              style={{ display: 'none' }} // Hide the native file input
            />
          </div>
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
      <div className="row mt-2">
        <div className="col">
          <button className="btn btn-primary" onClick={handleSaveFile}>
            Save File
          </button>
        </div>
        <div className="col">
          <button className="btn btn-success" onClick={handleSaveToBackend}>
            Save to Backend
          </button>
        </div>
      </div>
      {tableData.length > 0 && (
        <div className="row mt-4">
          <div className="col">
            <table className="table table-bordered">
              <thead>
                <tr>
                  {tableData[0].map((header, index) => (
                    <th key={index}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.slice(1).map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, colIndex) => (
                      <td key={colIndex}>
                        <div className="cell-content">
                          {cell}
                          <button
                            className="btn btn-sm btn-link"
                            onClick={() => {
                              const newValue = prompt('Edit Cell Value', cell);
                              if (newValue !== null) {
                                handleEdit(rowIndex + 1, colIndex, newValue);
                              }
                            }}
                          >
                            <FaPencilAlt />
                          </button>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadStudents;
