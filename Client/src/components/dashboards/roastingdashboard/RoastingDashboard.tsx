import React from 'react'
import '../localdashboard.css'
import './roastingdashboard.css';

const GreenCoffeeDashboard = () => {
  return (
    <div className='localDashboard'>
      <span className='dashboardSpan'>Dashboard</span>
      <div className='stats'>
        <div className='stat'>
          <span className='statDescription'>Amount roasted (g)</span>
          <span className='statValue'>204,920</span>
        </div>
        <div className='stat'>
          <span className='statDescription'>Work days</span>
          <span className='statValue'>13</span>
        </div>
        <div className='stat'>
          <span className='statDescription'>Avg per day</span>
          <span className='statValue'>12,560</span>
        </div>
      </div>
    </div>
  )
}

export default GreenCoffeeDashboard