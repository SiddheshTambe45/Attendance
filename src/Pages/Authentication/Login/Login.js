// import React, { useState } from 'react';
// import axios from 'axios';
// import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
// import './styles/Login.css';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {

//     const navigate = useNavigate();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false); // State for password visibility
//   const [formErrors, setFormErrors] = useState({}); // State for form errors
//   const [role, setRole] = useState(''); // State for user role

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
//       // Determine role based on email
//       const determinedRole = email.startsWith('hod') ? 'HOD' : 'Faculty';

//       // Send login request
//       const response = await axios.post('http://localhost:4545/authenticate/login', { email, password, role: determinedRole });
      
//         if(determinedRole === 'HOD'){
//             navigate('/hod')
//         }
//         else{
//           navigate('/faculty')
//         }

//     //   // Handle role-based logic
//     //   if (determinedRole === 'HOD') {
//     //     console.log('Logged in as HOD');
//     //     // Redirect or handle HOD-specific logic
//     //   } else if (determinedRole === 'Faculty') {
//     //     console.log('Logged in as Faculty');
//     //     // Redirect or handle Faculty-specific logic
//     //   } else {
//     //     console.log('Unknown role');
//     //   }

//       // Optionally store role in local storage or context
      
//       // localStorage.setItem('role', determinedRole);

//     } catch (error) {
//       console.error('There was an error during login!', error);
//       setFormErrors({ general: 'Login failed. Please check your credentials.' });
//     }
//   };

//   return (
//     <div id='login' className='login' >
//     <div className="container p-5 rounded my-0 my-sm-3 mx-0 mx-sm-auto" style={{ maxWidth: '700px', boxShadow:'0 0 3px grey'}}>
//       <h2 className="my-4">Login</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label htmlFor="email" className="form-label">Email address</label>
//           <input
//             type="email"
//             className="form-control"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-3 position-relative">
//           <label htmlFor="password" className="form-label">Password</label>
//           <input
//             type={showPassword ? 'text' : 'password'}
//             className={`form-control ${formErrors.password ? 'is-invalid' : ''}`}
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             minLength={6} // Ensure password has a minimum length of 6
//             required
//           />
//           <button
//             type="button"
//             className="position-absolute top-50 end-0 translate-middle-y btn btn-light"
//             style={{ border: 'none' }}
//             onClick={() => setShowPassword(!showPassword)}
//           >
//             {showPassword ? <FaEyeSlash /> : <FaEye />}
//           </button>
//           {formErrors.password && (
//             <div className="invalid-feedback">{formErrors.password}</div>
//           )}
//         </div>
//         {formErrors.general && (
//           <div className="alert alert-danger">{formErrors.general}</div>
//         )}
//         <button type="submit" className="btn btn-primary">Login</button>
//       </form>
//     </div>
//     </div>
//   );
// };

// export default Login;


// ------------------------------------

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
// import './styles/Login.css';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false); // State for password visibility
//   const [formErrors, setFormErrors] = useState({}); // State for form errors
//   const [role, setRole] = useState(''); // State for user role

//   useEffect(() => {
//     // Determine role based on email
//     const determinedRole = email.startsWith('hod') ? 'HOD' : 'Faculty';
//     setRole(determinedRole);
//   }, [email]);

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
//       // Log email, password, and role
//       console.log('Email:', email);
//       console.log('Password:', password);
//       console.log('Role:', role);
//       // Send login request
//       const response = await axios.post('http://localhost:4545/authenticate/login', { email, password, role });
      
//       // Navigate based on role
//       if (response.role === 'HOD') {
//         navigate('/hod');
//       } else {
//         navigate('/faculty');
//       }

//     } catch (error) {
//       console.error('There was an error during login!', error);
//       setFormErrors({ general: 'Login failed. Please check your credentials.' });
//     }
//   };

//   return (
//     <div id='login' className='login' >
//       <div className="container p-5 rounded my-0 my-sm-3 mx-0 mx-sm-auto" style={{ maxWidth: '700px', boxShadow:'0 0 3px grey'}}>
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
//               minLength={6} // Ensure password has a minimum length of 6
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
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import './styles/Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [formErrors, setFormErrors] = useState({}); // State for form errors
  const [role, setRole] = useState(''); // State for user role

  useEffect(() => {
    // Determine role based on email
    const determinedRole = email.startsWith('hod') ? 'HOD' : 'Faculty';
    setRole(determinedRole);
  }, [email]);

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
      // Send login request
      const response = await axios.post('http://localhost:4545/authenticate/login', { email, password, role });
      const responseData = response.data; // Access the data property

    console.log(responseData.role);
      // Navigate based on role
      if (responseData.role === 'HOD' && role === 'HOD') {
        navigate('/hod');
      } else {
        navigate('/faculty');
      }

    } catch (error) {
      console.error('There was an error during login!', error);
      setFormErrors({ general: 'Login failed. Please check your credentials.' });
    }
  };

  return (
    <div id='login' className='login'>
      <div className="container p-5 rounded my-0 my-sm-3 mx-0 mx-sm-auto" style={{ maxWidth: '700px', boxShadow:'0 0 3px grey'}}>
        <h2 className="my-4">Login</h2>
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
          {formErrors.general && (
            <div className="alert alert-danger">{formErrors.general}</div>
          )}
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
