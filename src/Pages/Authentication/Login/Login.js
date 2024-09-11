


// // src/Pages/Authentication/Login/Login.js
// import React, { useState, useEffect } from 'react';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import './styles/Login.css';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import Cookies from 'js-cookie';
// import axiosInstance from '../../../Utils/AxiosInstance';
// import { setUser } from '../../../Store/Slices/AuthSlice'
// import { Link } from 'react-router-dom';
// import logo from '../../../Assests/Images/gstlogo.png'

// const Login = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { facultyId, department, role } = useSelector(state => state.auth);

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [formErrors, setFormErrors] = useState({});

//   useEffect(() => {
//     // Check if user is already logged in based on Redux state
//     if (facultyId && department && role) {
//       const homePath = {
//         HOD: '/hod',
//         Faculty: '/faculty',
//         Principal: '/principal'
//       }[role];
//       navigate(homePath);
//     }
//   }, [facultyId, department, role, navigate]);

//   const validateForm = () => {
//     const errors = {};
//     if (password.length < 6) {
//       errors.password = 'Password must be at least 6 characters long';
//     }
//     return errors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const errors = validateForm();
//     if (Object.keys(errors).length > 0) {
//       setFormErrors(errors);
//       return;
//     }

//     try {
//       // await axios.post('http://localhost:4545/authenticate/login', { email, password }, { withCredentials: true });
      
//       await axiosInstance.post('/authenticate/login', { email, password });
      
//       const cookieUserData = Cookies.get('userData') ? JSON.parse(Cookies.get('userData')) : {};

//       // Dispatch the setUser action
//       if (cookieUserData) {
//         dispatch(setUser({
//           facultyId: cookieUserData.facultyId,
//           department: cookieUserData.department,
//           role: cookieUserData.role
//         }));
//       }
      
//       const homePath = {
//         HOD: '/hod',
//         Faculty: '/faculty',
//         Principal: '/principal'
//       }[cookieUserData.role.toLowerCase()];

//       navigate(homePath);

//     } catch (error) {
//       console.error('There was an error during login!', error);
//       setFormErrors({ general: 'Login failed. Please check your credentials.' });
//     }
//   };

//   return (
//     <div id="login" className="login">
//       <div className="container p-5 rounded my-0 my-sm-3 mx-0 mx-sm-auto" style={{ maxWidth: '700px',/* boxShadow: '0 0 3px grey'*/ }}>
//       <nav classname='navbar bg-body-tertiary '>
//                 <div className='row'>
//                     <div className='col d-flex justify-content-center'>
//                         <Link className="navbar-brand" to='/'>
//                             <img src={logo} className='img-fluid img-logo' alt=''/>
//                         </Link>
//                     </div>
//                 </div>
//             </nav>
//         <h2 className="my-4">Login</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label htmlFor="email" className="form-label">Email address</label>
//             <input
//               type="email"
//               className="form-control"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-3 position-relative">
//             <label htmlFor="password" className="form-label">Password</label>
//             <input
//               type={showPassword ? 'text' : 'password'}
//               className={`form-control ${formErrors.password ? 'is-invalid' : ''}`}
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               minLength={6}
//               required
//             />
//             <button
//               type="button"
//               className="position-absolute top-50 end-0 translate-middle-y btn btn-light"
//               style={{ border: 'none' }}
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </button>
//             {formErrors.password && (
//               <div className="invalid-feedback">{formErrors.password}</div>
//             )}
//           </div>
//           {formErrors.general && (
//             <div className="alert alert-danger">{formErrors.general}</div>
//           )}
//           <button type="submit" className="btn btn-primary">Login</button>
//         </form>
//         <div className="mt-3 text-center">
//           <p>Don't have an account? <Link to="/signup">Sign Up here</Link></p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;





// import React, { useState, useEffect } from 'react';
// import './styles/Login.css';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import Cookies from 'js-cookie';
// import axiosInstance from '../../../Utils/AxiosInstance';
// import { setUser } from '../../../Store/Slices/AuthSlice'
// import AuthenticateNavbar from '../../../Components/AuthenticateNavbar';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';


// const Login = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { facultyId, department, role } = useSelector(state => state.auth);

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [formErrors, setFormErrors] = useState({});


//   useEffect(() => {
//     // Check if user is already logged in based on Redux state
//     if (facultyId && department && role) {
//       const homePath = {
//         HOD: '/hod',
//         Faculty: '/faculty',
//         Principal: '/principal'
//       }[role];
//       navigate(homePath);
//     }
//   }, [facultyId, department, role, navigate]);

//   const validateForm = () => {
//     const errors = {};
//     if (password.length < 6) {
//       errors.password = 'Password must be at least 6 characters long';
//     }
//     return errors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const errors = validateForm();
//     if (Object.keys(errors).length > 0) {
//       setFormErrors(errors);
//       return;
//     }

//     try {
//       // await axios.post('http://localhost:4545/authenticate/login', { email, password }, { withCredentials: true });
      
//       await axiosInstance.post('/authenticate/login', { email, password });
      
//       const cookieUserData = Cookies.get('userData') ? JSON.parse(Cookies.get('userData')) : {};

