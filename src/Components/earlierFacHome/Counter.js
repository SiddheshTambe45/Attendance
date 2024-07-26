import React from 'react'

export default function Counter(props) {

    const sessions = props.sessions || 2
    const leaveMessages = props.leaveMessages || 3

  return (
    <div>
        <div className='col-12 p-3 rounded-4' style={{backgroundColor: '#faefaf', boxShadow:'0 0 6px grey'}}>
              <div className='row'>
                  <h3 className='display-6 align-center col-8'>
                      Sessions to
                      <br />
                      Update
                  </h3>
                  <h1 className='align-center col-2'>
                      {sessions}
                  </h1>
              </div>
        </div>

        <br />

        <div className='col-12 p-3 rounded-4' style={{boxShadow:'0 0 6px grey'}}>
              <div className='row'>
                  <h3 className='display-6 align-center col-8'>
                      Leave
                      <br />
                      Messages
                  </h3>
                  <h1 className='align-center col-2'>
                      {leaveMessages}
                  </h1>
              </div>
        </div>
    </div>
  )
}
