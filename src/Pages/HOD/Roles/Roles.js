// import React, { useState, useEffect } from 'react';
// import './styles/Roles.css';
// import { BsPlus, BsPencil, BsDash } from 'react-icons/bs';
// import { useSelector } from 'react-redux';

// const Roles = () => {
//   const { department } = useSelector((state) => state.auth); // This is your department
//   const hodDepartment = department;

//   const [selectedBranch, setSelectedBranch] = useState('');
//   const [currentSemester, setCurrentSemester] = useState('');
//   const [roles, setRoles] = useState([]); // State for roles
//   const [teachers, setTeachers] = useState([]);
//   const [selectedDivision, setSelectedDivision] = useState('');
//   const [selectedBatch, setSelectedBatch] = useState('');
//   const [selectedOptions, setSelectedOptions] = useState({}); // Faculty assignment options
//   const [divisions, setDivisions] = useState({});
//   const [batches, setBatches] = useState({});
//   const [semesters, setSemesters] = useState([]);
//   const [departments, setDepartments] = useState([]); // State for departments

//   // Modal state
//   const [showModal, setShowModal] = useState(false);
//   const [newRole, setNewRole] = useState({ name: '', isNew: true });
//   const [editRole, setEditRole] = useState({ name: '', isNew: false });
//   const [editRoleIndex, setEditRoleIndex] = useState(null);

//   useEffect(() => {



//     // Dummy data for semesters, divisions, batches, and departments
//     setSemesters(['1', '2', '3', '4', '5', '6', '7', '8']);
//     setDivisions({
//       '1': ['A', 'B'],
//       '2': ['A', 'B'],
//       '3': ['A', 'B'],
//       '4': ['A', 'B'],
//       '5': ['A', 'B'],
//       '6': ['A', 'B'],
//       '7': ['A', 'B'],
//       '8': ['A', 'B']
//     });
//     setBatches({
//       '1': { 'A': ['Batch 1', 'Batch 2'], 'B': ['Batch 1', 'Batch 2'] },
//       '2': { 'A': ['Batch 1', 'Batch 2'], 'B': ['Batch 1', 'Batch 2'] },
//       '3': { 'A': ['Batch 1', 'Batch 2'], 'B': ['Batch 1', 'Batch 2'] },
//       '4': { 'A': ['Batch 1', 'Batch 2'], 'B': ['Batch 1', 'Batch 2'] },
//       '5': { 'A': ['Batch 1', 'Batch 2'], 'B': ['Batch 1', 'Batch 2'] },
//       '6': { 'A': ['Batch 1', 'Batch 2'], 'B': ['Batch 1', 'Batch 2'] },
//       '7': { 'A': ['Batch 1', 'Batch 2'], 'B': ['Batch 1', 'Batch 2'] },
//       '8': { 'A': ['Batch 1', 'Batch 2'], 'B': ['Batch 1', 'Batch 2'] }
//     });
//     setDepartments(['Department 1', 'Department 2', 'Department 3']);
//     setTeachers([
//       { FACULTY_ID: '1', FACULTY_NAME: 'Teacher 1', assignedRoles: [] },
//       { FACULTY_ID: '2', FACULTY_NAME: 'Teacher 2', assignedRoles: [] },
//       { FACULTY_ID: '3', FACULTY_NAME: 'Teacher 3', assignedRoles: [] }
//     ]);
//   }, []);

//   const handleAddRole = () => {
//     setShowModal(true);
//     setNewRole({ name: '', isNew: true });
//     setEditRoleIndex(null);
//   };

//   const handleSaveRole = () => {
//     if (newRole.name) {
//       setRoles((prevRoles) => [
//         ...prevRoles,
//         {
//           ROLE_NAME: newRole.name.toUpperCase(),
//           isNew: true
//         }
//       ]);
//       setShowModal(false);
//     }
//   };

//   const handleRemoveRole = (roleName) => {
//     if (window.confirm('Are you sure you want to remove this role?')) {
//       setRoles((prevRoles) => prevRoles.filter(role => role.ROLE_NAME !== roleName));
//     }
//   };

//   const handleEditRole = (index) => {
//     const role = roles[index];
//     if (role) {
//       setEditRoleIndex(index);
//       setEditRole({
//         name: role.ROLE_NAME || '',
//         isNew: role.isNew,
//         originalName: role.ROLE_NAME
//       });
//       setShowModal(true);
//     }
//   };

//   const handleSaveEditRole = () => {
//     if (editRole.name && editRoleIndex !== null) {
//       setRoles((prevRoles) =>
//         prevRoles.map((role, index) =>
//           index === editRoleIndex ? {
//             ROLE_NAME: editRole.name.toUpperCase(),
//             isNew: editRole.isNew
//           } : role
//         )
//       );
//       setEditRoleIndex(null);
//       setShowModal(false);
//     }
//   };

//   const handleTeacherRoleChange = (facultyId, role) => {
//     setSelectedOptions((prevOptions) => ({
//       ...prevOptions,
//       [facultyId]: role
//     }));
//   };

//   const handleApplyRole = (facultyId) => {
//     const assignedRole = selectedOptions[facultyId];
//     if (assignedRole) {
//       setTeachers((prevTeachers) =>
//         prevTeachers.map((teacher) =>
//           teacher.FACULTY_ID === facultyId
//             ? {
//                 ...teacher,
//                 assignedRoles: teacher.assignedRoles ? [...teacher.assignedRoles, assignedRole] : [assignedRole]
//               }
//             : teacher
//         )
//       );
//       setSelectedOptions((prevOptions) => ({
//         ...prevOptions,
//         [facultyId]: ''
//       }));
//     }
//     console.log(`Role ${assignedRole} assigned to faculty ${facultyId}`);
//     alert(`Role ${assignedRole} assigned to faculty ${facultyId}`);
//   };

//   const handleRemoveFacultyRole = (facultyId, roleToRemove) => {
//     setTeachers((prevTeachers) =>
//       prevTeachers.map((teacher) =>
//         teacher.FACULTY_ID === facultyId
//           ? {
//               ...teacher,
//               assignedRoles: teacher.assignedRoles.filter((role) => role !== roleToRemove)
//             }
//           : teacher
//       )
//     );
//   };

//   const applyChanges = async () => {
//     try {
//       const dataToSend = teachers.map((teacher) => ({
//         faculty_id: teacher.FACULTY_ID,
//         faculty_name: teacher.FACULTY_NAME,
//         roles: teacher.assignedRoles || [],
//       })).filter(item => item.roles.length > 0);

//       console.log(dataToSend);
//       alert('Changes applied successfully');
//       resetForm();
//     } catch (error) {
//       console.error('Error applying changes:', error);
//       alert('Failed to apply changes.');
//     }
//   };

//   const resetForm = () => {
//     setSelectedBranch('');
//     setSelectedBatch('');
//     setCurrentSemester('');
//     setSelectedDivision('');
//     setRoles([]);
//     setTeachers([]);
//     setSelectedOptions({});
//   };

//   // Filtering divisions based on the selected semester
//   const filteredDivisions = currentSemester ? (divisions[currentSemester] || []) : [];

//   // Filtering batches based on the selected division and semester
//   const filteredBatches = currentSemester && selectedDivision ? (batches[currentSemester]?.[selectedDivision] || []) : [];

//   return (
//     <div className="container mt-5">
//       <h1 className="mb-4 text-center">Department Allocation</h1>
//       <div className="row mb-3">
//         <div className="col-12 col-md-3">
//           <label htmlFor="departmentSelect" className="form-label">Select Department:</label>
//           <select
//             id="departmentSelect"
//             className="form-select"
//             value={selectedBranch}
//             onChange={(e) => setSelectedBranch(e.target.value)}
//           >
//             <option value="">Select Department</option>
//             {departments.map((department) => (
//               <option key={department} value={department}>{department}</option>
//             ))}
//           </select>
//         </div>

//         <div className="col-12 col-md-3">
//           <label htmlFor="semesterSelect" className="form-label">Select Semester:</label>
//           <select
//             id="semesterSelect"
//             className="form-select"
//             value={currentSemester}
//             onChange={(e) => setCurrentSemester(e.target.value)}
//           >
//             <option value="">Select Semester</option>
//             {semesters.map((semester) => (
//               <option key={semester} value={semester}>{semester}</option>
//             ))}
//           </select>
//         </div>

