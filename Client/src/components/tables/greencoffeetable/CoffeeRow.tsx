import React, { useRef } from 'react'
import { ITableCoffee } from './GreenCoffeeTable'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'

const CoffeeRow = ({coffee, handleEdit, handleMutationSync}: ICoffeeRowProps) => {
    const axiosPrivate = useAxiosPrivate();

    const checkboxRef = useRef<HTMLInputElement>(null!);

    const handleCheck = async () => {
        try {
            await axiosPrivate.put(
                `/greencoffee/${coffee.id}`,
                JSON.stringify({...coffee, isExhausted: !coffee.isExhausted})
            )
            await handleMutationSync();
        } catch (error) {
            checkboxRef.current.checked = coffee.isExhausted;
            console.log(error);
        }
    }

    const handleDelete = async () => {
        try {
            await axiosPrivate.delete(
                `/greencoffee/${coffee.id}`
            )
            await handleMutationSync();
        } catch (error) {
            console.log(error);
        }
    }
    
    if (coffee.id === -1) {
        return (
        <tr key={Math.random()} style={{height: '49px'}}>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        )
    }
    else {
        return (
            <tr 
                className={coffee.isExhausted ? 'exhausted' : ''}>
                <td>{coffee.variety}</td>
                <td>{coffee.fullRegion}</td>
                <td style={{
                    textAlign: 'right'
                }}>
                    {coffee.weight.toFixed(1)}
                </td>
                <td style={{
                    textAlign: 'right'
                }}>
                    <div className='buttons'>
                        <label 
                            htmlFor='isExhausted' 
                            className='tableLabel'
                        >
                                Exhausted:
                        </label>
                        <input 
                            title="isExhausted" 
                            name='isExhausted' 
                            type='checkbox' 
                            className='tableCheckbox'
                            defaultChecked={coffee.isExhausted}
                            onClick={handleCheck}
                            ref={checkboxRef}
                        />
                        <button 
                            className='actionButton edit'
                            onClick={() => handleEdit(coffee)}
                        >
                            <i className='bi bi-pencil-square'/>
                        </button>
                        <button 
                            className='actionButton delete'
                            onClick={handleDelete}
                        >
                            <i className='bi bi-trash3'/>
                        </button>
                    </div>
                </td>
            </tr>
        )
    }
}

interface ICoffeeRowProps {
    coffee: ITableCoffee,
    handleEdit: (coffee: ITableCoffee) => void,
    handleMutationSync: () => void
}

export default CoffeeRow