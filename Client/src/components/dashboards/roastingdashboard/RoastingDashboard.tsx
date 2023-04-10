import React, { Dispatch, SetStateAction, useState } from 'react'
import '../localdashboard.css'
import './roastingdashboard.css';

const RoastingsDashboard = ({date, setDate}: ILocalRoastingsDashboardProps) => {


  return (
    <div className='localDashboard'>
      <span className='dashboardSpan'>
        {date.toLocaleString('default', {month: 'long'})} {date.getFullYear()}
      </span>
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
      <button 
        className='dashButton prevButton'
        onClick={() => {setDate(prev => {
        return new Date(date.getFullYear(), date.getMonth() - 1, 1)
      })}}>
        <i className='bi bi-caret-left-fill'/>
      </button>
      <button 
        className='dashButton nextButton'
        onClick={() => {setDate(prev => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 1)
      })}}>
        <i className='bi bi-caret-right-fill'/>
      </button>
    </div>
  )
}

interface ILocalRoastingsDashboardProps {
  date: Date
  setDate: Dispatch<SetStateAction<Date>>
}

export default RoastingsDashboard