//         <div className="col-12 col-md-3">
//           <label htmlFor="divisionSelect" className="form-label">Select Division:</label>
//           <select
//             id="divisionSelect"
//             className="form-select"
//             value={selectedDivision}
//             onChange={(e) => setSelectedDivision(e.target.value)}
//           >
//             <option value="">Select Division</option>
//             {filteredDivisions.map((division) => (
//               <option key={division} value={division}>{division}</option>
//             ))}
//           </select>
//         </div>

//         <div className="col-12 col-md-3">
//           <label htmlFor="batchSelect" className="form-label">Select Batch:</label>
//           <select
//             id="batchSelect"
//             className="form-select"
//             value={selectedBatch}
//             onChange={(e) => setSelectedBatch(e.target.value)}
//           >
//             <option value="">Select Batch</option>
//             {filteredBatches.map((batch) => (
//               <option key={batch} value={batch}>{batch}</option>
//             ))}
//           </select>
//         </div>
//       </div>

//       <div className="mb-3 d-flex justify-content-between align-items-center">
//         <button className="btn btn-success" onClick={handleAddRole}>
//           <BsPlus /> Add New Role
//         </button>
//         <div>
//           <button className="btn btn-primary mr-2" onClick={() => alert('Data fetched successfully')}>Get Data</button>
//           <button className="btn btn-secondary mr-2" onClick={() => alert('Faculty fetched by department')}>Fetch Faculty by Department</button>
//         </div>
//       </div>

//       <table className="table table-bordered">
//         <thead>
//           <tr>
//             <th>Faculty ID</th>
//             <th>Faculty Name</th>
//             <th>Assigned Roles</th>
//             <th>Role</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {teachers.map((teacher) => (
//             <tr key={teacher.FACULTY_ID}>
//               <td>{teacher.FACULTY_ID}</td>
//               <td>{teacher.FACULTY_NAME}</td>
//               <td>
//                 {(teacher.assignedRoles || []).map((role, index) => (
//                   <div key={index} className="role-item">
//                     <span>{role}</span>
//                     <button
//                       type="button"
//                       className="btn btn-sm btn-danger ml-1"
//                       onClick={() => handleRemoveFacultyRole(teacher.FACULTY_ID, role)}
//                     >
//                       <BsDash />
//                     </button>
//                   </div>
//                 ))}
//               </td>
//               <td>
//                 <select
//                   value={selectedOptions[teacher.FACULTY_ID] || ''}
//                   onChange={(e) => handleTeacherRoleChange(teacher.FACULTY_ID, e.target.value)}
//                 >
//                   <option value="">Select Role</option>
//                   {roles.filter(role => !(teacher.assignedRoles || []).includes(role.ROLE_NAME)).map((role) => (
//                     <option key={role.ROLE_NAME} value={role.ROLE_NAME}>{role.ROLE_NAME}</option>
//                   ))}
//                 </select>
//               </td>
//               <td>
//                 <button
//                   className="btn btn-sm btn-primary"
//                   onClick={() => handleApplyRole(teacher.FACULTY_ID)}
//                 >
//                   Apply
//                 </button>
//                 {selectedOptions[teacher.FACULTY_ID] && (
//                   <button
//                     className="btn btn-sm btn-outline-danger ml-2"
//                     onClick={() => handleTeacherRoleChange(teacher.FACULTY_ID, '')}
//                   >
//                     <BsDash />
//                   </button>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {showModal && (
//         <div className="modal fade show" style={{ display: 'block' }} role="dialog">
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">{newRole.isNew ? 'Add New Role' : 'Edit Role'}</h5>
//                 <button type="button" className="close" onClick={() => setShowModal(false)}>&times;</button>
//               </div>
//               <div className="modal-body">
//                 <div className="form-group">
//                   <label htmlFor="roleName">Role Name:</label>
//                   <input
//                     type="text"
//                     id="roleName"
//                     className="form-control"
//                     value={newRole.name}
//                     onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
//                   />
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
//                 {newRole.isNew ? (
//                   <button type="button" className="btn btn-primary" onClick={handleSaveRole}>Save</button>
//                 ) : (
//                   <button type="button" className="btn btn-primary" onClick={handleSaveEditRole}>Save Changes</button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="text-center mt-4">
//         <button className="btn btn-primary" onClick={applyChanges}>Apply Changes</button>
//         <button className="btn btn-secondary ml-2" onClick={resetForm}>Reset</button>
//       </div>
//     </div>
//   );
// };

// export default Roles;




// import React, { useState, useEffect } from 'react';
// import './styles/Roles.css';
// import { BsPlus, BsPencil, BsDash } from 'react-icons/bs';
// import { useSelector } from 'react-redux';
// import axios from 'axios';

// const Roles = () => {
//   const { department } = useSelector((state) => state.auth); // This is your department

//   const [selectedBranch, setSelectedBranch] = useState('');
//   const [currentSemester, setCurrentSemester] = useState('');
//   const [roles, setRoles] = useState([]);
//   const [teachers, setTeachers] = useState([]);
//   const [selectedDivision, setSelectedDivision] = useState('');
//   const [selectedBatch, setSelectedBatch] = useState('');
//   const [selectedOptions, setSelectedOptions] = useState({});
//   const [divisions, setDivisions] = useState({});
//   const [batches, setBatches] = useState({});
//   const [semesters, setSemesters] = useState([]);
//   const [departments, setDepartments] = useState([]);

//   // Modal state
//   const [showModal, setShowModal] = useState(false);
//   const [newRole, setNewRole] = useState({ name: '', isNew: true });
//   const [editRole, setEditRole] = useState({ name: '', isNew: false });
//   const [editRoleIndex, setEditRoleIndex] = useState(null);

//   useEffect(() => {
//     // Fetch data from API
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('/api/initial-data');
//         const { semesters, divisions, batches, departments, teachers, roles } = response.data;

//         setSemesters(semesters);
//         setDivisions(divisions);
//         setBatches(batches);
//         setDepartments(departments);
//         setTeachers(teachers);
//         setRoles(roles);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleAddRole = () => {
//     setShowModal(true);
//     setNewRole({ name: '', isNew: true });
//     setEditRoleIndex(null);
//   };

//   const handleSaveRole = () => {
//     if (newRole.name) {
//       setRoles((prevRoles) => [
//         ...prevRoles,
//         {
//           ROLE_NAME: newRole.name.toUpperCase(),
//           isNew: true
//         }
//       ]);
//       setShowModal(false);
//     }
//   };

//   const handleRemoveRole = (roleName) => {
//     if (window.confirm('Are you sure you want to remove this role?')) {
//       setRoles((prevRoles) => prevRoles.filter(role => role.ROLE_NAME !== roleName));
//     }
//   };

//   const handleEditRole = (index) => {
//     const role = roles[index];
//     if (role) {
//       setEditRoleIndex(index);
//       setEditRole({
//         name: role.ROLE_NAME || '',
//         isNew: role.isNew,
//         originalName: role.ROLE_NAME
//       });
//       setShowModal(true);
//     }
//   };

//   const handleSaveEditRole = () => {
//     if (editRole.name && editRoleIndex !== null) {
//       setRoles((prevRoles) =>
//         prevRoles.map((role, index) =>
//           index === editRoleIndex ? {
//             ROLE_NAME: editRole.name.toUpperCase(),
//             isNew: editRole.isNew
//           } : role
//         )
//       );
//       setEditRoleIndex(null);
//       setShowModal(false);
//     }
//   };

//   const handleTeacherRoleChange = (facultyId, role) => {
//     setSelectedOptions((prevOptions) => ({
//       ...prevOptions,
//       [facultyId]: role
//     }));
//   };

//   const handleApplyRole = (facultyId) => {
//     const assignedRole = selectedOptions[facultyId];
//     if (assignedRole) {
//       setTeachers((prevTeachers) =>
//         prevTeachers.map((teacher) =>
//           teacher.FACULTY_ID === facultyId
//             ? {
//                 ...teacher,
//                 assignedRoles: teacher.assignedRoles ? [...teacher.assignedRoles, assignedRole] : [assignedRole]
//               }
//             : teacher
//         )
//       );
//       setSelectedOptions((prevOptions) => ({
//         ...prevOptions,
//         [facultyId]: ''
//       }));
//     }
//     console.log(`Role ${assignedRole} assigned to faculty ${facultyId}`);
//     alert(`Role ${assignedRole} assigned to faculty ${facultyId}`);
//   };

//   const handleRemoveFacultyRole = (facultyId, roleToRemove) => {
//     setTeachers((prevTeachers) =>
//       prevTeachers.map((teacher) =>
//         teacher.FACULTY_ID === facultyId
//           ? {
//               ...teacher,
//               assignedRoles: teacher.assignedRoles.filter((role) => role !== roleToRemove)
//             }
//           : teacher
//       )
//     );
//   };

