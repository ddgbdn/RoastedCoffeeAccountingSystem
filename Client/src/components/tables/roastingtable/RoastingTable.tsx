import React, { Dispatch, SetStateAction } from 'react';
import TablePaginationFooter, { IPaginationInfo } from '../TablePaginationFooter';
import '../table.css';
import RoastingRow from './RoastingRow';

const RoastingsTable = ({roastings, paginationInfo, setPageNumber, handleEdit, handleMutationSync}: IRoatingsTableProps) => {
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
                {[//Filling empty rows for last page
                    ...roastings,
                    ...Array(paginationInfo.PageSize - roastings.length)
                        .fill({id: -1, coffeeFullRegion: '', date: new Date(), amount: 0})
                ].map((r: ITableRoasting) => {
                    return (
                        <RoastingRow
                            roasting={r}
                            handleEdit={handleEdit}
                            handleMutationSync={handleMutationSync}
                            key={r.id !== -1 ? r.id : Math.random()}
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

interface IRoatingsTableProps {
    roastings: ITableRoasting[],
    paginationInfo: IPaginationInfo,
    setPageNumber: Dispatch<SetStateAction<number>>
    handleEdit: (coffee: ITableRoasting) => void,
    handleMutationSync: () => void 
}

export interface ITableRoasting {
    id: number,
    coffeeId: number,
    coffeeFullRegion: string,
    date: string,
    amount: number
}

export default RoastingsTable