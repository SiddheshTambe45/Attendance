import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import './styles/SignUp.css';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [facultyId, setFacultyId] = useState('');
  const [facultyName, setFacultyName] = useState(''); // New state for faculty name
  const [department, setDepartment] = useState('');
  const [departments, setDepartments] = useState([]);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [formErrors, setFormErrors] = useState({}); // State for form errors

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:4545/authenticate/signup/getDepartment');
        setDepartments(response.data);
      } catch (error) {
        console.error('There was an error fetching the departments!', error);
      }
    };

    fetchDepartments();
  }, []);

  const validateForm = () => {
    const errors = {};
    if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }
    if (!facultyName.trim()) {
      errors.facultyName = 'Faculty name is required';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const data = {
      email,
      password,
      facultyId,
      facultyName, // Include facultyName in the data
      department,
    };

    try {
      const response = await axios.post('http://localhost:4545/authenticate/signup/addFaculty', data);

      alert("Sign Up successful !!!");
      navigate('/login');
      console.log('Signup successful:', response.data);

    } catch (error) {
      console.error('There was an error during signup!', error);
    }
  };

  return (
    <div id='signUp' className='signUp'>
      <div className="container p-5 rounded my-0 my-sm-3 mx-0 mx-sm-auto" style={{ maxWidth: '700px', boxShadow: '0 0 3px grey' }}>
        <h2 className="my-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="facultyName" className="form-label">Faculty Name</label>
            <input
              type="text"
              className={`form-control ${formErrors.facultyName ? 'is-invalid' : ''}`} // Add error class if needed
              id="facultyName"
              value={facultyName}
              onChange={(e) => setFacultyName(e.target.value)}
              required
            />
            {formErrors.facultyName && (
              <div className="invalid-feedback">{formErrors.facultyName}</div>
            )}
          </div>
          <div className="mb-3 position-relative">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              className={`form-control ${formErrors.password ? 'is-invalid' : ''}`}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6} // Ensure password has a minimum length of 6
              required
            />
            <button
              type="button"
              className="position-absolute top-50 end-0 translate-middle-y btn btn-light"
              style={{ border: 'none' }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {formErrors.password && (
              <div className="invalid-feedback">{formErrors.password}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="facultyId" className="form-label">Faculty ID</label>
            <input
              type="text"
              className="form-control"
              id="facultyId"
              value={facultyId}
              onChange={(e) => setFacultyId(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="department" className="form-label">Department</label>
            <select
              className="form-select"
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            >
              <option value="">Select a department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
