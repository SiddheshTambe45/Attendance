


import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import './styles/SignUp.css';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../Utils/AxiosInstance'
import { Link } from 'react-router-dom';
import logo from '../../../Assests/Images/gstlogo.png'

const SignUp = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [facultyId, setFacultyId] = useState('');
  const [facultyName, setFacultyName] = useState('');
  const [department, setDepartment] = useState('');
  const [departments, setDepartments] = useState([]);
  const [hodPassword, setHodPassword] = useState('');
  const [facultyEmail, setFacultyEmail] = useState('');
  const [facultyPassword, setFacultyPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        // const response = await axios.get('http://localhost:4545/authenticate/signup/getDepartment');

        const response = await axiosInstance.get('/authenticate/signup/getDepartment');


        setDepartments(response.data);
      } catch (error) {
        console.error('There was an error fetching the departments!', error);
      }
    };

    fetchDepartments();
  }, []);

  const validateForm = () => {
    const errors = {};
  
    if (email.startsWith('hod')) {
      // For HODs, validate HOD password and faculty password
      if (hodPassword.length < 6) {
        errors.hodPassword = 'HOD password must be at least 6 characters long';
      }
      if (facultyPassword.length < 6) {
        errors.facultyPassword = 'Faculty password must be at least 6 characters long';
      }
    } else {
      // For faculty, validate only the faculty password
      if (password.length < 6) {
        errors.password = 'Password must be at least 6 characters long';
      }
    }
  
    if (!facultyName.trim()) {
      errors.facultyName = 'Faculty name is required';
    }
  
    return errors;
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      console.log("error",errors)
      setFormErrors(errors);
      return;
    }

    // Define data structures
  let data = {};

  if (email.startsWith('hod')) {
    // HOD data structure
    data = {
      hodEmail:email,
      hodPassword,
      facultyEmail,
      facultyPassword,
      facultyId,
      facultyName,
      department
    };
  } else {
    // Faculty data structure
    data = {
      email,
      password,
      facultyId,
      facultyName,
      department
    };
  }

    try {
      // const url = email.startsWith('hod') ? 'http://localhost:4545/authenticate/signup/hod' : 'http://localhost:4545/authenticate/signup/addfaculty';

      const url = email.startsWith('hod') ? '/authenticate/signup/hod' : '/authenticate/signup/addfaculty';

      // const response = await axios.post(url, data);

      const response = await axiosInstance.post(url, data);


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
      <nav classname='navbar bg-body-tertiary '>
                <div className='row'>
                    <div className='col d-flex justify-content-center '>
                        <Link className="navbar-brand" to='/'>
                            <img src={logo} className='img-fluid img-logo' alt=''/>
                        </Link>
                    </div>
                </div>
            </nav>
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
              className={`form-control ${formErrors.facultyName ? 'is-invalid' : ''}`}
              id="facultyName"
              value={facultyName}
              onChange={(e) => setFacultyName(e.target.value)}
              required
            />
            {formErrors.facultyName && (
              <div className="invalid-feedback">{formErrors.facultyName}</div>
            )}
          </div>
          {email.startsWith('hod') ? (
            <>
              <div className="mb-3">
                <label htmlFor="facultyEmail" className="form-label">Faculty Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="facultyEmail"
                  value={facultyEmail}
                  onChange={(e) => setFacultyEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3 position-relative">
                <label htmlFor="facultyPassword" className="form-label">Faculty Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  id="facultyPassword"
                  value={facultyPassword}
                  onChange={(e) => setFacultyPassword(e.target.value)}
                  minLength={6}
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
              </div>
              <div className="mb-3 position-relative">
                <label htmlFor="hodPassword" className="form-label">HOD Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className={`form-control ${formErrors.hodPassword ? 'is-invalid' : ''}`}
                  id="hodPassword"
                  value={hodPassword}
                  onChange={(e) => setHodPassword(e.target.value)}
                  minLength={6}
                  required
                />
                {formErrors.hodPassword && (
                  <div className="invalid-feedback">{formErrors.hodPassword}</div>
                )}
              </div>
            </>
          ) : (
            <div className="mb-3 position-relative">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                className={`form-control ${formErrors.password ? 'is-invalid' : ''}`}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
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
          )}
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
