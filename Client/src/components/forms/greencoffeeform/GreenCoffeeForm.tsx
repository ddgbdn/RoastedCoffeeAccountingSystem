import React from 'react'
import '../form.css'
import './coffeeform.css'

const GreenCoffeeForm = () => {
  return (
    <div className='formGridEl'>
      <div className='formContainer'>
          <form>
              <h3>Green coffee Form</h3>
              <input type="text" placeholder='Variety' id='variety'/>            
              <input type="text" placeholder='Country' id='country'/>            
              <input type="text" placeholder='Region' id='region'/>            
              <input type="number" placeholder='Weight' id='weight'/>
              <button type='submit' className='formButton'>Submit</button>          
          </form>
      </div>
    </div>
  )
}

export default GreenCoffeeForm