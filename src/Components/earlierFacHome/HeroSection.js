import React from 'react'

export default function HeroSection(props) {

    const facultyName = props.facultyName || 'Dipesh Shetty'

  return (
    <div className='p-3 rounded-4' style={{backgroundColor:'#f6c1c8', boxShadow:'0 0 3px grey'}}>
        <h2 className='display-6 align-center'>
            Welcome !!! 
        </h2>
        <h1 className='align-center my-auto' style={{fontSize:'3rem'}}>
            {facultyName}  
        </h1>
    </div>
  )
}
