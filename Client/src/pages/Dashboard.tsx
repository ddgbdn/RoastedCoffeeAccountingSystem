import React from 'react'
import MainCoffeeDashboard from '../components/dashboards/maindashboard/MainCoffeeDashboard';
import MainRoastingsDashboard from '../components/dashboards/maindashboard/MainRoastingsDashboard';
import './dashboard.css'

const Dashboard = () => {
  return (
    <div className='dashboardPage'>
      <MainRoastingsDashboard />
      <MainCoffeeDashboard />
    </div>
  )
}

export default Dashboard