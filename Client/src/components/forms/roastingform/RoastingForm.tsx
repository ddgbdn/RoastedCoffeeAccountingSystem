import React from 'react'
import '../form.css'
import './roastingform.css'

const GreenCoffeeForm = () => {
  return (
    <div className='formGridEl'>
      <div className='formContainer'>
          <form>
              <h3>Roastings Form</h3>
              <input type="text" placeholder='Full Region (Brazil Santos)' id='variety'/>         
              <input type="number" placeholder='Weight' id='weight'/>
              <button type='submit' className='formButton'>Submit</button>          
          </form>
      </div>
    </div>
  )
}

export default GreenCoffeeForm