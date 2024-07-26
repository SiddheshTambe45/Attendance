import React from 'react'
import HeroSection from './HeroSection'
import Counter from './Counter'
import Notifications from './Notifications'

export default function HomePage() {

  return (
    <div className='p-2' style={{backgroundColor:'#fefbee'}}>
        <div className="container mt-4">
            <div className='row'>
                <div className='col-12 col-md-8'>
                    <div className='col-12'>
                        <HeroSection />
                    </div>

                    <br />

                    <div className='col-12'>
                        <Notifications />
                    </div>
                </div>
                <div className='col-12 col-md-4'>
                    <div className='col-12'>
                        <Counter />
                    </div>
                </div>
            </div>
        </div>    
    </div>
  )
}
