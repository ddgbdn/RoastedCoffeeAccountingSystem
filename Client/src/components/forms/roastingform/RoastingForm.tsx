import React, { useEffect, useState } from 'react'
import '../form.css'
import './roastingform.css'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import axios from 'axios'

const RoastingForm = ({handleMutationSync, roastingToEdit}: IRoastingFormProps) => {
  const axiosPrivate = useAxiosPrivate();

  const [roasting, setRoasting] = useState(roastingToEdit);
  const [coffeeOptions, setCoffeeOptions] = useState<ICoffeeOption[]>([]);
  const [errors, setErrors] = useState<string[]>([])

  useEffect(() => {
    setRoasting(roastingToEdit)
  }, [roastingToEdit])

  useEffect(() => {
    setErrors([]);
  }, [roasting])

  useEffect(() => {
    const getCoffeeOptions = async () => {
      try {
        const response = await axiosPrivate.get( '/greencoffee', {
            params: {
              pageSize: 50,
              includeExhausted: roasting.id !== -1
            }
          }
        )
        setCoffeeOptions(response.data);
      } catch (error) {
        console.log(error)
      }
    }
    getCoffeeOptions();
  }, [axiosPrivate, roasting])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (roasting.id === -1) {
      await postRoasting();
    } else {
      await putRoasting();
    }
  }

  const postRoasting = async () => {
    try {
      await axiosPrivate.post(
        '/roastings',
        JSON.stringify({
          ...roasting, 
          coffeeId: parseInt(roasting.coffeeId),
          amount: parseFloat(roasting.amount)
        })
      )
      setRoasting(defaultFormRoasting);
      await handleMutationSync();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (!error?.response) {
          setErrors(['No Server Response']);
        } else if (error.response?.status === 422) {
          processEntityError(error.response.data);
        } else {
          setErrors(['Saving Failed']);
        }
      }
    }
  }

  const putRoasting = async () => {
    try {
      await axiosPrivate.put(
        `/roastings/${roasting.id}`,
        JSON.stringify({
          ...roasting, 
          coffeeId: parseInt(roasting.coffeeId), 
          amount: parseFloat(roasting.amount)
        })
      )
      setRoasting(defaultFormRoasting);
      await handleMutationSync();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (!error?.response) {
          setErrors(['No Server Response']);
        } else if (error.response?.status === 422) {
          processEntityError(error.response.data);
        } else {
          setErrors(['Saving Failed']);
        }
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
              <h3>Roastings Form</h3>
              <input hidden defaultValue={roasting.id}></input>
              <select 
                title='variety'
                placeholder='Full Region (Brazil Santos)'
                name='CoffeeId'
                required
                value={roasting.coffeeId}
                onChange={(e) => setRoasting((prev) => {return {...prev, coffeeId: e.target.value}})}
              >
                <option disabled={true} value=''>Choose an option</option>
                {coffeeOptions.map((c) => <option key={c.id} value={c.id}>{c.fullRegion}</option>)}
              </select>         
              <input 
                type="string" 
                placeholder='Weight' 
                name='weight'
                required
                value={roasting.amount}
                onChange={(e) => setRoasting((prev) => {return {...prev, amount: e.target.value}})}/>
              <button type='submit' className='formButton'>Submit</button>   
              <button className='clearButton'>Clear form</button>       
          </form>
      </div>
    </div>
  )
}

interface IEntityError {
  coffeeId: string | undefined,
  amount: string | undefined, 
}

interface ICoffeeOption {
  id: number,
  fullRegion: string
}

export interface IFormRoasting {
  id: number,
  coffeeId: string,
  amount: string
}

export const defaultFormRoasting: IFormRoasting = {
  id: -1,
  coffeeId: '',
  amount: ''
}

interface IRoastingFormProps {
  handleMutationSync: () => Promise<void>,
  roastingToEdit: IFormRoasting
}

export default RoastingForm