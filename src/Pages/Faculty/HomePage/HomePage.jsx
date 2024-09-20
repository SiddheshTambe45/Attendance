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
import IndividualRecordCard from './IndividualRecordCard';
import AttendanceTable from './AttendanceTable';
import CardForHomePage from './CardForHomePage';
import { faHouse, faChartSimple, faMessage, faBookmark, faPerson, faGear, faBell, faUser, faRightFromBracket, faBars, faXmark, faCircleUser, faArrowUp } from '@fortawesome/free-solid-svg-icons';

export default function HomePage() {


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

    const recordSummaryView = {
        id: 1,
        date: "2024-09-14T10:00:00Z",
        subject: "Data Structures",
        branch: "Computer Science",
        semester: "5th",
        division: "A",
        studentsPresent: 30,
        studentsAbsent: 5,
        lastUpdated: "2024-09-14T15:45:00Z"
      }
      


  return (
    <div>

        <MainNavbar />
   
      {/* <div className='container'>

        <div className='row' style={{ backgroundColor: '' }}>
          <div className='row'>
            <section className='d-flex justify-content-evenly'>

              <CardForHomePage title='Total Students' value='185' icon={faCircleUser} logoColour={'green'} />

              <CardForHomePage title='Avg Attendance' value='69%' icon={faChartSimple} logoColour={'primary'} />

              <CardForHomePage title='Avg Attendance' value='69%' icon={faChartSimple} logoColour={'aqua'} />

              <CardForHomePage title='New Messages' value='15' icon={faMessage} logoColour={'orange'} />


            </section>
          </div>
        </div>

        <div className='row p-3' >
          <div className='rounded-3 border'>
            <h4 className='fw-light ps-4 py-3'>Last Updated Attendance</h4>
            <AttendanceTable />
          </div>
        </div>


      </div> */}

       
    </div>
  )
}




