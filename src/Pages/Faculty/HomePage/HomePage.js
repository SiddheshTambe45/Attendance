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



import React from 'react';
import {Link} from 'react-router-dom';
import Logout from '../../Authentication/Logout/Logout'
import logo from '../../../Assests/Images/gstlogo.png'
import MainNavbar from './MainNavbar';

export default function HomePage() {

   const profileData = {
     Name: 'Siddhesh Tambe',
     Id: 'FE101',
     Department: 'IOT',
   }

  return (
    <div>

        <MainNavbar />

        <div className='container'>
            <div className='row'>

            </div>
        </div>
         

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