//       // Dispatch the setUser action
//       if (cookieUserData) {
//         dispatch(setUser({
//           facultyId: cookieUserData.facultyId,
//           department: cookieUserData.department,
//           role: cookieUserData.role
//         }));
//       }
      
//       const homePath = {
//         HOD: '/hod',
//         Faculty: '/faculty',
//         Principal: '/principal'
//       }[cookieUserData.role.toLowerCase()];

//       navigate(homePath);

//     } catch (error) {
//       console.error('There was an error during login!', error);
//       setFormErrors({ general: 'Login failed. Please check your credentials.' });
//     }
//   };

//   return (
//     <div id="login" className="login">
//       <AuthenticateNavbar />

//       <div className='container shadow-none'>
//         <div className='row'>

//           <div className='col-8 mx-auto'>
            
//         <form onSubmit={handleSubmit}>
//            <div className="mb-3">
//              <label htmlFor="email" className="form-label display-6">Email address</label>
//             <input
//               type="email"
//               className="form-control"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               style={{fontSize:'2rem'}}
//             />
//           </div>
//           <div className="mb-3 position-relative">
//             <label htmlFor="password" className="form-label display-6">Password</label>
//             <input
//               type={showPassword ? 'text' : 'password'}
//               className={`form-control ${formErrors.password ? 'is-invalid' : ''}`}
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               minLength={6}
//               required
//               style={{fontSize:'2rem'}}
//             />
//             <button
//               type="button"
//               className="position-absolute top-50 end-0 translate-middle-y btn btn-light"
//               style={{ border: 'none' }}
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </button>
//             {formErrors.password && (
//               <div className="invalid-feedback">{formErrors.password}</div>
//             )}
//           </div>
//           {formErrors.general && (
//             <div className="alert alert-danger">{formErrors.general}</div>
//           )}
//           <button type="submit" className="btn btn-primary">Login</button>
//         </form>
//           </div>

//         </div> 
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState, useEffect } from 'react';
import './styles/Login.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import axiosInstance from '../../../Utils/AxiosInstance';
import { setUser, clearUser } from '../../../Store/Slices/AuthSlice';
import AuthenticateNavbar from '../../../Components/AuthenticateNavbar';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { facultyId, department, role } = useSelector(state => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    // Check if user is already logged in based on Redux state
    if (facultyId && department && role) {
      const homePath = {
        HOD: '/hod',
        Faculty: '/faculty',
        Principal: '/principal'
      }[role];
      navigate(homePath);
    }
  }, [facultyId, department, role, navigate]);

  const validateForm = () => {
    const errors = {};
    if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
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

    try {
      await axiosInstance.post('/authenticate/login', { email, password });
      
      const cookieUserData = Cookies.get('userData') ? JSON.parse(Cookies.get('userData')) : {};

      console.log('cookieUserData:', cookieUserData);

      // Dispatch the setUser action
      if (cookieUserData) {
        dispatch(setUser({
          facultyId: cookieUserData.facultyId,
          department: cookieUserData.department,
          role: cookieUserData.role
        }));
      }
      
      console.log('cookieUserData.role:', cookieUserData.role);

      const homePath = {
        HOD: '/hod',
        Faculty: '/faculty',
        Principal: '/principal'
      }[cookieUserData.role];

      console.log(homePath)

      navigate(homePath);

    } catch (error) {
      console.log("HI")
      if (error.response && error.response.status === 401) {
        // Unauthorized access
        dispatch(clearUser()); // Clear user data from Redux store
        navigate('/login'); // Redirect to login page
      } else {
        console.error('There was an error during login!', error);
        setFormErrors({ general: 'Login failed. Please check your credentials.' });
      }
    }
  };

  return (
    <div id="login" className="login">
      <AuthenticateNavbar />

      <div className='container shadow-none'>
        <div className='row'>
          <div className='col-8 mx-auto'>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label display-6">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ fontSize: '2rem' }}
                />
              </div>
              
              <div className="mb-3 position-relative">
                <label htmlFor="password" className="form-label display-6">Password</label>
                <div className="input-group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className={`form-control ${formErrors.password ? 'is-invalid' : ''}`}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={6}
                    required
                    style={{ fontSize: '2rem', paddingRight: '2.5rem' }}
                  />
                  <button
                    type="button"
                    className="btn btn-primary position-absolute end-0 p-0 m-0"
                    style={{
                      border: 'none',
                      height: '100%',
                      top: '0',
                      right: '0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '0 0.75rem',
                      width:'70px',
                      borderRadius:'15%'
                    }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash size={20}  /> : <FaEye size={20} />}
                  </button>
                </div>
                {formErrors.password && (
                  <div className="invalid-feedback">{formErrors.password}</div>
                )}
              </div>
              
              {formErrors.general && (
                <div className="alert alert-danger">{formErrors.general}</div>
              )}
              <button type="submit" className="btn btn-primary" style={{width:'200px', height:'50px', fontSize:'1.5rem'}}>Login</button>
            </form>
          </div>
        </div> 
      </div>
    </div>
  );
};

export default Login;
