import React from 'react'
import { Link } from 'react-router-dom'

export default function HomePage() {
    return (
        <div className='container' style={{ minHeight: '80vh', marginTop: '20px', paddingTop: '100px', boxShadow: '0 0 3px grey' }}>
            <div className='row'>
                <div classname="">
                    <h1 className='text-center'>Welcome to Attendance Tracker</h1>
                    <p className='text-center'>Keep track of student attendance efficiently and easily.</p>
                    <div className='d-flex justify-content-center align-items-center'>
                        <Link to='/signup' className='btn btn-primary btn-custom mx-3' style={{ boxShadow: '0 0 3px grey' }}>Sign Up</Link>
                        <Link to='/login' className='btn btn-success btn-custom mx-3' style={{ boxShadow: '0 0 3px grey' }}>Login</Link>
                    </div>
                </div>
            </div>

        </div>
    )
}
