import React from 'react';
import {Link} from 'react-router-dom';

export default function HomePage() {

    const Hod = {
        faculty_name: 'Siddhesh Tambe',
        faculty_id: '1010',
        role: 'HOD'
    }

  return (
    <div>
        <div className='container' style={{minHeight:'100vh', height:'auto'}}>
            <div className='row'>
                <h2 className='text-center'>
                    HomePage
                </h2>    
                <div className='d-flex justify-content-center flex-column align-items-center p-5'>
                    <Link to='/hod/report' >
                        <button className='btn' style={{fontSize:'3rem'}}>
                            Attendance Update
                        </button>
                    </Link>

                    <Link to='/hod/allocation' >
                        <button className='btn' style={{fontSize:'3rem'}}>
                            Report Page
                        </button>
                    </Link>

                    <Link to='/hod/upload' >
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
