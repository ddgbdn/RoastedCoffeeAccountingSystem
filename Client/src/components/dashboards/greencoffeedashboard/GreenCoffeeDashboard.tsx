import React from 'react'
import '../localdashboard.css'
import './coffeedashboard.css';

const GreenCoffeeDashboard = () => {
  return (
    <div className='localDashboard'>
      <span className='dashboardSpan'>Dashboard</span>
      <div className='stats'>
        <div className='stat'>
          <span className='statDescription'>KGS this month</span>
          <span className='statValue'>129.5</span>
        </div>
        <div className='stat'>
          <span className='statDescription'>Sacks available</span>
          <span className='statValue'>1</span>
        </div>
        <div className='stat'>
          <span className='statDescription'>Total networth</span>
          <span className='statValue'>1,596</span>
        </div>
      </div>
    </div>
  )
}

export default GreenCoffeeDashboard