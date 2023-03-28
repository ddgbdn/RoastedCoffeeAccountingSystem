import React, { useState } from 'react';
import TablePaginationFooter from '../TablePaginationFooter';
import '../table.css';
import './roastingtable.css';

function createData(coffeeRegion: string, amount: number, date: Date) {
    return {coffeeRegion, amount, date};
}
  
const rows = [
    createData('Columbia Excelso', 4.02, new Date()),
    createData('Columbia Excelso', 4.02, new Date()),
    createData('Columbia Excelso', 4.02, new Date()),
    createData('Columbia Excelso', 4.02, new Date()),
    createData('Columbia Excelso', 4.02, new Date()),
    createData('Columbia Excelso', 4.02, new Date()),
    createData('Columbia Excelso', 4.02, new Date()),
    createData('Columbia Excelso', 4.02, new Date()),
    createData('Columbia Excelso', 4.02, new Date()),
    createData('Columbia Excelso', 4.02, new Date()),
    createData('Columbia Excelso', 4.02, new Date()),
    createData('Columbia Excelso', 4.02, new Date()),
    createData('Columbia Excelso', 4.02, new Date()),
    createData('Columbia Excelso', 4.02, new Date()),
];

const GreenCoffeeTable = () => {
    const rowsPerPage = 10;
    const [page, setPage] = useState(0);

  return (
    <div className='roastingTable'>
        <table>
            <thead>  
                <tr style={{
                    backgroundColor: "#191919"
                }}>
                    <th>Coffee</th>
                    <th>Date</th>
                    <th style={{
                        textAlign: 'right'
                    }}>Amount</th>
                    <th style={{
                        textAlign: "right"
                    }}>
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((roastings) => (
                    <tr>
                        <td>{roastings.coffeeRegion}</td>
                        <td>{roastings.date.toDateString()}</td>
                        <td style={{
                            textAlign: 'right'
                        }}>{roastings.amount}</td>
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
                    <TablePaginationFooter cols={4}/>  
                </tr>                
            </tfoot>
        </table>
    </div>
  )
}

export default GreenCoffeeTable