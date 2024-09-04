import React from 'react';
import {Link} from 'react-router-dom';
import Logout from '../../Authentication/Logout/Logout'
import logo from '../../../Assests/Images/gstlogo.png'
import { useSelector } from 'react-redux';


export default function HomePage() {

    const { department } = useSelector((state)=> state.auth);


  return (
    <div>
        <div className='container' style={{minHeight:'100vh', height:'auto'}}>
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
            <div className='row'>
                <h2 className='text-center'>
                    HomePage
                </h2>    
                <div className='d-flex justify-content-center flex-column align-items-center p-5'>
                    <Link to='/hod/report' >
                        <button className='btn bg-transparent text-dark' style={{fontSize:'3rem'}}>
                            Report Page
                        </button>
                    </Link>

                    <Link to='/hod/allocation' >
                        <button className='btn bg-transparent text-dark' style={{fontSize:'3rem'}}>
                            Allocation Fac-Sub
                        </button>
                    </Link>

                    {
                        department !== 'FIRST_YEAR' ? (
                            <Link to='/hod/upload' >
                                <button className='btn bg-transparent text-dark' style={{fontSize:'3rem'}}>
                                    Upload Students
                                </button>
                            </Link>
                        ) : ''
                    }

                    <Link to='/hod/roles' >
                        <button className='btn bg-transparent text-dark' style={{fontSize:'3rem'}}>
                            Roles
                        </button>
                    </Link>

                    <div>
                        <Logout />
                    </div>


                </div>
            </div>
        </div>
    </div>
  )
}
