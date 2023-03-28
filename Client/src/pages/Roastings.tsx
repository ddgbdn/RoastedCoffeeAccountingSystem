import React from 'react'
import RoastingDashboard from '../components/dashboards/roastingdashboard/RoastingDashboard'
import RoastingForm from '../components/forms/roastingform/RoastingForm'
import RoastingTable from '../components/tables/roastingtable/RoastingTable'

const Roastings = () => {
  return (
    <div className='page'>
        <RoastingDashboard />
        <RoastingTable />
        <RoastingForm />
    </div>
  )
}

export default Roastings