/*
import React, {useState} from 'react';
import logo from '../../../Assests/Images/gstlogo.png'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faChartSimple, faMessage, faPerson, faGear, faBell, faUser, faRightFromBracket, faBars, faXmark, faCircleUser, faArrowUp, faChartLine, faHouseUser, faBookmark } from '@fortawesome/free-solid-svg-icons';
// import { } from '@fortawesome/free-regular-svg-icons';
import './styles/HomePage.css';
import CardForHomePage from './CardForHomePage';
import AttendanceTable from './AttendanceTable';

const HomePageFaculty = () => {


  return (
   <div className='HomePageFaculty' id='HomePageFaculty'>
    <div className='container-fluid' style={{height:'100vh'}}>
      <div className='row'>

        <div className='navigation col-lg-3 d-none d-lg-block min-vh-100' style={{ overflowY: 'auto', boxShadow:'0 4px 6px grey'}}>

            <div className='row'>
              <div className='logo d-flex justify-content-center p-2' style={{ height: '150px', width: '100%' }}>
                <img src={logo} className='img-fluid' alt='SIES GST LOGO' />
              </div>
            </div>

            <div className='row my-5'>
              <div className='SideNav' style={{ paddingLeft: '30px', fontSize: '1rem', marginTop: '15px' }}>
                <Link to='/faculty/' className='text-decoration-none text-dark' >
                <div className='SideNav-item dashboard row d-flex align-items-center py-3' style={{ marginBottom: '5px' }}>
                  <div className='col-2 d-flex justify-content-center'>
                    <FontAwesomeIcon icon={faHouse} size='2xl' />
                  </div>
                  <div className='col-7 d-flex justify-content-start'>
                    <h4 className='fw-bolder' style={{color:'#ff9200'}}>Dashboard</h4>
                  </div>
                </div>
                </Link>
                <Link to='/faculty/attendanceUpdate' className='text-decoration-none text-dark' >
                <div className='SideNav-item analytics row d-flex align-items-center py-3' style={{ marginBottom: '5px' }}>
                  <div className='col-2 d-flex justify-content-center'>
                    <FontAwesomeIcon icon={faChartSimple} size='2xl' />
                  </div>
                  <div className='col-7 d-flex justify-content-start'>
                    <h4 className='fw-bolder' style={{color:'#ff9200'}}>Attendance Update</h4>
                  </div>
                </div>
                </Link>
                <Link to='/faculty/reportPage' className='text-decoration-none text-dark' >
                <div className='SideNav-item users row d-flex align-items-center py-3' style={{ marginBottom: '5px' }}>
                  <div className='col-2 d-flex justify-content-center'>
                    <FontAwesomeIcon icon={faBookmark} size='2xl' />
                  </div>
                  <div className='col-7 d-flex justify-content-start'>
                    <h4 className='fw-bolder' style={{color:'#ff9200'}}>Attendance Report</h4>
                  </div>
                </div>
                </Link>
                <Link to='/faculty/' className='text-decoration-none text-dark' >
                <div className='SideNav-item messages row d-flex align-items-center py-3' style={{ marginBottom: '5px' }}>
                  <div className='col-2 d-flex justify-content-center'>
                    <FontAwesomeIcon icon={faMessage} size='2xl' />
                  </div>
                  <div className='col-7 d-flex justify-content-start'>
                    <h4 className='fw-bolder' style={{color:'#ff9200'}}>Messages</h4>
                  </div>
                </div>
                </Link>
                <Link to='/faculty/' className='text-decoration-none text-dark' >
                <div className='SideNav-item users row d-flex align-items-center py-3' style={{ marginBottom: '5px' }}>
                  <div className='col-2 d-flex justify-content-center'>
                    <FontAwesomeIcon icon={faPerson} size='2xl' />
                  </div>
                  <div className='col-7 d-flex justify-content-start'>
                    <h4 className='fw-bolder' style={{color:'#ff9200'}}>Students</h4>
                  </div>
                </div>
                </Link>
              </div>
            </div>

            <div className='row my-5'>
              <div className='SideNav' style={{ paddingLeft: '30px', fontSize: '1rem', marginTop: '15px' }}>
                <div className='SideNav-item settings row d-flex align-items-center py-3' style={{ marginBottom: '5px' }}>
                  <div className='col-2 d-flex justify-content-center'>
                    <FontAwesomeIcon icon={faGear} size='2xl' />
                  </div>
                  <div className='col-7 d-flex justify-content-start'>
                    <h4 className='fw-bolder' style={{color:'#ff9200'}}>Settings</h4>
                  </div>
                </div>
                <div className='SideNav-item notifications row d-flex align-items-center py-3' style={{ marginBottom: '5px' }}>
                  <div className='col-2 d-flex justify-content-center'>
                    <FontAwesomeIcon icon={faBell} size='2xl' />
                  </div>
                  <div className='col-7 d-flex justify-content-start'>
                    <h4 className='fw-bolder' style={{color:'#ff9200'}}>Notifications</h4>
                  </div>
                </div>
              </div>
            </div>

            <div className='row my-5'>
              <div className='SideNav' style={{ paddingLeft: '30px', fontSize: '1rem', marginTop: '15px' }}>
                <div className='SideNav-item account row d-flex align-items-center py-3' style={{ marginBottom: '5px' }}>
                  <div className='col-2 d-flex justify-content-center'>
                    <FontAwesomeIcon icon={faUser} size='2xl' />
                  </div>
                  <div className='col-7 d-flex justify-content-start'>
                    <h4 className='fw-bolder' style={{color:'#ff9200'}}>Account</h4>
                  </div>
                </div>
                <div className='SideNav-item logout row d-flex align-items-center py-3' style={{ marginBottom: '5px' }}>
                  <div className='col-2 d-flex justify-content-center'>
                    <FontAwesomeIcon icon={faRightFromBracket} size='2xl' />
                  </div>
                  <div className='col-7 d-flex justify-content-start'>
                    <h4 className='fw-bolder' style={{color:'#ff9200'}}>Logout</h4>
                  </div>
                </div>
              </div>
            </div>

        </div>

        <div className='col'>

          <div className='row py-3'>
            <h1 className='fw-bolder text-primary'>Attendance Tracking and Management System</h1>
          </div>

          <div className='row' style={{backgroundColor:''}}>
            <div className='row'>
              <section className='d-flex py-3 justify-content-between'>
                  
                  <CardForHomePage title='Total Students' value='185' icon={faCircleUser} logoColour={'green'} />

                  <CardForHomePage title='Avg Attendance' value='69%' icon={faChartSimple} logoColour={'primary'} />

                  <CardForHomePage title='Avg Attendance' value='69%' icon={faChartSimple} logoColour={'pink'} />
 
                  <CardForHomePage title='New Messages' value='15' icon={faMessage} logoColour={'orange'} />


              </section>
            </div>
          </div>

          <div className='row p-3' >
            <div className='rounded-3' style={{backgroundColor:'offwhite', boxShadow:'0 0 6px grey'}}>
            <h4 className='fw-bolder text-primary py-3'>Last Updated Attendance</h4>
            <AttendanceTable />
            </div>
          </div>


        </div>


      </div>
    </div>
   </div>
  );
};

export default HomePageFaculty;
*/

