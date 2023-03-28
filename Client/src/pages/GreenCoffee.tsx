import React from 'react'
import GreenCoffeeDashboard from '../components/dashboards/greencoffeedashboard/GreenCoffeeDashboard';
import GreenCoffeeForm from '../components/forms/greencoffeeform/GreenCoffeeForm';
import GreenCoffeeTable from '../components/tables/greencoffeetable/GreenCoffeeTable';
import './pages.css';

const GreenCoffee = () => {
  return (
    <div className='page'>
      <GreenCoffeeDashboard />
      <GreenCoffeeTable />
      <GreenCoffeeForm />
    </div>
  )
}

export default GreenCoffee