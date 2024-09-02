

// import React from 'react'
// import { Link } from 'react-router-dom'
// import logo from '../../Assests/Images/gstlogo.png'
// // import bg from '../../Assests/Images/image.png'
// import './styles/HomePage.css';

// export default function HomePage() {
//     return (
//         <div className='container shadow-none' style={{ /*boxShadow: '0 0 3px grey',*/ minHeight:'100vh', /* backgroundImage:`url(${bg})`*/ }}>
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
//             <div className='row my-3 pt-3' style={{}}>
//                 <div classname="">
//                     <h1 className='text-center ' style={{color:'#ff8d1a'}}>Welcome to Attendance Tracker</h1>
//                     <p className='text-center' style={{color:'#1d2b53'}}>Keep track of student attendance efficiently and easily.</p>
//                     <div className='d-flex justify-content-center align-items-center'>
//                         <Link to='/signup' className='btn btn-primary btn-custom mx-3' style={{ boxShadow: '0 0 3px grey' }}>Sign Up</Link>
//                         <Link to='/login' className='btn btn-success btn-custom mx-3' style={{ boxShadow: '0 0 3px grey' }}>Login</Link>
//                     </div>
//                     <div className='my-5 mx-3'>
//                         <h3 className='text-center p-2 ' style={{color:'#1d2b53'}}>
//                         Just the beginning. 
//                         </h3>
//                         <h3 className='text-center p-2 ' style={{color:'#1d2b53'}}>
//                         More exciting features on the horizon.
//                         </h3>
//                     </div>
//                 </div>
//             </div>

//         </div>
//     )
// }




import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../Assests/Images/gstlogo.png'
import bg from '../../Assests/Images/Wavy_Tech-17_Single-03.jpg'
import './styles/HomePage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';


export default function HomePage() {

    const navigate = useNavigate();

    const toLogin=()=>{
        navigate('/login');
    }
    return (
        <div className='container shadow-none' style={{ /*boxShadow: '0 0 3px grey',*/ minHeight:'100vh', /* backgroundImage:`url(${bg})`*/ }}>
            <nav className='row fixed-top bg-white' style={{paddingLeft:'100px', paddingRight:'100px', zIndex:'999'}}>
                    <div className='col-6 d-flex'>
                        <Link className="" to='/'>
                            <img src={logo} className='img-fluid img-logo' alt=''/>
                        </Link>
                    </div>
                    <div className='col-6 d-flex justify-content-end align-items-end flex-column'>
                        <div className='row'>
                        <div className='col-10'>
                        <h4 className='p-1 text-danger' style={{fontFamily:'fantasy'}}>SIES Graduate School of Technology</h4>
                        <p className='p-1 text-primary' style={{fontFamily:'fantasy'}}>Accredited with NAAC A+ Grade and NBA Accredited</p>
                        <a href='https://www.siesgst.edu.in'target='blank' className='p-1 text-success text-decoration-none' style={{fontFamily:'fantasy'}} alt=''>www.siesgst.edu.in</a>
                        </div>
                        <div className='col-2 d-flex flex-column'>
                            <div className=''>
                                <button className='border-0 bg-transparent py-3' onClick={toLogin}>
                                    <FontAwesomeIcon icon={faUser} size='xl' />
                                </button>
                            </div>
                            
                        </div>
                        </div>
                    </div>
            </nav>
            <div className='row my-3 offset-top' style={{}}>
                <div className="col-lg-6" style={{paddingLeft:'200px', paddingTop:'100px'}}>
                        <h1 className='text-start text-primary display-4' style={{fontFamily:'fantasy'}}>Attendance</h1>
                        <h1 className='text-start text-primary display-4' style={{fontFamily:'fantasy'}}>Management</h1>
                        <h1 className='text-start text-primary display-4' style={{fontFamily:'fantasy'}}>System</h1>
                </div>
                <div className='col-lg-6'>
                    <img src={bg} className='img-fluid' alt='' style={{height:'400px', paddingLeft:'50px'}} />
                </div>
            </div>
            <div className='row my-5 mx-3'>
                    <h3 className='text-center p-2 ' style={{color:'#1d2b53', fontFamily:'fantasy'}}>
                         Just the beginning. 
                    </h3>
                    <h3 className='text-center p-2 ' style={{color:'#1d2b53', fontFamily:'fantasy'}}>
                         More exciting features on the horizon.
                    </h3>
            </div>

        </div>
    )
}



