


// import React from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import logo from '../../Assests/Images/gstlogo.png'
// import bg from '../../Assests/Images/Wavy_Tech-17_Single-03.jpg'
// import './styles/HomePage.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser } from '@fortawesome/free-solid-svg-icons';


// export default function HomePage() {

//     const navigate = useNavigate();

//     const toLogin=()=>{
//         navigate('/login');
//     }
//     return (
//         <div className='container shadow-none' style={{ /*boxShadow: '0 0 3px grey',*/ minHeight:'100vh', /* backgroundImage:`url(${bg})`*/ }}>
//             <nav className='row fixed-top bg-white' style={{paddingLeft:'100px', paddingRight:'100px', zIndex:'999'}}>
//                     <div className='col-6 d-flex'>
//                         <Link className="" to='/'>
//                             <img src={logo} className='img-fluid img-logo' alt=''/>
//                         </Link>
//                     </div>
//                     <div className='col-6 d-flex justify-content-end align-items-end flex-column'>
//                         <div className='row'>
//                         <div className='col-10'>
//                         <h4 className='p-1 text-danger' style={{fontFamily:'fantasy'}}>SIES Graduate School of Technology</h4>
//                         <p className='p-1 text-primary' style={{fontFamily:'fantasy'}}>Accredited with NAAC A+ Grade and NBA Accredited</p>
//                         <a href='https://www.siesgst.edu.in'target='blank' className='p-1 text-success text-decoration-none' style={{fontFamily:'fantasy'}} alt=''>www.siesgst.edu.in</a>
//                         </div>
//                         <div className='col-2 d-flex flex-column'>
//                             <div className=''>
//                                 <button className='border-0 bg-transparent py-3' onClick={toLogin}>
//                                     <FontAwesomeIcon icon={faUser} size='xl' />
//                                 </button>
//                             </div>
                            
//                         </div>
//                         </div>
//                     </div>
//             </nav>
//             <div className='row my-3 offset-top' style={{}}>
//                 <div className="col-lg-6" style={{paddingLeft:'200px', paddingTop:'100px'}}>
//                         <h1 className='text-start text-primary display-4' style={{fontFamily:'fantasy'}}>Attendance</h1>
//                         <h1 className='text-start text-primary display-4' style={{fontFamily:'fantasy'}}>Management</h1>
//                         <h1 className='text-start text-primary display-4' style={{fontFamily:'fantasy'}}>System</h1>
//                 </div>
//                 <div className='col-lg-6'>
//                     <img src={bg} className='img-fluid' alt='' style={{height:'400px', paddingLeft:'50px'}} />
//                 </div>
//             </div>
//             <div className='row my-5 mx-3'>
//                     <h3 className='text-center p-2 ' style={{color:'#1d2b53', fontFamily:'fantasy'}}>
//                          Just the beginning. 
//                     </h3>
//                     <h3 className='text-center p-2 ' style={{color:'#1d2b53', fontFamily:'fantasy'}}>
//                          More exciting features on the horizon.
//                     </h3>
//             </div>

//         </div>
//     )
// }







// import React from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import logo from '../../Assests/Images/gstlogo.png'
// import bg from '../../Assests/Images/Wavy_Tech-17_Single-03.jpg'
// import './styles/HomePage.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser } from '@fortawesome/free-solid-svg-icons';


// export default function HomePage() {

//     const navigate = useNavigate();

//     const toLogin=()=>{
//         navigate('/login');
//     }
//     return (
//         <>
//             <nav className='container fixed-top bg-white shadow-none' style={{paddingLeft:'100px', paddingRight:'100px', zIndex:'999'}}>
//                 <div className='row d-flex justify-content-center'>
//                     <div className='col-lg-3 d-flex justify-content-center'>
//                         <Link className="" to='/'>
//                             <img src={logo} className='img-fluid img-logo' alt=''/>
//                         </Link>
//                     </div>
//                     <div className='col-lg-7 d-flex justify-content-end align-items-end flex-column'>
//                         <div className='row'>
//                             <div className='col-12'>
//                                 <h4 className='p-1 text-danger' style={{fontFamily:'fantasy'}}>SIES Graduate School of Technology</h4>
//                             </div>
//                             <div className='col-12'>
//                                 <h4 className='p-1 text-primary' style={{fontFamily:'fantasy'}}>Accredited with NAAC A+ Grade and NBA Accredited</h4>
//                             </div>
//                             <div className='col-12'>
//                                 <a href='https://www.siesgst.edu.in'target='blank' className='p-1 text-success text-decoration-none' style={{fontFamily:'fantasy', fontSize:'24px'}} alt='' >www.siesgst.edu.in</a>
//                             </div>
//                         </div>
//                     </div>
//                     <div className='col-lg-2 d-flex flex-column'>
//                         <div className=''>
//                             <button className='border-0 bg-transparent py-3' onClick={toLogin}>
//                                 <FontAwesomeIcon icon={faUser} size='xl' />
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </nav>


