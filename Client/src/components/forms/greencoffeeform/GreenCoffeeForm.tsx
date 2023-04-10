import React, { useEffect, useState } from 'react'
import '../form.css'
import './coffeeform.css'
import axios from 'axios'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'

const GreenCoffeeForm = ({handleMutationSync, coffeeToEdit}: ICoffeeFormProps) => {
  const axiosPrivate = useAxiosPrivate();

  const [coffee, setCoffee] = useState(coffeeToEdit);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    setCoffee(coffeeToEdit)
  }, [coffeeToEdit])

  useEffect(() => {
    setErrors([]);
  }, [coffee])
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (coffee.id === -1) {
      await postCoffee();
    } else {
      await putCoffee();
    }    
  }

  const postCoffee = async () => {
    try {
      await axiosPrivate.post(
        '/greencoffee',
        JSON.stringify({...coffee, weight: parseFloat(coffee.weight)})
      )        
      setCoffee(defaultFormCoffee);
      await handleMutationSync();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (!error?.response) {
          setErrors(['No Server Response']);
        } else if (error.response?.status === 422){
          processEntityError(error.response.data)
        } else {
          setErrors(['Saving Failed']);
        }
      }
      else {
        console.log(error)
      }
    }
  }

  const putCoffee = async () => {
    try {
      await axiosPrivate.put(
        `/greencoffee/${coffee.id}`,
        JSON.stringify({...coffee, weight: parseFloat(coffee.weight)})
      )        
      setCoffee(defaultFormCoffee);
      await handleMutationSync();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (!error?.response) {
          setErrors(['No Server Response']);
        } else if (error.response?.status === 422){
          processEntityError(error.response.data)
        } else {
          setErrors(['Saving Failed']);
        }
      } else {
        console.log(error)
      }
    }
  }

  const processEntityError = (data: IEntityError) => {
    Object.values(data).forEach(v => setErrors(prev => [...prev, v]))
  }

  return (
    <div className='formGridEl'>
      <div className='formContainer'>          
          <form onSubmit={handleSubmit}>
                {
                  errors.map((error) => 
                  <p className={error ? 'error' : 'offscreen'}>{error}</p>)
                }
                <h3>Green coffee Form</h3>
                <input hidden defaultValue={coffee.id}/>
                <input 
                    type="text" 
                    placeholder='Variety' 
                    id='variety'
                    required
                    value={coffee.variety}
                    onChange={(e) => setCoffee((prev) => {return {...prev, variety: e.target.value}})} />            
                <input 
                    type="text" 
                    placeholder='Country' 
                    id='country'
                    required
                    value={coffee.country}
                    onChange={(e) => setCoffee((prev) => {return {...prev, country: e.target.value}})} />            
                <input 
                    type="text" 
                    placeholder='Region' 
                    id='region'
                    value={coffee.region}
                    onChange={(e) => setCoffee((prev) => {return {...prev, region: e.target.value}})} />            
                <input 
                    type="text" 
                    placeholder='Weight' 
                    id='weight'
                    required
                    value={coffee.weight}
                    onChange={(e) => setCoffee((prev) => {return {...prev, weight: e.target.value}})} />
                <button type='submit' className='formButton'>Submit</button>
                <button className='clearButton'>Clear form</button>          
          </form>
      </div>
    </div>
  )
}

interface IEntityError {
    variety: string | undefined,
    country: string | undefined, 
    region: string | undefined,
    weight: string | undefined
}

export const defaultFormCoffee: IFormCoffee = {
  id: -1,
  variety: '',
  country: '',
  region: '',
  weight: '',
  isExhausted: false
}

export interface IFormCoffee {
  id: number,
  variety: string,
  country: string, 
  region: string,
  weight: string,
  isExhausted: boolean
}

interface ICoffeeFormProps {
  handleMutationSync: () => Promise<void>,
  coffeeToEdit: IFormCoffee 
}

export default GreenCoffeeForm