//   const applyChanges = async () => {
//     try {
//       const dataToSend = teachers.map((teacher) => ({
//         faculty_id: teacher.FACULTY_ID,
//         faculty_name: teacher.FACULTY_NAME,
//         roles: teacher.assignedRoles || [],
//       })).filter(item => item.roles.length > 0);

//       await axios.post('/api/apply-changes', dataToSend);
//       alert('Changes applied successfully');
//       resetForm();
//     } catch (error) {
//       console.error('Error applying changes:', error);
//       alert('Failed to apply changes.');
//     }
//   };

//   const resetForm = () => {
//     setSelectedBranch('');
//     setSelectedBatch('');
//     setCurrentSemester('');
//     setSelectedDivision('');
//     setRoles([]);
//     setTeachers([]);
//     setSelectedOptions({});
//   };

//   // Filtering divisions based on the selected semester
//   const filteredDivisions = currentSemester ? (divisions[currentSemester] || []) : [];

//   // Filtering batches based on the selected division and semester
//   const filteredBatches = currentSemester && selectedDivision ? (batches[currentSemester]?.[selectedDivision] || []) : [];

//   return (
//     <div className="container mt-5">
//       <h1 className="mb-4 text-center">Department Allocation</h1>
//       <div className="row mb-3">
//         <div className="col-12 col-md-3">
//           <label htmlFor="departmentSelect" className="form-label">Select Department:</label>
//           <select
//             id="departmentSelect"
//             className="form-select"
//             value={selectedBranch}
//             onChange={(e) => setSelectedBranch(e.target.value)}
//           >
//             <option value="">Select Department</option>
//             {departments.map((department) => (
//               <option key={department} value={department}>{department}</option>
//             ))}
//           </select>
//         </div>

//         <div className="col-12 col-md-3">
//           <label htmlFor="semesterSelect" className="form-label">Select Semester:</label>
//           <select
//             id="semesterSelect"
//             className="form-select"
//             value={currentSemester}
//             onChange={(e) => setCurrentSemester(e.target.value)}
//           >
//             <option value="">Select Semester</option>
//             {semesters.map((semester) => (
//               <option key={semester} value={semester}>{semester}</option>
//             ))}
//           </select>
//         </div>

//         <div className="col-12 col-md-3">
//           <label htmlFor="divisionSelect" className="form-label">Select Division:</label>
//           <select
//             id="divisionSelect"
//             className="form-select"
//             value={selectedDivision}
//             onChange={(e) => setSelectedDivision(e.target.value)}
//           >
//             <option value="">Select Division</option>
//             {filteredDivisions.map((division) => (
//               <option key={division} value={division}>{division}</option>
//             ))}
//           </select>
//         </div>

//         <div className="col-12 col-md-3">
//           <label htmlFor="batchSelect" className="form-label">Select Batch:</label>
//           <select
//             id="batchSelect"
//             className="form-select"
//             value={selectedBatch}
//             onChange={(e) => setSelectedBatch(e.target.value)}
//           >
//             <option value="">Select Batch</option>
//             {filteredBatches.map((batch) => (
//               <option key={batch} value={batch}>{batch}</option>
//             ))}
//           </select>
//         </div>
//       </div>

//       <div className="mb-3 d-flex justify-content-between align-items-center">
//         <button className="btn btn-success" onClick={handleAddRole}>
//           <BsPlus /> Add New Role
//         </button>
//         <div>
//           <button className="btn btn-primary mr-2" onClick={() => alert('Data fetched successfully')}>Get Data</button>
//           <button className="btn btn-secondary mr-2" onClick={() => alert('Faculty fetched by department')}>Fetch Faculty by Department</button>
//         </div>
//       </div>

//       <table className="table table-bordered">
//         <thead>
//           <tr>
//             <th>Faculty ID</th>
//             <th>Faculty Name</th>
//             <th>Assigned Roles</th>
//             <th>Role</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {teachers.map((teacher) => (
//             <tr key={teacher.FACULTY_ID}>
//               <td>{teacher.FACULTY_ID}</td>
//               <td>{teacher.FACULTY_NAME}</td>
//               <td>
//                 {teacher.assignedRoles && teacher.assignedRoles.length > 0 ? (
//                   <ul>
//                     {teacher.assignedRoles.map((role, idx) => (
//                       <li key={idx}>
//                         {role}
//                         <button className="btn btn-danger btn-sm ml-2" onClick={() => handleRemoveFacultyRole(teacher.FACULTY_ID, role)}>
//                           <BsDash />
//                         </button>
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   'No roles assigned'
//                 )}
//               </td>
//               <td>
//                 <select
//                   value={selectedOptions[teacher.FACULTY_ID] || ''}
//                   onChange={(e) => handleTeacherRoleChange(teacher.FACULTY_ID, e.target.value)}
//                 >
//                   <option value="">Select Role</option>
//                   {roles.map((role) => (
//                     <option key={role.ROLE_NAME} value={role.ROLE_NAME}>{role.ROLE_NAME}</option>
//                   ))}
//                 </select>
//                 <button className="btn btn-primary btn-sm ml-2" onClick={() => handleApplyRole(teacher.FACULTY_ID)}>
//                   Apply
//                 </button>
//               </td>
//               <td>
//                 <button className="btn btn-warning btn-sm" onClick={() => handleEditRole(teacher.FACULTY_ID)}>
//                   <BsPencil />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {showModal && (
//         <div className="modal" tabIndex="-1" style={{ display: 'block' }}>
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">{newRole.isNew ? 'Add New Role' : 'Edit Role'}</h5>
//                 <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
//               </div>
//               <div className="modal-body">
//                 <div className="mb-3">
//                   <label htmlFor="roleNameInput" className="form-label">Role Name:</label>
//                   <input
//                     type="text"
//                     id="roleNameInput"
//                     className="form-control"
//                     value={newRole.isNew ? newRole.name : editRole.name}
//                     onChange={(e) => newRole.isNew ? setNewRole({ ...newRole, name: e.target.value }) : setEditRole({ ...editRole, name: e.target.value })}
//                   />
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
//                 {newRole.isNew ? (
//                   <button type="button" className="btn btn-primary" onClick={handleSaveRole}>Save Role</button>
//                 ) : (
//                   <button type="button" className="btn btn-primary" onClick={handleSaveEditRole}>Save Changes</button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Roles;




// import React, { useState, useEffect } from 'react';
// import './styles/Roles.css';
// import { BsPlus, BsPencil, BsDash } from 'react-icons/bs';
// import { useSelector } from 'react-redux';
// import axios from 'axios';

// const Roles = () => {
//   const { department } = useSelector((state) => state.auth); // This is your department
//   const hodDepartment = department;

//   const [currentSemester, setCurrentSemester] = useState('');
//   const [roles, setRoles] = useState([]);
//   const [teachers, setTeachers] = useState([]);
//   const [selectedDivision, setSelectedDivision] = useState('');
//   const [selectedOptions, setSelectedOptions] = useState({});
//   const [divisions, setDivisions] = useState({});
//   const [semesters, setSemesters] = useState([]);

//   // Modal state
//   const [showModal, setShowModal] = useState(false);
//   const [newRole, setNewRole] = useState({ name: '', isNew: true });
//   const [editRole, setEditRole] = useState({ name: '', isNew: false });
//   const [editRoleIndex, setEditRoleIndex] = useState(null);

