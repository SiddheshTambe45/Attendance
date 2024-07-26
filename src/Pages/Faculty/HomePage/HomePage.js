import React from 'react';
import {Link} from 'react-router-dom';

export default function HomePage() {
  return (
    <div>
        <div className='container' style={{minHeight:'100vh', height:'auto'}}>
            <div className='row'>
                <h2 className='text-center'>
                    HomePage
                </h2>    
                <div className='d-flex justify-content-center flex-column align-items-center p-5'>
                    <Link to='/faculty/attendanceUpdate' >
                        <button className='btn' style={{fontSize:'3rem'}}>
                            Attendance Update
                        </button>
                    </Link>

                    <Link to='/faculty/reportPage' >
                        <button className='btn' style={{fontSize:'3rem'}}>
                            Report Page
                        </button>
                    </Link>

                    <Link to='/faculty/leave' >
                        <button className='btn' style={{fontSize:'3rem'}}>
                            Leave Page
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}