//             <div className='container shadow-none' style={{ /*boxShadow: '0 0 3px grey',*/ minHeight:'100vh', /* backgroundImage:`url(${bg})`*/ }}>
//             <div className='row my-3 offset-top' style={{}}>
//                 <div className="col-lg-6" style={{paddingLeft:'200px', paddingTop:'100px'}}>
//                         <h1 className='text-start text-primary display-4' style={{fontFamily:'fantasy'}}>Attendance</h1>
//                         <h1 className='text-start text-primary display-4' style={{fontFamily:'fantasy'}}>Management</h1>
//                         <h1 className='text-start text-primary display-4' style={{fontFamily:'fantasy'}}>System</h1>
//                 </div>
//                 <div className='col-lg-6'>
//                     <img src={bg} className='img-fluid' alt='' style={{height:'400px', paddingLeft:'50px'}} />
//                 </div>
//             </div>
//             <div className='row my-5 mx-3'>
//                     <h3 className='text-center p-2 ' style={{color:'#1d2b53', fontFamily:'fantasy'}}>
//                          Just the beginning. 
//                     </h3>
//                     <h3 className='text-center p-2 ' style={{color:'#1d2b53', fontFamily:'fantasy'}}>
//                          More exciting features on the horizon.
//                     </h3>
//             </div>

//         </div>
//         </>
//     )
// }





// import React, { useState, useEffect } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBars } from '@fortawesome/free-solid-svg-icons';
// import { faXmark } from '@fortawesome/free-solid-svg-icons';
// import { Link } from 'react-router-dom';
// import logo from '../../Assests/Images/gstlogo.png';
// import './styles/HomePage.css';

// export default function HomePage() {

//   const [menuOption, setMenuOption] = useState(true);
//   const [sentenceIndex, setSentenceIndex] = useState(0);

//   const sentences = [
//     'SIES Graduate School of Technology',
//     'Accredited with NAAC A+ Grade and NBA Accredited',
//     'www.siesgst.edu.in',
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setSentenceIndex(prevIndex => (prevIndex + 1) % sentences.length);
//     }, 10000); // Change sentence every 10 seconds

//     return () => clearInterval(interval); // Cleanup interval on component unmount
//   }, []);

//   return (
//     <div>
//         <div className='container-fluid px-5' style={{height:'auto', backgroundColor:''}}>

            
//             <div className='row' style={{borderBottom: '1px solid black'}}>


//                   <div className='nav-1 col col-lg-3'>
//                     <Link className="text-decoration-none d-flex justify-content-start align-items-center" to='/' style={{height:'300px'}}>
//                         <img src={logo} className='img-fluid img-logo' alt='' style={{height:'200px'}} />
//                     </Link>
//                   </div>

//                   <div className='nav-2 col col-lg-7 d-flex align-items-center justify-content-center' style={{paddingLeft:'50px', paddingRight:'50px'}}>
//                     <div className='sentence-display'>
//                       {sentences[sentenceIndex] === 'www.siesgst.edu.in' ? (
//                         <a href={`http://${sentences[sentenceIndex]}`} className='text-decoration-none text-dark display-4' target="_blank" rel="noopener noreferrer">
//                           {sentences[sentenceIndex]}
//                         </a>
//                       ) : (
//                         <h4 className='display-4 text-center'>{sentences[sentenceIndex]}</h4>
//                       )}
//                     </div>
//                   </div>

//                   <div className='nav-3 col col-lg-2'>
//                     <div className='menu-btn d-flex justify-content-end align-items-center' style={{height:'300px'}}>
//                       <button className='border-0 bg-transparent' onClick={()=>setMenuOption(!menuOption)}>
//                         {
//                           menuOption ? <FontAwesomeIcon icon={faBars} style={{height:'100px'}} /> : <FontAwesomeIcon icon={faXmark} style={{height:'100px'}}  />

//                         }
//                       </button>
//                     </div>
//                   </div>


//             </div>

//             <div className={`row homePageHiddenNav ${menuOption ? 'hidden' : 'visible'}`} style={{}}>
//                 <div className='d-flex justify-content-end align-items-center'>
//                     <div className='px-5'>
//                       <Link to='/login' className='display-5 text-decoration-none text-dark'>
//                         Login
//                       </Link>
//                     </div>
//                     <div className='px-5'>
//                       <Link to='/signup' className='display-5 text-decoration-none text-dark'>
//                         Sign Up
//                       </Link>
//                     </div>
//                 </div>
//             </div>


