import React, { Dispatch, SetStateAction} from 'react'
import '../localdashboard.css'
import './roastingdashboard.css';
import { IRoastingStats } from '../maindashboard/MainRoastingsDashboard';

const RoastingsDashboard = ({RoastingStats, date, setDate}: ILocalRoastingsDashboardProps) => {


  return (
    <div className='localDashboard'>
      <span className='dashboardSpan'>
        {date.toLocaleString('default', {month: 'long'})} {date.getFullYear()}
      </span>
      <div className='stats'>
        <div className='stat'>
          <span className='statDescription'>Amount Roasted (kg)</span>
          <span className='statValue'>{RoastingStats.sixPreviousMonthsTotal[5].toFixed(3)}</span>
        </div>
        <div className='stat'>
          <span className='statDescription'>Work Days</span>
          <span className='statValue'>{RoastingStats.workingDaysThisMonth}</span>
        </div>
        <div className='stat'>
          <span className='statDescription'>Avg Per Day (kg)</span>
          <span className='statValue'>{RoastingStats.averagePerDayThisMonth.toFixed(3)}</span>
        </div>        
      </div>
      <button 
        className='dashButton prevButton'
        onClick={() => {
          setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1))
        }}
        >
        <i className='bi bi-caret-left-fill'/>
      </button>
      <button 
        className='dashButton nextButton'
        onClick={() => {
          setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1))
        }}>
        <i className='bi bi-caret-right-fill'/>
      </button>
    </div>
  )
}

interface ILocalRoastingsDashboardProps {
  RoastingStats: IRoastingStats
  date: Date
  setDate: Dispatch<SetStateAction<Date>>
}

export default RoastingsDashboard