// import React from 'react';
// import logo from '../../../Assests/Images/gstlogo.png';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHouse, faChartSimple, faMessage, faBookmark, faPerson, faGear, faBell, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
// import './styles/HomePage.css';

// const HomePageFaculty = () => {
//   return (
//     <div className='HomePageFaculty' id='HomePageFaculty'>
//       <div className='container-fluid' style={{height:'100vh'}}>
//         <div className='row'>
//           <div className='col-lg-3 col-0 min-vh-100 bg-light sidebar'>
//             <div className='logo d-flex justify-content-center p-2' style={{ height: '150px', width: '100%' }}>
//               <img src={logo} className='img-fluid' alt='SIES GST LOGO' />
//             </div>
//             <div className='scrollable-content'>
//               <div className='row my-5'>
//                 <div className='SideNav' style={{ paddingLeft: '30px', fontSize: '1rem', marginTop: '15px' }}>
//                   <div className='SideNav-item dashboard row d-flex align-items-center py-3' style={{ marginBottom: '5px' }}>
//                     <div className='col-2 d-flex justify-content-center'>
//                       <FontAwesomeIcon icon={faHouse} />
//                     </div>
//                     <div className='col-7 d-flex justify-content-start'>
//                       <h4>Dashboard</h4>
//                     </div>
//                   </div>
//                   <div className='SideNav-item analytics row d-flex align-items-center py-3' style={{ marginBottom: '5px' }}>
//                     <div className='col-2 d-flex justify-content-center'>
//                       <FontAwesomeIcon icon={faChartSimple} />
//                     </div>
//                     <div className='col-7 d-flex justify-content-start'>
//                       <h4>Analytics</h4>
//                     </div>
//                   </div>
//                   <div className='SideNav-item messages row d-flex align-items-center py-3' style={{ marginBottom: '5px' }}>
//                     <div className='col-2 d-flex justify-content-center'>
//                       <FontAwesomeIcon icon={faMessage} />
//                     </div>
//                     <div className='col-7 d-flex justify-content-start'>
//                       <h4>Messages</h4>
//                     </div>
//                   </div>
//                   <div className='SideNav-item collections row d-flex align-items-center py-3' style={{ marginBottom: '5px' }}>
//                     <div className='col-2 d-flex justify-content-center'>
//                       <FontAwesomeIcon icon={faBookmark} />
//                     </div>
//                     <div className='col-7 d-flex justify-content-start'>
//                       <h4>Collections</h4>
//                     </div>
//                   </div>
//                   <div className='SideNav-item users row d-flex align-items-center py-3' style={{ marginBottom: '5px' }}>
//                     <div className='col-2 d-flex justify-content-center'>
//                       <FontAwesomeIcon icon={faPerson} />
//                     </div>
//                     <div className='col-7 d-flex justify-content-start'>
//                       <h4>Users</h4>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className='row my-5'>
//                 <div className='SideNav' style={{ paddingLeft: '30px', fontSize: '1rem', marginTop: '15px' }}>
//                   <div className='SideNav-item settings row d-flex align-items-center py-3' style={{ marginBottom: '5px' }}>
//                     <div className='col-2 d-flex justify-content-center'>
//                       <FontAwesomeIcon icon={faGear} />
//                     </div>
//                     <div className='col-7 d-flex justify-content-start'>
//                       <h4>Settings</h4>
//                     </div>
//                   </div>
//                   <div className='SideNav-item notifications row d-flex align-items-center py-3' style={{ marginBottom: '5px' }}>
//                     <div className='col-2 d-flex justify-content-center'>
//                       <FontAwesomeIcon icon={faBell} />
//                     </div>
//                     <div className='col-7 d-flex justify-content-start'>
//                       <h4>Notifications</h4>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className='row my-5'>
//                 <div className='SideNav' style={{ paddingLeft: '30px', fontSize: '1rem', marginTop: '15px' }}>
//                   <div className='SideNav-item account row d-flex align-items-center py-3' style={{ marginBottom: '5px' }}>
//                     <div className='col-2 d-flex justify-content-center'>
//                       <FontAwesomeIcon icon={faPerson} />
//                     </div>
//                     <div className='col-7 d-flex justify-content-start'>
//                       <h4>Account</h4>
//                     </div>
//                   </div>
//                   <div className='SideNav-item logout row d-flex align-items-center py-3' style={{ marginBottom: '5px' }}>
//                     <div className='col-2 d-flex justify-content-center'>
//                       <FontAwesomeIcon icon={faRightFromBracket} />
//                     </div>
//                     <div className='col-7 d-flex justify-content-start'>
//                       <h4>Logout</h4>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className='col-lg-7 col-12'>
//             f
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomePageFaculty;
