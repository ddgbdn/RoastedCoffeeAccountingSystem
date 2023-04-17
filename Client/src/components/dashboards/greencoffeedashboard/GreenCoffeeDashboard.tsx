import React from 'react'
import '../localdashboard.css'
import './coffeedashboard.css';
import { ICoffeeStats } from '../maindashboard/MainCoffeeDashboard';

const GreenCoffeeDashboard = ({coffeeStats}: IGreenCoffeeDashboardProps) => {
  return (
    <div className='localDashboard'>
      <span className='dashboardSpan'>Dashboard</span>
      <div className='stats'>
        <div className='stat'>
          <span className='statDescription'>Sacks Available</span>
          <span className='statValue'>{coffeeStats.availableSacks}</span>
        </div>
        <div className='stat'>
          <span className='statDescription'>Available Amount (kg)</span>
          <span className='statValue'>{`< ${coffeeStats.availableAmount.toFixed(2)}`}</span>
        </div>
      </div>
    </div>
  )
}

interface IGreenCoffeeDashboardProps {
  coffeeStats: ICoffeeStats
}

export default GreenCoffeeDashboard