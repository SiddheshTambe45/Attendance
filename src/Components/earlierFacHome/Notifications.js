import React from 'react'

export default function Notifications(props) {

    const notifications = props.notifications

  return (
    <div>
        <div className='p-3 rounded-4' style={{backgroundColor:'white', boxShadow:'0 0 3px grey', minHeight:'300px'}}>
            <h2>
                Notifications : 
            </h2>
            {
                notifications && notifications.length > 0  ? (
                    <>
                        {notifications.map((e, index) => (
                                <p key={index}>
                                    {e.message}
                                </p>
                        ))}
                    </>
                ) : (
                    <>
                        <h2>
                            You have no notifications !!!
                        </h2>
                    </>
                )
            }
        </div>
    </div>
  )
}
