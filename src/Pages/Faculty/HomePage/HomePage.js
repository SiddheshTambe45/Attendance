// import React from 'react';
// import {Link} from 'react-router-dom';
// import Logout from '../../Authentication/Logout/Logout'
// import logo from '../../../Assests/Images/gstlogo.png'

// export default function HomePage() {

   

//   return (
//     <div>
//         <div className='container' style={{minHeight:'100vh', height:'auto'}}>
//             <nav classname='navbar bg-body-tertiary '>
//                 <div className='row px-5'>
//                     <div className='col-6 d-flex'>
//                         <Link className="navbar-brand" to='/'>
//                             <img src={logo} className='img-fluid img-logo' alt=''/>
//                         </Link>
//                     </div>
//                     <div className='col-6 d-flex justify-content-end align-items-end flex-column'>
//                         <h4 className='p-2 text-danger'>SIES Graduate School of Technology</h4>
//                         <p className='p-2  text-primary'>Accredited with NAAC A+ Grade and NBA Accredited</p>
//                         <p className='p-2  text-success'>www.siesgst.edu.in</p>
//                     </div>
//                 </div>
//             </nav>
//             <div className='row'>
//                 <h2 className='text-center'>
//                     HomePage
//                 </h2>    
//                 <div className='d-flex justify-content-center flex-column align-items-center p-5'>
//                     <Link to='/faculty/attendanceUpdate' >
//                         <button className='btn' style={{fontSize:'3rem'}}>
//                             Attendance Update
//                         </button>
//                     </Link>

//                     <Link to='/faculty/reportPage' >
//                         <button className='btn' style={{fontSize:'3rem'}}>
//                             Report Page
//                         </button>
//                     </Link>

//                     <div>
//                         <Logout />
//                     </div>

//                     {/* <Link to='/faculty/leave' >
//                         <button className='btn' style={{fontSize:'3rem'}}>
//                             Leave Page
//                         </button>
//                     </Link> */}
//                 </div>
//             </div>
//         </div>
//     </div>
//   )
// }



import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Logout from '../../Authentication/Logout/Logout'
import logo from '../../../Assests/Images/gstlogo.png'
import MainNavbar from './MainNavbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud } from '@fortawesome/free-solid-svg-icons';

export default function HomePage() {

    alert("visited faculty and boom back, ig")

//     const [formattedDate, setFormattedDate] = useState('');
//     const [formattedTime, setFormattedTime] = useState('');

//     const profileData = {
//         Name: 'Siddhesh Tambe',
//         Id: 'FE101',
//         Department: 'IOT',
//     }

//     useEffect(() => {
//   const intervalId = setInterval(() => {
//     const now = new Date();
//     const hours = now.getHours().toString().padStart(2, '0');
//     const minutes = now.getMinutes().toString().padStart(2,   
//  '0');
//     const seconds = now.getSeconds().toString().padStart(2, '0');
//     const AMPM = hours >= 12 ? 'PM' : 'AM';
//     const   
//  dayOfMonth = now.getDate();
//     const ordinalSuffix = getOrdinalSuffix(dayOfMonth);
//     const month = now.toLocaleString('en-US', { month: 'long' });
//     const year = now.getFullYear();

//     setFormattedDate(`${dayOfMonth}${ordinalSuffix} ${month} ${year}`);
//     setFormattedTime(`${hours}:${minutes}:${seconds} ${AMPM}`);
//   }, 1000);

//   return () => clearInterval(intervalId);
// }, []);

// function getOrdinalSuffix(day) {
//   if (day > 3 && day < 21) {
//     return 'th';
//   }
//   switch (day % 10) {
//     case 1:
//       return 'st';
//     case 2:
//       return 'nd';
//     case 3:
//       return 'rd';
//     default:
//       return 'th';
//   }
// }

  return (
    <div>

        <MainNavbar />

        {/* <div className='container-fluid shadow-none py-3' style={{backgroundColor:'#f5f2ec'}}>
            <div className='row'>

                <div className='col-8 mx-auto'>
                    <div className='row'>
                        <div className='col-3' style={{height:"300px"}}>
                            <div className='shadow rounded p-3 bg-light m-0' > 
                                <div className='' style={{height:'100px'}}>
                                    <FontAwesomeIcon icon={faCloud} style={{fontSize:'1.5rem'}} /> <span className=' ' style={{fontSize:'1.5rem'}}>{formattedTime}</span>
                                </div>
                                <div className='' style={{height:'150px'}}>
                                    <h2>Today:</h2>
                                    <h2>{formattedDate.split(" ")[0]} {formattedDate.split(" ")[1]}</h2>
                                    <h2>{formattedDate.split(" ")[2]}</h2>
                                </div>
                            </div>
                        </div>

                        <div className='col-9' style={{height:"300px"}}>
                            
                        </div>
                    </div>
                </div>
                
                
                
            </div>
        </div> */}
         

        <div className='container shadow-none' style={{ height:'auto'}}>
            <div className='row'>
                  
                <div className='d-flex justify-content-center flex-column align-items-center p-5'>

                    <div>
                        <Logout />
                    </div>

                </div>
            </div>
        </div>
    </div>
  )
}
