


// import React, { useState, useEffect } from 'react';
// import './styles/Roles.css';
// import { BsPlus, BsDash } from 'react-icons/bs';
// import { useSelector } from 'react-redux';
// import axiosInstance from '../../../Utils/AxiosInstance';

// const Roles = () => {
//   const { department } = useSelector((state) => state.auth); // This is your department
//   const hodDepartment = department;

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
//         // const response = await axios.get('http://localhost:4545/hod/getFacultyRolesData', {
//         //   params: { hodDepartment: hodDepartment },
//         //   withCredentials: true
//         // });

//         const response = await axiosInstance.get('/hod/getFacultyRolesData', {
//           params: { hodDepartment: hodDepartment }
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
//     // console.log(`Role ${assignedRole} assigned to faculty ${facultyId}`);
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
//         facultyId: teacher.facultyId,
//         facultyName: teacher.facultyName,
//         facultyRoles: teacher.assignedRoles || [],
//       }));
//       // console.log(dataToSend)
//       // await axios.post('http://localhost:4545/hod/updateFacultyRoles', {dataToSend},{
//       //   withCredentials:true
//       // });

//       await axiosInstance.post('/hod/updateFacultyRoles', {dataToSend});
//       alert('Changes applied successfully');
//       resetForm();
//     } catch (error) {
//       console.error('Error applying changes:', error);
//       alert('Failed to apply changes.');
//     }
//   };

//   const resetForm = async () => {
//     try {
//       // const response = await axios.get('http://localhost:4545/hod/getFacultyRolesData', {
//       //   params: { hodDepartment: hodDepartment },
//       //   withCredentials: true
//       // });

//       const response = await axiosInstance.get('/hod/getFacultyRolesData', {
//         params: { hodDepartment: hodDepartment }
//       });
//       const { faculty } = response.data;

//       // Set teachers data
//       setTeachers(faculty.map(faculty => ({
//         facultyId: faculty.facultyId,
//         facultyName: faculty.facultyName,
//         assignedRoles: faculty.facultyRoles || []
//       })));

//       // Initialize roles (excluding assigned roles)
//       const allRoles = new Set();
//       faculty.forEach(faculty => {
//         if (faculty.facultyRoles) {
//           faculty.facultyRoles.forEach(role => allRoles.add(role));
//         }
//       });
//       setRoles(Array.from(allRoles));
//     } catch (error) {
//       console.error('Error resetting form:', error);
//     }
//   };

//   // Helper function to get available roles for dropdown
//   const getAvailableRoles = (facultyId) => {
//     const assignedRoles = teachers.find(teacher => teacher.facultyId === facultyId)?.assignedRoles || [];
//     return roles.filter(role => !assignedRoles.includes(role));
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
//                   {getAvailableRoles(teacher.facultyId).map((role, index) => (
//                     <option key={index} value={role}>{role}</option>
//                   ))}
//                 </select>
//                 <button className="btn btn-primary btn-sm ml-2" onClick={() => handleApplyRole(teacher.facultyId)}>
//                   Apply
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



import React, { useState, useEffect } from 'react';
import './styles/Roles.css';
import { BsPlus, BsDash } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import axiosInstance from '../../../Utils/AxiosInstance';

const Roles = () => {
  const { department } = useSelector((state) => state.auth); // This is your department
  const hodDepartment = department;

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
    // Get all roles assigned to other faculties
    const rolesAssignedToOthers = teachers
      .filter(teacher => teacher.facultyId !== facultyId)
      .flatMap(teacher => teacher.assignedRoles);
    
    // Filter out roles already assigned to other faculties
    return roles.filter(role => !rolesAssignedToOthers.includes(role));
  };

  return (
    <div className='RolesHOD' id='RolesHOD'>
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
                <h5 className="modal-title">{newRole.isNew ? 'Add Role' : 'Edit Role'}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
                  value={newRole.isNew ? newRole.name : editRole.name}
                  onChange={(e) => newRole.isNew ? setNewRole({ ...newRole, name: e.target.value }) : setEditRole({ ...editRole, name: e.target.value })}
                  placeholder="Role Name"
                />
              </div>
              <div className="modal-footer">
                {newRole.isNew ? (
                  <button type="button" className="btn btn-primary" onClick={handleSaveRole}>Save Role</button>
                ) : (
                  <button type="button" className="btn btn-primary" onClick={handleSaveEditRole}>Save Changes</button>
                )}
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <button className="btn btn-primary mt-3" onClick={applyChanges}>Apply Changes</button>
    </div>
    </div>
  );
};

export default Roles;