//             <div className='row'>
//               <div className='col-12 d-flex justify-content-center align-items-center flex-column' style={{height:'200px'}}>
//                   <h5 className='display-4 text-warning'>Welcome to</h5>
//               </div>

//               <div className='col-12 d-flex justify-content-center align-items-center flex-column' style={{height:'100px'}}>
//                   <h4 className='display-3 text-success'>Attendance Tracking & Management System</h4>
//               </div>


//               <div className='col-12 d-flex justify-content-center align-items-center flex-column text-danger' style={{height:'300px'}}>
//                 <p style={{fontSize:'2rem'}}>
//                 We’re excited to launch the first phase of our new attendance management system.
//                 </p>
//                 <p style={{fontSize:'2rem'}}>
//                 Our goal is to make tracking and managing attendance simpler and more efficient.
//                 </p>
//               </div>
//             </div>  



//             <footer className='row'>
//               <div className='col-12 d-flex justify-content-center align-items-end'>
//                 <h5 className='display-5 text-info'>Stay tuned as we continue to enhance the system with more features.</h5>
//               </div>
//             </footer>        



//         </div> 
//     </div> 
//   )
// }



import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import logo from '../../Assests/Images/gstlogo.png';
import './styles/HomePage.css';

export default function HomePage() {
  const [menuOption, setMenuOption] = useState(true);
  const [sentenceIndex, setSentenceIndex] = useState(0);

  const sentences = [
    'SIES Graduate School of Technology',
    'Accredited with NAAC A+ Grade and NBA Accredited',
    'www.siesgst.edu.in',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSentenceIndex((prevIndex) => (prevIndex + 1) % sentences.length);
    }, 10000); // Change sentence every 10 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="homePageNav" id='homePageNav'>
      <div className='container-fluid px-5' style={{height:'auto', backgroundColor:''}}>
        <div className='row' style={{borderBottom: '1px solid black'}}>
          <div className='nav-1 col col-lg-3'>
            <Link className="text-decoration-none d-flex justify-content-start align-items-center" to='/' style={{height:'300px'}}>
              <img src={logo} className='img-fluid img-logo' alt='' style={{height:'200px'}} />
            </Link>
          </div>

          <div className='nav-2 col col-lg-7 d-flex align-items-center justify-content-center' style={{paddingLeft:'50px', paddingRight:'50px'}}>
            <div className='sentence-display'>
              {sentences[sentenceIndex] === 'www.siesgst.edu.in' ? (
                <a href={`http://${sentences[sentenceIndex]}`} className='text-decoration-none text-dark display-4' target="_blank" rel="noopener noreferrer">
                  {sentences[sentenceIndex]}
                </a>
              ) : (
                <h4 className='display-4 text-center'>{sentences[sentenceIndex]}</h4>
              )}
            </div>
          </div>

          <div className='nav-3 col col-lg-2'>
            <div className='menu-btn d-flex justify-content-end align-items-center' style={{height:'300px'}}>
              <button className='border-0 bg-transparent' onClick={() => setMenuOption(!menuOption)}>
                {menuOption ? (
                  <FontAwesomeIcon icon={faBars} style={{height:'100px'}} />
                ) : (
                  <FontAwesomeIcon icon={faXmark} style={{height:'100px'}} />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className={`row homePageHiddenNav ${menuOption ? 'hidden' : 'visible'}`}>
          <div className='d-flex justify-content-end align-items-center'>
            <div className='px-5'>
              <Link to='/login' className='display-5 text-decoration-none text-dark'>
                Login
              </Link>
            </div>
            <div className='px-5'>
              <Link to='/signup' className='display-5 text-decoration-none text-dark'>
                Sign Up
              </Link>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-12 d-flex justify-content-center align-items-center flex-column' style={{height:'200px'}}>
            <h5 className='display-4 text-warning'>Welcome to</h5>
          </div>

          <div className='col-12 d-flex justify-content-center align-items-center flex-column' style={{height:'100px'}}>
            <h4 className='display-3 text-success'>Attendance Tracking & Management System</h4>
          </div>

          <div className='col-12 d-flex justify-content-center align-items-center flex-column text-danger' style={{height:'300px'}}>
            <p style={{fontSize:'2rem'}}>
              We’re excited to launch the first phase of our new attendance management system.
            </p>
            <p style={{fontSize:'2rem'}}>
              Our goal is to make tracking and managing attendance simpler and more efficient.
            </p>
          </div>
        </div>

        <footer className='row'>
          <div className='col-12 d-flex justify-content-center align-items-end'>
            <h5 className='display-5 text-info'>Stay tuned as we continue to enhance the system with more features.</h5>
          </div>
        </footer>
      </div>
    </div>
  );
}
