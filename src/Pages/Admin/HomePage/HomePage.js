import React from 'react';
import {Link} from 'react-router-dom';
import Logout from '../../Authentication/Logout/Logout'

export default function HomePage() {

   

  return (
    <div className='HomePageAdmin' id='HomePageAdmin'>
        <div className='container' style={{minHeight:'100vh', height:'auto'}}>
            <div className='row'>
                <h2 className='text-center'>
                    HomePage
                </h2>    
                <div className='d-flex justify-content-center flex-column align-items-center p-5'>
                    <Link to='/admin/DivisionCalculation' >
                        <button className='btn' style={{fontSize:'3rem'}}>
                        Division Calculation
                        </button>
                    </Link>

                    <Link to='/admin/StudentDataEntry' >
                        <button className='btn' style={{fontSize:'3rem'}}>
                        Student Data Entry
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
