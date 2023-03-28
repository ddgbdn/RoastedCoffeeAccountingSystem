import React, { useState } from 'react';
import TablePaginationFooter from '../TablePaginationFooter';
import '../table.css';
import './coffeetable.css';

function createData(variety: string, country: string, region: string, weight: number, date: Date) {
    return {variety, country, region, weight, date};
}
  
const rows = [
    createData('Arabica', 'Brazil', 'Santos', 59.5, new Date()),
    createData('Arabica', 'Columbia', 'Exselso', 70, new Date()),
    createData('Arabica', 'Brazil', 'Santos', 59.5, new Date()),
    createData('Arabica', 'Columbia', 'Exselso', 70, new Date()),
    createData('Robusta', 'Uganda', '', 15, new Date()),
    createData('Arabica', 'Columbia', 'Exselso', 70, new Date()),
    createData('Robusta', 'Uganda', '', 15, new Date()),
    createData('Arabica', 'Brazil', 'Santos', 59.5, new Date()),
    createData('Robusta', 'Uganda', '', 15, new Date()),
    createData('Arabica', 'Brazil', 'Santos', 59.5, new Date()),
    createData('Arabica', 'Columbia', 'Exselso', 70, new Date()),
    createData('Arabica', 'Brazil', 'Santos', 59.5, new Date()),
    createData('Arabica', 'Columbia', 'Exselso', 70, new Date()),
    createData('Robusta', 'Uganda', '', 15, new Date()),
    createData('Arabica', 'Columbia', 'Exselso', 70, new Date()),
    createData('Robusta', 'Uganda', '', 15, new Date()),
    createData('Arabica', 'Brazil', 'Santos', 59.5, new Date()),
    createData('Robusta', 'Uganda', '', 15, new Date())
];

const GreenCoffeeTable = () => {
    const rowsPerPage = 10;
    const [page, setPage] = useState(0);

  return (
    <div className='greenCoffeeTable'>
        <table>
            <thead>  
                <tr style={{
                    backgroundColor: "#191919"
                }}>
                    <th>Variety</th>
                    <th>Country</th>
                    <th>Region</th>
                    <th>Arrival date</th>
                    <th style={{
                        textAlign: 'right'
                    }}>Weight</th>
                    <th style={{
                        textAlign: "right"
                    }}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((coffee) => (
                    <tr>
                        <td>{coffee.variety}</td>
                        <td>{coffee.country}</td>
                        <td>{coffee.region}</td>
                        <td>{coffee.date.toLocaleDateString()}</td>
                        <td style={{
                            textAlign: 'right'
                        }}>{coffee.weight}</td>
                        <td style={{
                            textAlign: 'right'
                        }}>
                            <button className='actionButton edit'>
                                <i className='bi bi-pencil-square'/>
                            </button>
                            <button className='actionButton delete'>
                                <i className='bi bi-trash3'/>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr style={{backgroundColor: '#191919'}}>
                    <TablePaginationFooter cols={6}/>  
                </tr>                
            </tfoot>
        </table>
    </div>
  )
}

export default GreenCoffeeTable