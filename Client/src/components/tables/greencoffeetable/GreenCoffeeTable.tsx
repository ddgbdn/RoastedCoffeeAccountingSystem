import React, { Dispatch, SetStateAction } from 'react';
import TablePaginationFooter, { IPaginationInfo } from '../TablePaginationFooter';
import '../table.css';
import './coffeetable.css';
import CoffeeRow from './CoffeeRow';

const GreenCoffeeTable = ({coffee, paginationInfo, setPageNumber, handleEdit, handleMutationSync}: ICoffeeTableProps) => {
    return (
        <div className='greenCoffeeTable'>
            <table>
                <thead>  
                    <tr style={{
                        backgroundColor: "#191919"
                    }}>
                        <th>Variety</th>
                        <th>Region</th>
                        <th style={{
                            textAlign: 'right'
                        }}>Weight</th>
                        <th style={{
                            textAlign: "right"
                        }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {[//Filling empty rows for last page 
                        ...coffee,
                        ...Array(paginationInfo.PageSize - coffee.length)
                            .fill({id: -1, variety: '', fullRegion: '', weight: 0, isExhausted: true})
                    ].map((c: ITableCoffee) => { 
                        return (
                            <CoffeeRow 
                                coffee={c}
                                handleEdit={handleEdit}
                                handleMutationSync={handleMutationSync}
                                key={c.id !== -1 ? c.id : Math.random()}
                            />
                        )
                    })
                    }
                </tbody>
                <tfoot>
                    <tr style={{backgroundColor: '#191919'}}>
                        <TablePaginationFooter 
                            cols={4}
                            paginationInfo={paginationInfo}
                            setPageNumber={setPageNumber}
                        />  
                    </tr>                
                </tfoot>
            </table>
        </div>
  )
}

interface ICoffeeTableProps {
    coffee: ITableCoffee[],
    paginationInfo: IPaginationInfo,
    setPageNumber: Dispatch<SetStateAction<number>>,
    handleEdit: (coffee: ITableCoffee) => void,
    handleMutationSync: () => void    
}

export interface ITableCoffee {
    id: number,
    variety: string,
    country: string,
    region: string,
    fullRegion: string, 
    weight: number,
    isExhausted: boolean
}

export default GreenCoffeeTable