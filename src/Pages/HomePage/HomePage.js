

import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../Assests/Images/gstlogo.png'
import './styles/HomePage.css';

export default function HomePage() {
    return (
        <div className='container' style={{ boxShadow: '0 0 3px grey' }}>
            <nav classname='navbar bg-body-tertiary '>
                <div className='row px-5'>
                    <div className='col-6 d-flex'>
                        <Link className="navbar-brand" to='/'>
                            <img src={logo} className='img-fluid img-logo' alt=''/>
                        </Link>
                    </div>
                    <div className='col-6 d-flex justify-content-end align-items-end flex-column'>
                        <h4 className='p-2 text-danger'>SIES Graduate School of Technology</h4>
                        <p className='p-2  text-primary'>Accredited with NAAC A+ Grade and NBA Accredited</p>
                        <p className='p-2  text-success'>www.siesgst.edu.in</p>
                    </div>
                </div>
            </nav>
            <div className='row my-3 pt-3' style={{}}>
                <div classname="">
                    <h1 className='text-center ' style={{color:'#ff8d1a'}}>Welcome to Attendance Tracker</h1>
                    <p className='text-center' style={{color:'#1d2b53'}}>Keep track of student attendance efficiently and easily.</p>
                    <div className='d-flex justify-content-center align-items-center'>
                        <Link to='/signup' className='btn btn-primary btn-custom mx-3' style={{ boxShadow: '0 0 3px grey' }}>Sign Up</Link>
                        <Link to='/login' className='btn btn-success btn-custom mx-3' style={{ boxShadow: '0 0 3px grey' }}>Login</Link>
                    </div>
                    <div className='my-5 mx-3'>
                        <h3 className='text-center p-2 ' style={{color:'#1d2b53'}}>
                        Just the beginning. 
                        </h3>
                        <h3 className='text-center p-2 ' style={{color:'#1d2b53'}}>
                        More exciting features on the horizon.
                        </h3>
                    </div>
                </div>
            </div>

        </div>
    )
}




// import React from 'react'
// import { Link } from 'react-router-dom'
// import logo from '../../Assests/Images/gstlogo.png'
// import './styles/HomePage.css';

// export default function HomePage() {
//     return (
//         <div className='container' style={{ minHeight: '100vh', /* boxShadow: '0 0 3px grey' */}}>
//             <nav className="navbar bg-body-tertiary">
//                 <div className="container-fluid">
//                     <Link className="navbar-brand" to='/'>
//                         <img src={logo} className='img-fluid img-logo' alt=''/>
//                     </Link>
//                     <div className='' style={{fontFamily:''}}>
//                         <h4>SIES Graduate School of Technology</h4>
//                         <p>Accredited with NAAC A+ Grade and NBA Accredited</p>
//                         <p>www.siesgst.edu.in</p>
//                     </div>  
//                     <div className="d-flex align-items-center">
//                         <div classname='home-btn'>
//                             <button className='btn fw-light text-dark' to='/' style={{fontSize:'1.5rem'}}>Home</button>
//                         </div>  
//                         <div classname='login-btn'>
//                             <button className='btn fw-light text-dark' to='/login' style={{fontSize:'1.5rem'}}>Login</button>
//                         </div>
//                         <div classname='submit-btn'>
//                             <button className='btn btn-warning fw-bold text-dark border-dark' to='/register'>Register</button>
//                         </div>
//                     </div>
//                 </div>
//             </nav>

//             <div className='row px-5'>
//                 <div className='col-lg-6'>
//                     <div className='d-flex justify-content-center align-items-start flex-column' style={{paddingTop:'100px',fontFamily:'Helvetica'}}>
//                         <h2>
//                         Track.
//                         </h2>
//                         <h2>
//                         Manage. Simplify
//                         </h2>
//                     </div>
//                 </div>
//             </div>

//         </div>
//     )
// }
