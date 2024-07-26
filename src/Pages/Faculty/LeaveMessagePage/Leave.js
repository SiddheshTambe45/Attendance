import React, { useEffect, useState } from 'react';
import response from '../../../JSON/Leave.json'
import axios from 'axios';

export default function Leave() {

  const [leave,setLeave] = useState([]);
  
  useEffect(()=>{

    try {
      
      //const response = axios.get('');
      setLeave(response)

    } catch (error) {
      console.log(error)
    }

  },[])

  return (
    <div>
      <div className='container'>
        <div className='row'>
          {
            leave && leave.length > 0 ? (

              leave.map((e)=>{
                return(
                  <div key={e.studentId} className="mb-3 rounded" style={{ boxShadow: '0 0 6px grey', backgroundColor:'#f9f9f9'}}>
                    <div className="p-3" style={{fontFamily:'Verdana'}}>
                      <h5 className="p-1">
                        Student ID: {e.studentId}
                      </h5>
                      <h5 className="p-1">
                        Student Name: {e.studentName}
                      </h5>
                      <h5 className='p-1'>
                        Duration: {e.duration[0]} to {e.duration[1]}
                      </h5>
                      <h5 className='p-1'>
                        Message: {e.message}
                      </h5>
                      <div className='d-flex flex-row justify-content-end align-items-center'>
                        <button type='button' className='p-2 m-2 rounded' style={{ boxShadow: '0 0 6px grey', backgroundColor:'green'}}>
                          Accept
                        </button>
                        <button type='button' className='p-2 m-2 rounded' style={{ boxShadow: '0 0 6px grey', backgroundColor:'red'}}>
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })

            ) : (
              <>
                <h2>
                  You have no Leave messages to check.
                </h2>
              </>
            )
          }
        </div>
      </div>
    </div>
  )
}