//   useEffect(() => {
//     // Fetch data from API
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('/api/initial-data', {
//           params: { department: hodDepartment },
//           withCredentials: true
//         });
//         const { semesters, divisions, teachers, roles } = response.data;

//         setSemesters(semesters);
//         setDivisions(divisions);
//         setTeachers(teachers);
//         setRoles(roles);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, [hodDepartment]);

//   const handleAddRole = () => {
//     setShowModal(true);
//     setNewRole({ name: '', isNew: true });
//     setEditRoleIndex(null);
//   };

//   const handleSaveRole = () => {
//     if (newRole.name) {
//       setRoles((prevRoles) => [
//         ...prevRoles,
//         {
//           ROLE_NAME: newRole.name.toUpperCase(),
//           isNew: true
//         }
//       ]);
//       setShowModal(false);
//     }
//   };

//   const handleRemoveRole = (roleName) => {
//     if (window.confirm('Are you sure you want to remove this role?')) {
//       setRoles((prevRoles) => prevRoles.filter(role => role.ROLE_NAME !== roleName));
//     }
//   };

//   const handleEditRole = (index) => {
//     const role = roles[index];
//     if (role) {
//       setEditRoleIndex(index);
//       setEditRole({
//         name: role.ROLE_NAME || '',
//         isNew: role.isNew,
//         originalName: role.ROLE_NAME
//       });
//       setShowModal(true);
//     }
//   };

//   const handleSaveEditRole = () => {
//     if (editRole.name && editRoleIndex !== null) {
//       setRoles((prevRoles) =>
//         prevRoles.map((role, index) =>
//           index === editRoleIndex ? {
//             ROLE_NAME: editRole.name.toUpperCase(),
//             isNew: editRole.isNew
//           } : role
//         )
//       );
//       setEditRoleIndex(null);
//       setShowModal(false);
//     }
//   };

//   const handleTeacherRoleChange = (facultyId, role) => {
//     setSelectedOptions((prevOptions) => ({
//       ...prevOptions,
//       [facultyId]: role
//     }));
//   };

//   const handleApplyRole = (facultyId) => {
//     const assignedRole = selectedOptions[facultyId];
//     if (assignedRole) {
//       setTeachers((prevTeachers) =>
//         prevTeachers.map((teacher) =>
//           teacher.FACULTY_ID === facultyId
//             ? {
//                 ...teacher,
//                 assignedRoles: teacher.assignedRoles ? [...teacher.assignedRoles, assignedRole] : [assignedRole]
//               }
//             : teacher
//         )
//       );
//       setSelectedOptions((prevOptions) => ({
//         ...prevOptions,
//         [facultyId]: ''
//       }));
//     }
//     console.log(`Role ${assignedRole} assigned to faculty ${facultyId}`);
//     alert(`Role ${assignedRole} assigned to faculty ${facultyId}`);
//   };

//   const handleRemoveFacultyRole = (facultyId, roleToRemove) => {
//     setTeachers((prevTeachers) =>
//       prevTeachers.map((teacher) =>
//         teacher.FACULTY_ID === facultyId
//           ? {
//               ...teacher,
//               assignedRoles: teacher.assignedRoles.filter((role) => role !== roleToRemove)
//             }
//           : teacher
//       )
//     );
//   };

//   const applyChanges = async () => {
//     try {
//       const dataToSend = teachers.map((teacher) => ({
//         faculty_id: teacher.FACULTY_ID,
//         faculty_name: teacher.FACULTY_NAME,
//         roles: teacher.assignedRoles || [],
//       })).filter(item => item.roles.length > 0);

//       await axios.post('/api/apply-changes', dataToSend);
//       alert('Changes applied successfully');
//       resetForm();
//     } catch (error) {
//       console.error('Error applying changes:', error);
//       alert('Failed to apply changes.');
//     }
//   };

//   const resetForm = () => {
//     setSelectedDivision('');
//     setCurrentSemester('');
//     setRoles([]);
//     setTeachers([]);
//     setSelectedOptions({});
//   };

//   // Filtering divisions based on the selected semester
//   const filteredDivisions = currentSemester ? (divisions[currentSemester] || []) : [];

//   return (
//     <div className="container mt-5">
//       <h1 className="mb-4 text-center">Department Allocation</h1>


//       <div className="row mb-3">
//         <div className='col-12 col-md-6 d-flex justify-content-center'><div className="col-12 col-md-6">
//           <label htmlFor="semesterSelect" className="form-label">Select Semester:</label>
//           <select
//             id="semesterSelect"
//             className="form-select"
//             value={currentSemester}
//             onChange={(e) => setCurrentSemester(e.target.value)}
//           >
//             <option value="">Select Semester</option>
//             {semesters.map((semester) => (
//               <option key={semester} value={semester}>{semester}</option>
//             ))}
//           </select>
//         </div>

//         <div className="col-12 col-md-6">
//           <label htmlFor="divisionSelect" className="form-label">Select Division:</label>
//           <select
//             id="divisionSelect"
//             className="form-select"
//             value={selectedDivision}
//             onChange={(e) => setSelectedDivision(e.target.value)}
//           >
//             <option value="">Select Division</option>
//             {filteredDivisions.map((division) => (
//               <option key={division} value={division}>{division}</option>
//             ))}
//           </select>
//         </div>
//         </div>
        

//         <div className='col-12 col-md-6 d-flex justify-content-around align-items-end'>
//             <div>
//             <button className="btn btn-success mx-2" onClick={handleAddRole}>
//               <BsPlus /> Add New Role
//             </button>
//             </div>
//             <div>
//               <button className="btn btn-primary mx-2" onClick={() => alert('Data fetched successfully')}>Get Data</button>
//             </div>
//       </div>
        

//       </div>

      

//       <table className="table table-bordered">
//         <thead>
//           <tr>
//             <th>Faculty ID</th>
//             <th>Faculty Name</th>
//             <th>Assigned Roles</th>
//             <th>Role</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {teachers.map((teacher) => (
//             <tr key={teacher.FACULTY_ID}>
//               <td>{teacher.FACULTY_ID}</td>
//               <td>{teacher.FACULTY_NAME}</td>
//               <td>
//                 {teacher.assignedRoles && teacher.assignedRoles.length > 0 ? (
//                   <ul>
//                     {teacher.assignedRoles.map((role, idx) => (
//                       <li key={idx}>
//                         {role}
//                         <button className="btn btn-danger btn-sm ml-2" onClick={() => handleRemoveFacultyRole(teacher.FACULTY_ID, role)}>
//                           <BsDash />
//                         </button>
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   'No roles assigned'
//                 )}
//               </td>
//               <td>
//                 <select
//                   value={selectedOptions[teacher.FACULTY_ID] || ''}
//                   onChange={(e) => handleTeacherRoleChange(teacher.FACULTY_ID, e.target.value)}
//                 >
//                   <option value="">Select Role</option>
//                   {roles.map((role) => (
//                     <option key={role.ROLE_NAME} value={role.ROLE_NAME}>{role.ROLE_NAME}</option>
//                   ))}
//                 </select>
//                 <button className="btn btn-primary btn-sm ml-2" onClick={() => handleApplyRole(teacher.FACULTY_ID)}>
//                   Apply
//                 </button>
//               </td>
//               <td>
//                 <button className="btn btn-warning btn-sm" onClick={() => handleEditRole(teacher.FACULTY_ID)}>
//                   <BsPencil />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {showModal && (
//         <div className="modal" tabIndex="-1" style={{ display: 'block' }}>
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">{newRole.isNew ? 'Add New Role' : 'Edit Role'}</h5>
//                 <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
//               </div>
//               <div className="modal-body">
//                 <div className="mb-3">
//                   <label htmlFor="roleName" className="form-label">Role Name:</label>
//                   <input
//                     type="text"
//                     id="roleName"
//                     className="form-control"
//                     value={newRole.isNew ? newRole.name : editRole.name}
//                     onChange={(e) => {
//                       if (newRole.isNew) {
//                         setNewRole({ ...newRole, name: e.target.value });
//                       } else {
//                         setEditRole({ ...editRole, name: e.target.value });
//                       }
//                     }}
//                   />
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 {newRole.isNew ? (
//                   <button type="button" className="btn btn-primary" onClick={handleSaveRole}>Save</button>
//                 ) : (
//                   <button type="button" className="btn btn-primary" onClick={handleSaveEditRole}>Save Changes</button>
//                 )}
//                 <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="mt-4">
//         <button className="btn btn-success mx-2" onClick={applyChanges}>Apply Changes</button>
//         <button className="btn btn-danger mx-2" onClick={resetForm}>Reset Form</button>
//       </div>
//     </div>
//   );
// };

// export default Roles;


// import React, { useState, useEffect } from 'react';
// import './styles/Roles.css';
// import { BsPlus, BsPencil, BsDash } from 'react-icons/bs';
// import { useSelector } from 'react-redux';
// import axios from 'axios';

// const Roles = () => {
//   const { department } = useSelector((state) => state.auth); // This is your department
//   // const hodDepartment = department;
//   const hodDepartment = 'FIRST_YEAR'

//   const [currentSemester, setCurrentSemester] = useState('');
//   const [roles, setRoles] = useState([]);
//   const [teachers, setTeachers] = useState([]);
//   const [selectedOptions, setSelectedOptions] = useState({});
//   const [semesters, setSemesters] = useState([]);

//   // Modal state
//   const [showModal, setShowModal] = useState(false);
//   const [newRole, setNewRole] = useState({ name: '', isNew: true });
//   const [editRole, setEditRole] = useState({ name: '', isNew: false });
//   const [editRoleIndex, setEditRoleIndex] = useState(null);

//   useEffect(() => {
//     // Fetch data from API
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:4545/hod/getFacultyRolesData', {
//           params: { hodDepartment: hodDepartment },
//           withCredentials: true
//         });
//         const { semesters, teachers, roles } = response.data;

//         setSemesters(semesters);
//         setTeachers(teachers);
//         setRoles(roles);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, [hodDepartment]);

//   const handleAddRole = () => {
//     setShowModal(true);
//     setNewRole({ name: '', isNew: true });
//     setEditRoleIndex(null);
//   };

//   const handleSaveRole = () => {
//     if (newRole.name) {
//       setRoles((prevRoles) => [
//         ...prevRoles,
//         {
//           ROLE_NAME: newRole.name.toUpperCase(),
//           isNew: true
//         }
//       ]);
//       setShowModal(false);
//     }
//   };

//   const handleRemoveRole = (roleName) => {
//     if (window.confirm('Are you sure you want to remove this role?')) {
//       setRoles((prevRoles) => prevRoles.filter(role => role.ROLE_NAME !== roleName));
//     }
//   };

//   const handleEditRole = (index) => {
//     const role = roles[index];
//     if (role) {
//       setEditRoleIndex(index);
//       setEditRole({
//         name: role.ROLE_NAME || '',
//         isNew: role.isNew,
//         originalName: role.ROLE_NAME
//       });
//       setShowModal(true);
//     }
//   };

//   const handleSaveEditRole = () => {
//     if (editRole.name && editRoleIndex !== null) {
//       setRoles((prevRoles) =>
//         prevRoles.map((role, index) =>
//           index === editRoleIndex ? {
//             ROLE_NAME: editRole.name.toUpperCase(),
//             isNew: editRole.isNew
//           } : role
//         )
//       );
//       setEditRoleIndex(null);
//       setShowModal(false);
//     }
//   };

//   const handleTeacherRoleChange = (facultyId, role) => {
//     setSelectedOptions((prevOptions) => ({
//       ...prevOptions,
//       [facultyId]: role
//     }));
//   };

//   const handleApplyRole = (facultyId) => {
//     const assignedRole = selectedOptions[facultyId];
//     if (assignedRole) {
//       setTeachers((prevTeachers) =>
//         prevTeachers.map((teacher) =>
//           teacher.FACULTY_ID === facultyId
//             ? {
//                 ...teacher,
//                 assignedRoles: teacher.assignedRoles ? [...teacher.assignedRoles, assignedRole] : [assignedRole]
//               }
//             : teacher
//         )
//       );
//       setSelectedOptions((prevOptions) => ({
//         ...prevOptions,
//         [facultyId]: ''
//       }));
//     }
//     console.log(`Role ${assignedRole} assigned to faculty ${facultyId}`);
//     alert(`Role ${assignedRole} assigned to faculty ${facultyId}`);
//   };

//   const handleRemoveFacultyRole = (facultyId, roleToRemove) => {
//     setTeachers((prevTeachers) =>
//       prevTeachers.map((teacher) =>
//         teacher.FACULTY_ID === facultyId
//           ? {
//               ...teacher,
//               assignedRoles: teacher.assignedRoles.filter((role) => role !== roleToRemove)
//             }
//           : teacher
//       )
//     );
//   };

//   const applyChanges = async () => {
//     try {
//       const dataToSend = teachers.map((teacher) => ({
//         faculty_id: teacher.FACULTY_ID,
//         faculty_name: teacher.FACULTY_NAME,
//         roles: teacher.assignedRoles || [],
//       })).filter(item => item.roles.length > 0);

//       await axios.post('/api/apply-changes', dataToSend);
//       alert('Changes applied successfully');
//       resetForm();
//     } catch (error) {
//       console.error('Error applying changes:', error);
//       alert('Failed to apply changes.');
//     }
//   };

//   const resetForm = () => {
//     setCurrentSemester('');
//     setRoles([]);
//     setTeachers([]);
//     setSelectedOptions({});
//   };

//   return (
//     <div className="container mt-5">
//       <h1 className="mb-4 text-center">Department Allocation</h1>

//       <div className="row mb-3">
//         <div className='col-12 col-md-6 d-flex justify-content-start'>
//           <div className="col-12 col-md-6">
//             <label htmlFor="semesterSelect" className="form-label">Select Semester:</label>
//             <select
//               id="semesterSelect"
//               className="form-select"
//               value={currentSemester}
//               onChange={(e) => setCurrentSemester(e.target.value)}
//             >
//               <option value="">Select Semester</option>
//               {semesters.map((semester) => (
//                 <option key={semester} value={semester}>{semester}</option>
//               ))}
//             </select>
//           </div>
//         </div>

//         <div className='col-12 col-md-6 d-flex justify-content-end align-items-end'>
//           <div>
//             <button className="btn btn-success mx-2" onClick={handleAddRole}>
//               <BsPlus /> Add New Role
//             </button>
//           </div>
//           <div>
//             <button className="btn btn-primary mx-2" onClick={() => alert('Data fetched successfully')}>Get Data</button>
//           </div>
//         </div>
//       </div>

//       <table className="table table-bordered">
//         <thead>
//           <tr>
//             <th>Faculty ID</th>
//             <th>Faculty Name</th>
//             <th>Assigned Roles</th>
//             <th>Role</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {teachers.map((teacher) => (
//             <tr key={teacher.FACULTY_ID}>
//               <td>{teacher.FACULTY_ID}</td>
//               <td>{teacher.FACULTY_NAME}</td>
//               <td>
//                 {teacher.assignedRoles && teacher.assignedRoles.length > 0 ? (
//                   <ul>
//                     {teacher.assignedRoles.map((role, idx) => (
//                       <li key={idx}>
//                         {role}
//                         <button className="btn btn-danger btn-sm ml-2" onClick={() => handleRemoveFacultyRole(teacher.FACULTY_ID, role)}>
//                           <BsDash />
//                         </button>
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   'No roles assigned'
//                 )}
//               </td>
//               <td>
//                 <select
//                   value={selectedOptions[teacher.FACULTY_ID] || ''}
//                   onChange={(e) => handleTeacherRoleChange(teacher.FACULTY_ID, e.target.value)}
//                 >
//                   <option value="">Select Role</option>
//                   {roles.map((role) => (
//                     <option key={role.ROLE_NAME} value={role.ROLE_NAME}>{role.ROLE_NAME}</option>
//                   ))}
//                 </select>
//                 <button className="btn btn-primary btn-sm ml-2" onClick={() => handleApplyRole(teacher.FACULTY_ID)}>
//                   Apply
//                 </button>
//               </td>
//               <td>
//                 <button className="btn btn-warning btn-sm" onClick={() => handleEditRole(teacher.FACULTY_ID)}>
//                   <BsPencil />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {showModal && (
//         <div className="modal" tabIndex="-1" style={{ display: 'block' }}>
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">{newRole.isNew ? 'Add New Role' : 'Edit Role'}</h5>
//                 <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
//               </div>
//               <div className="modal-body">
//                 <div className="mb-3">
//                   <label htmlFor="roleName" className="form-label">Role Name:</label>
//                   <input
//                     type="text"
//                     id="roleName"
//                     className="form-control"
//                     value={newRole.isNew ? newRole.name : editRole.name}
//                     onChange={(e) => {
//                       if (newRole.isNew) {
//                         setNewRole({ ...newRole, name: e.target.value });
//                       } else {
//                         setEditRole({ ...editRole, name: e.target.value });
//                       }
//                     }}
//                   />
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 {newRole.isNew ? (
//                   <button type="button" className="btn btn-primary" onClick={handleSaveRole}>Save</button>
//                 ) : (
//                   <button type="button" className="btn btn-primary" onClick={handleSaveEditRole}>Save Changes</button>
//                 )}
//                 <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="mt-4">
//         <button className="btn btn-success mx-2" onClick={applyChanges}>Apply Changes</button>
//         <button className="btn btn-danger mx-2" onClick={resetForm}>Reset Form</button>
//       </div>
//     </div>
//   );
// };

// export default Roles;




// import React, { useState, useEffect } from 'react';
// import './styles/Roles.css';
// import { BsPlus, BsPencil, BsDash } from 'react-icons/bs';
// import { useSelector } from 'react-redux';
// import axios from 'axios';

// const Roles = () => {
//   const { department } = useSelector((state) => state.auth); // This is your department
//   const hodDepartment = 'FIRST_YEAR';

//   const [roles, setRoles] = useState([]);
//   const [teachers, setTeachers] = useState([]);
//   const [selectedOptions, setSelectedOptions] = useState({});

//   // Modal state
//   const [showModal, setShowModal] = useState(false);
//   const [newRole, setNewRole] = useState({ name: '', isNew: true });
//   const [editRole, setEditRole] = useState({ name: '', isNew: false });
//   const [editRoleIndex, setEditRoleIndex] = useState(null);

//   useEffect(() => {
//     // Fetch data from API
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:4545/hod/getFacultyRolesData', {
//           params: { hodDepartment: hodDepartment },
//           withCredentials: true
//         });
//         const { faculty } = response.data;

//         setTeachers(faculty.map(faculty => ({
//           ...faculty,
//           assignedRoles: faculty.facultyRoles || []
//         })));
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, [hodDepartment]);

//   const handleAddRole = () => {
//     setShowModal(true);
//     setNewRole({ name: '', isNew: true });
//     setEditRoleIndex(null);
//   };

//   const handleSaveRole = () => {
//     if (newRole.name) {
//       setRoles((prevRoles) => [
//         ...prevRoles,
//         {
//           ROLE_NAME: newRole.name.toUpperCase(),
//           isNew: true
//         }
//       ]);
//       setShowModal(false);
//     }
//   };

//   const handleRemoveRole = (roleName) => {
//     if (window.confirm('Are you sure you want to remove this role?')) {
//       setRoles((prevRoles) => prevRoles.filter(role => role.ROLE_NAME !== roleName));
//     }
//   };

//   const handleEditRole = (index) => {
//     const role = roles[index];
//     if (role) {
//       setEditRoleIndex(index);
//       setEditRole({
//         name: role.ROLE_NAME || '',
//         isNew: role.isNew,
//         originalName: role.ROLE_NAME
//       });
//       setShowModal(true);
//     }
//   };

//   const handleSaveEditRole = () => {
//     if (editRole.name && editRoleIndex !== null) {
//       setRoles((prevRoles) =>
//         prevRoles.map((role, index) =>
//           index === editRoleIndex ? {
//             ROLE_NAME: editRole.name.toUpperCase(),
//             isNew: editRole.isNew
//           } : role
//         )
//       );
//       setEditRoleIndex(null);
//       setShowModal(false);
//     }
//   };

//   const handleTeacherRoleChange = (facultyId, role) => {
//     setSelectedOptions((prevOptions) => ({
//       ...prevOptions,
//       [facultyId]: role
//     }));
//   };

//   const handleApplyRole = (facultyId) => {
//     const assignedRole = selectedOptions[facultyId];
//     if (assignedRole) {
//       setTeachers((prevTeachers) =>
//         prevTeachers.map((teacher) =>
//           teacher.FACULTY_ID === facultyId
//             ? {
//                 ...teacher,
//                 assignedRoles: teacher.assignedRoles ? [...teacher.assignedRoles, assignedRole] : [assignedRole]
//               }
//             : teacher
//         )
//       );
//       setSelectedOptions((prevOptions) => ({
//         ...prevOptions,
//         [facultyId]: ''
//       }));
//     }
//     console.log(`Role ${assignedRole} assigned to faculty ${facultyId}`);
//     alert(`Role ${assignedRole} assigned to faculty ${facultyId}`);
//   };

//   const handleRemoveFacultyRole = (facultyId, roleToRemove) => {
//     setTeachers((prevTeachers) =>
//       prevTeachers.map((teacher) =>
//         teacher.FACULTY_ID === facultyId
//           ? {
//               ...teacher,
//               assignedRoles: teacher.assignedRoles.filter((role) => role !== roleToRemove)
//             }
//           : teacher
//       )
//     );
//   };

//   const applyChanges = async () => {
//     try {
//       const dataToSend = teachers.map((teacher) => ({
//         faculty_id: teacher.FACULTY_ID,
//         faculty_name: teacher.FACULTY_NAME,
//         roles: teacher.assignedRoles || [],
//       })).filter(item => item.roles.length > 0);

//       await axios.post('/api/apply-changes', dataToSend);
//       alert('Changes applied successfully');
//       resetForm();
//     } catch (error) {
//       console.error('Error applying changes:', error);
//       alert('Failed to apply changes.');
//     }
//   };

//   const resetForm = () => {
//     setRoles([]);
//     setTeachers([]);
//     setSelectedOptions({});
//   };

//   return (
//     <div className="container mt-5">
//       <h1 className="mb-4 text-center">Department Faculty</h1>

//       <div className="row mb-3">
//         <div className='col-12 col-md-6 d-flex justify-content-start align-items-end'>
//             <button className="btn btn-success mx-2" onClick={handleAddRole}>
//               <BsPlus /> Add New Role
//             </button>
//         </div>
//       </div>

//       <table className="table table-bordered">
//         <thead>
//           <tr>
//             <th>Faculty ID</th>
//             <th>Faculty Name</th>
//             <th>Assigned Roles</th>
//             <th>Role</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {teachers.map((teacher) => (
//             <tr key={teacher.FACULTY_ID}>
//               <td>{teacher.FACULTY_ID}</td>
//               <td>{teacher.FACULTY_NAME}</td>
//               <td>
//                 {teacher.assignedRoles && teacher.assignedRoles.length > 0 ? (
//                   <ul>
//                     {teacher.assignedRoles.map((role, idx) => (
//                       <li key={idx}>
//                         {role}
//                         <button className="btn btn-danger btn-sm ml-2" onClick={() => handleRemoveFacultyRole(teacher.FACULTY_ID, role)}>
//                           <BsDash />
//                         </button>
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   'No roles assigned'
//                 )}
//               </td>
//               <td>
//                 <select
//                   value={selectedOptions[teacher.FACULTY_ID] || ''}
//                   onChange={(e) => handleTeacherRoleChange(teacher.FACULTY_ID, e.target.value)}
//                 >
//                   <option value="">Select Role</option>
//                   {roles.map((role) => (
//                     <option key={role.ROLE_NAME} value={role.ROLE_NAME}>{role.ROLE_NAME}</option>
//                   ))}
//                 </select>
//                 <button className="btn btn-primary btn-sm ml-2" onClick={() => handleApplyRole(teacher.FACULTY_ID)}>
//                   Apply
//                 </button>
//               </td>
//               <td>
//                 <button className="btn btn-warning btn-sm" onClick={() => handleEditRole(teacher.FACULTY_ID)}>
//                   <BsPencil />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {showModal && (
//         <div className="modal" tabIndex="-1" style={{ display: 'block' }}>
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">{newRole.isNew ? 'Add New Role' : 'Edit Role'}</h5>
//                 <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
//               </div>
//               <div className="modal-body">
//                 <div className="mb-3">
//                   <label htmlFor="roleName" className="form-label">Role Name:</label>
//                   <input
//                     type="text"
//                     id="roleName"
//                     className="form-control"
//                     value={newRole.isNew ? newRole.name : editRole.name}
//                     onChange={(e) => {
//                       if (newRole.isNew) {
//                         setNewRole({ ...newRole, name: e.target.value });
//                       } else {
//                         setEditRole({ ...editRole, name: e.target.value });
//                       }
//                     }}
//                   />
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 {newRole.isNew ? (
//                   <button type="button" className="btn btn-primary" onClick={handleSaveRole}>Save</button>
//                 ) : (
//                   <button type="button" className="btn btn-primary" onClick={handleSaveEditRole}>Save Changes</button>
//                 )}
//                 <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="mt-4">
//         <button className="btn btn-success mx-2" onClick={applyChanges}>Apply Changes</button>
//         <button className="btn btn-danger mx-2" onClick={resetForm}>Reset Form</button>
//       </div>
//     </div>
//   );
// };

// export default Roles;




// import React, { useState, useEffect } from 'react';
// import './styles/Roles.css';
// import { BsPlus, BsPencil, BsDash } from 'react-icons/bs';
// import { useSelector } from 'react-redux';
// import axios from 'axios';

// const Roles = () => {
//   const { department } = useSelector((state) => state.auth); // This is your department
//   const hodDepartment = 'IOT';

//   const [roles, setRoles] = useState([]);
//   const [teachers, setTeachers] = useState([]);
//   const [selectedOptions, setSelectedOptions] = useState({});

//   // Modal state
//   const [showModal, setShowModal] = useState(false);
//   const [newRole, setNewRole] = useState({ name: '', isNew: true });
//   const [editRole, setEditRole] = useState({ name: '', isNew: false });
//   const [editRoleIndex, setEditRoleIndex] = useState(null);

//   useEffect(() => {
//     // Fetch data from API
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:4545/hod/getFacultyRolesData', {
//           params: { hodDepartment: hodDepartment },
//           withCredentials: true
//         });
//         const { faculty } = response.data;

//         // Set teachers data
//         setTeachers(faculty.map(faculty => ({
//           facultyId: faculty.facultyId,
//           facultyName: faculty.facultyName,
//           assignedRoles: faculty.facultyRoles || []
//         })));

//         // Initialize roles (excluding assigned roles)
//         const allRoles = new Set();
//         faculty.forEach(faculty => {
//           if (faculty.facultyRoles) {
//             faculty.facultyRoles.forEach(role => allRoles.add(role));
//           }
//         });
//         setRoles(Array.from(allRoles));
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, [hodDepartment]);

//   const handleAddRole = () => {
//     setShowModal(true);
//     setNewRole({ name: '', isNew: true });
//     setEditRoleIndex(null);
//   };

//   const handleSaveRole = () => {
//     if (newRole.name) {
//       const roleName = newRole.name.toUpperCase();
//       setRoles((prevRoles) => [
//         ...prevRoles,
//         roleName
//       ]);
//       setShowModal(false);
//     }
//   };

//   const handleRemoveRole = (roleName) => {
//     if (window.confirm('Are you sure you want to remove this role?')) {
//       setRoles((prevRoles) => prevRoles.filter(role => role !== roleName));
//       // Remove the role from the teachers' assigned roles
//       setTeachers((prevTeachers) =>
//         prevTeachers.map((teacher) =>
//           ({
//             ...teacher,
//             assignedRoles: teacher.assignedRoles.filter(role => role !== roleName)
//           })
//         )
//       );
//     }
//   };

//   const handleEditRole = (index) => {
//     const role = roles[index];
//     if (role) {
//       setEditRoleIndex(index);
//       setEditRole({
//         name: role,
//         isNew: false,
//         originalName: role
//       });
//       setShowModal(true);
//     }
//   };

//   const handleSaveEditRole = () => {
//     if (editRole.name && editRoleIndex !== null) {
//       const updatedRoleName = editRole.name.toUpperCase();
//       setRoles((prevRoles) =>
//         prevRoles.map((role, index) =>
//           index === editRoleIndex ? updatedRoleName : role
//         )
//       );
//       setEditRoleIndex(null);
//       setShowModal(false);
//     }
//   };

//   const handleTeacherRoleChange = (facultyId, role) => {
//     setSelectedOptions((prevOptions) => ({
//       ...prevOptions,
//       [facultyId]: role
//     }));
//   };

//   const handleApplyRole = (facultyId) => {
//     const assignedRole = selectedOptions[facultyId];
//     if (assignedRole) {
//       setTeachers((prevTeachers) =>
//         prevTeachers.map((teacher) =>
//           teacher.facultyId === facultyId
//             ? {
//                 ...teacher,
//                 assignedRoles: teacher.assignedRoles ? [...teacher.assignedRoles, assignedRole] : [assignedRole]
//               }
//             : teacher
//         )
//       );
//       // Remove assigned role from roles list
//       setRoles((prevRoles) => prevRoles.filter(role => role !== assignedRole));
//       setSelectedOptions((prevOptions) => ({
//         ...prevOptions,
//         [facultyId]: ''
//       }));
//     }
//     console.log(`Role ${assignedRole} assigned to faculty ${facultyId}`);
//     alert(`Role ${assignedRole} assigned to faculty ${facultyId}`);
//   };

//   const handleRemoveFacultyRole = (facultyId, roleToRemove) => {
//     setTeachers((prevTeachers) =>
//       prevTeachers.map((teacher) =>
//         teacher.facultyId === facultyId
//           ? {
//               ...teacher,
//               assignedRoles: teacher.assignedRoles.filter((role) => role !== roleToRemove)
//             }
//           : teacher
//       )
//     );
//     // Add the removed role back to the roles array
//     setRoles((prevRoles) => [...prevRoles, roleToRemove]);
//   };

//   const applyChanges = async () => {
//     try {
//       const dataToSend = teachers.map((teacher) => ({
//         faculty_id: teacher.facultyId,
//         faculty_name: teacher.facultyName,
//         roles: teacher.assignedRoles || [],
//       })).filter(item => item.roles.length > 0);

//       await axios.post('/api/apply-changes', dataToSend);
//       alert('Changes applied successfully');
//       resetForm();
//     } catch (error) {
//       console.error('Error applying changes:', error);
//       alert('Failed to apply changes.');
//     }
//   };

//   const resetForm = () => {
//     setRoles([]);
//     setTeachers([]);
//     setSelectedOptions({});
//   };

//   return (
//     <div className="container mt-5">
//       <h1 className="mb-4 text-center">Department Faculty</h1>

//       <div className="row mb-3">
//         <div className='col-12 col-md-6 d-flex justify-content-start align-items-end'>
//             <button className="btn btn-success mx-2" onClick={handleAddRole}>
//               <BsPlus /> Add New Role
//             </button>
//         </div>
//       </div>

//       <table className="table table-bordered">
//         <thead>
//           <tr>
//             <th>Faculty ID</th>
//             <th>Faculty Name</th>
//             <th>Assigned Roles</th>
//             <th>Role</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {teachers.map((teacher) => (
//             <tr key={teacher.facultyId}>
//               <td>{teacher.facultyId}</td>
//               <td>{teacher.facultyName}</td>
//               <td>
//                 {teacher.assignedRoles && teacher.assignedRoles.length > 0 ? (
//                   <ul>
//                     {teacher.assignedRoles.map((role, idx) => (
//                       <li key={idx}>
//                         {role}
//                         <button className="btn btn-danger btn-sm ml-2" onClick={() => handleRemoveFacultyRole(teacher.facultyId, role)}>
//                           <BsDash />
//                         </button>
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   'No roles assigned'
//                 )}
//               </td>
//               <td>
//                 <select
//                   value={selectedOptions[teacher.facultyId] || ''}
//                   onChange={(e) => handleTeacherRoleChange(teacher.facultyId, e.target.value)}
//                 >
//                   <option value="">Select Role</option>
//                   {roles.map((role, index) => (
//                     <option key={index} value={role}>{role}</option>
//                   ))}
//                 </select>
//                 <button className="btn btn-primary btn-sm ml-2" onClick={() => handleApplyRole(teacher.facultyId)}>
//                   Apply
//                 </button>
//               </td>
//               <td>
//                 {teacher.assignedRoles.length > 0 && (
//                   <button 
//                     className="btn btn-warning btn-sm"
//                     onClick={() => handleEditRole(roles.indexOf(teacher.assignedRoles[0]))}
//                     title="Edit Role"
//                   >
//                     <BsPencil />
//                   </button>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {showModal && (
//         <div className="modal" tabIndex="-1" style={{ display: 'block' }}>
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">{newRole.isNew ? 'Add New Role' : 'Edit Role'}</h5>
//                 <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
//               </div>
//               <div className="modal-body">
//                 <div className="mb-3">
//                   <label htmlFor="roleName" className="form-label">Role Name:</label>
//                   <input
//                     type="text"
//                     id="roleName"
//                     className="form-control"
//                     value={newRole.isNew ? newRole.name : editRole.name}
//                     onChange={(e) => {
//                       if (newRole.isNew) {
//                         setNewRole({ ...newRole, name: e.target.value });
//                       } else {
//                         setEditRole({ ...editRole, name: e.target.value });
//                       }
//                     }}
//                   />
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 {newRole.isNew ? (
//                   <button type="button" className="btn btn-primary" onClick={handleSaveRole}>Save</button>
//                 ) : (
//                   <button type="button" className="btn btn-primary" onClick={handleSaveEditRole}>Save Changes</button>
//                 )}
//                 <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="mt-4">
//         <button className="btn btn-success mx-2" onClick={applyChanges}>Apply Changes</button>
//         <button className="btn btn-danger mx-2" onClick={resetForm}>Reset Form</button>
//       </div>
//     </div>
//   );
// };

// export default Roles;




import React, { useState, useEffect } from 'react';
import './styles/Roles.css';
import { BsPlus, BsPencil, BsDash } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import axios from 'axios';
import axiosInstance from '../../../Utils/AxiosInstance';

const Roles = () => {
  const { department } = useSelector((state) => state.auth); // This is your department
  const hodDepartment = 'IOT';

  const [roles, setRoles] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [newRole, setNewRole] = useState({ name: '', isNew: true });
  const [editRole, setEditRole] = useState({ name: '', isNew: false });
  const [editRoleIndex, setEditRoleIndex] = useState(null);

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        // const response = await axios.get('http://localhost:4545/hod/getFacultyRolesData', {
        //   params: { hodDepartment: hodDepartment },
        //   withCredentials: true
        // });

        const response = await axiosInstance.get('/hod/getFacultyRolesData', {
          params: { hodDepartment: hodDepartment }
        });
        const { faculty } = response.data;

        // Set teachers data
        setTeachers(faculty.map(faculty => ({
          facultyId: faculty.facultyId,
          facultyName: faculty.facultyName,
          assignedRoles: faculty.facultyRoles || []
        })));

        // Initialize roles (excluding assigned roles)
        const allRoles = new Set();
        faculty.forEach(faculty => {
          if (faculty.facultyRoles) {
            faculty.facultyRoles.forEach(role => allRoles.add(role));
          }
        });
        setRoles(Array.from(allRoles));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [hodDepartment]);

  const handleAddRole = () => {
    setShowModal(true);
    setNewRole({ name: '', isNew: true });
    setEditRoleIndex(null);
  };

  const handleSaveRole = () => {
    if (newRole.name) {
      const roleName = newRole.name.toUpperCase();
      setRoles((prevRoles) => [
        ...prevRoles,
        roleName
      ]);
      setShowModal(false);
    }
  };

  const handleRemoveRole = (roleName) => {
    if (window.confirm('Are you sure you want to remove this role?')) {
      setRoles((prevRoles) => prevRoles.filter(role => role !== roleName));
      // Remove the role from the teachers' assigned roles
      setTeachers((prevTeachers) =>
        prevTeachers.map((teacher) =>
          ({
            ...teacher,
            assignedRoles: teacher.assignedRoles.filter(role => role !== roleName)
          })
        )
      );
    }
  };

  const handleEditRole = (index) => {
    const role = roles[index];
    if (role) {
      setEditRoleIndex(index);
      setEditRole({
        name: role,
        isNew: false,
        originalName: role
      });
      setShowModal(true);
    }
  };

  const handleSaveEditRole = () => {
    if (editRole.name && editRoleIndex !== null) {
      const updatedRoleName = editRole.name.toUpperCase();
      setRoles((prevRoles) =>
        prevRoles.map((role, index) =>
          index === editRoleIndex ? updatedRoleName : role
        )
      );
      setEditRoleIndex(null);
      setShowModal(false);
    }
  };

  const handleTeacherRoleChange = (facultyId, role) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [facultyId]: role
    }));
  };

  const handleApplyRole = (facultyId) => {
    const assignedRole = selectedOptions[facultyId];
    if (assignedRole) {
      setTeachers((prevTeachers) =>
        prevTeachers.map((teacher) =>
          teacher.facultyId === facultyId
            ? {
                ...teacher,
                assignedRoles: teacher.assignedRoles ? [...teacher.assignedRoles, assignedRole] : [assignedRole]
              }
            : teacher
        )
      );
      // Remove assigned role from roles list
      setRoles((prevRoles) => prevRoles.filter(role => role !== assignedRole));
      setSelectedOptions((prevOptions) => ({
        ...prevOptions,
        [facultyId]: ''
      }));
    }
    // console.log(`Role ${assignedRole} assigned to faculty ${facultyId}`);
    alert(`Role ${assignedRole} assigned to faculty ${facultyId}`);
  };

  const handleRemoveFacultyRole = (facultyId, roleToRemove) => {
    setTeachers((prevTeachers) =>
      prevTeachers.map((teacher) =>
        teacher.facultyId === facultyId
          ? {
              ...teacher,
              assignedRoles: teacher.assignedRoles.filter((role) => role !== roleToRemove)
            }
          : teacher
      )
    );
    // Add the removed role back to the roles array
    setRoles((prevRoles) => [...prevRoles, roleToRemove]);
  };

  const applyChanges = async () => {
    try {
      const dataToSend = teachers.map((teacher) => ({
        facultyId: teacher.facultyId,
        facultyName: teacher.facultyName,
        facultyRoles: teacher.assignedRoles || [],
      }));
      // console.log(dataToSend)
      // await axios.post('http://localhost:4545/hod/updateFacultyRoles', {dataToSend},{
      //   withCredentials:true
      // });

      await axiosInstance.post('/hod/updateFacultyRoles', {dataToSend});
      alert('Changes applied successfully');
      resetForm();
    } catch (error) {
      console.error('Error applying changes:', error);
      alert('Failed to apply changes.');
    }
  };

  const resetForm = async () => {
    try {
      // const response = await axios.get('http://localhost:4545/hod/getFacultyRolesData', {
      //   params: { hodDepartment: hodDepartment },
      //   withCredentials: true
      // });

      const response = await axiosInstance.get('/hod/getFacultyRolesData', {
        params: { hodDepartment: hodDepartment }
      });
      const { faculty } = response.data;

      // Set teachers data
      setTeachers(faculty.map(faculty => ({
        facultyId: faculty.facultyId,
        facultyName: faculty.facultyName,
        assignedRoles: faculty.facultyRoles || []
      })));

      // Initialize roles (excluding assigned roles)
      const allRoles = new Set();
      faculty.forEach(faculty => {
        if (faculty.facultyRoles) {
          faculty.facultyRoles.forEach(role => allRoles.add(role));
        }
      });
      setRoles(Array.from(allRoles));
    } catch (error) {
      console.error('Error resetting form:', error);
    }
  };

  // Helper function to get available roles for dropdown
  const getAvailableRoles = (facultyId) => {
    const assignedRoles = teachers.find(teacher => teacher.facultyId === facultyId)?.assignedRoles || [];
    return roles.filter(role => !assignedRoles.includes(role));
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Department Faculty</h1>

      <div className="row mb-3">
        <div className='col-12 col-md-6 d-flex justify-content-start align-items-end'>
            <button className="btn btn-success mx-2" onClick={handleAddRole}>
              <BsPlus /> Add New Role
            </button>
        </div>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Faculty ID</th>
            <th>Faculty Name</th>
            <th>Assigned Roles</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.facultyId}>
              <td>{teacher.facultyId}</td>
              <td>{teacher.facultyName}</td>
              <td>
                {teacher.assignedRoles && teacher.assignedRoles.length > 0 ? (
                  <ul>
                    {teacher.assignedRoles.map((role, idx) => (
                      <li key={idx}>
                        {role}
                        <button className="btn btn-danger btn-sm ml-2" onClick={() => handleRemoveFacultyRole(teacher.facultyId, role)}>
                          <BsDash />
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  'No roles assigned'
                )}
              </td>
              <td>
                <select
                  value={selectedOptions[teacher.facultyId] || ''}
                  onChange={(e) => handleTeacherRoleChange(teacher.facultyId, e.target.value)}
                >
                  <option value="">Select Role</option>
                  {getAvailableRoles(teacher.facultyId).map((role, index) => (
                    <option key={index} value={role}>{role}</option>
                  ))}
                </select>
                <button className="btn btn-primary btn-sm ml-2" onClick={() => handleApplyRole(teacher.facultyId)}>
                  Apply
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal" tabIndex="-1" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{newRole.isNew ? 'Add New Role' : 'Edit Role'}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="roleName" className="form-label">Role Name:</label>
                  <input
                    type="text"
                    id="roleName"
                    className="form-control"
                    value={newRole.isNew ? newRole.name : editRole.name}
                    onChange={(e) => {
                      if (newRole.isNew) {
                        setNewRole({ ...newRole, name: e.target.value });
                      } else {
                        setEditRole({ ...editRole, name: e.target.value });
                      }
                    }}
                  />
                </div>
              </div>
              <div className="modal-footer">
                {newRole.isNew ? (
                  <button type="button" className="btn btn-primary" onClick={handleSaveRole}>Save</button>
                ) : (
                  <button type="button" className="btn btn-primary" onClick={handleSaveEditRole}>Save Changes</button>
                )}
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4">
        <button className="btn btn-success mx-2" onClick={applyChanges}>Apply Changes</button>
        <button className="btn btn-danger mx-2" onClick={resetForm}>Reset Form</button>
      </div>
    </div>
  );
};

export default Roles;
