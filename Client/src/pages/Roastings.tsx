import React, { useCallback, useEffect, useState } from 'react'
import RoastingDashboard from '../components/dashboards/roastingdashboard/RoastingDashboard'
import RoastingForm, { defaultFormRoasting } from '../components/forms/roastingform/RoastingForm'
import RoastingTable, { ITableRoasting } from '../components/tables/roastingtable/RoastingTable'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { defaultPagination } from '../components/tables/TablePaginationFooter'

const Roastings = () => {
  const axiosPrivate = useAxiosPrivate();

  const pageSize = 10;
  const [roastings, setRoastings] = useState<ITableRoasting[]>([]);
  const [roastingToEdit, setRoastingToEdit] = useState(defaultFormRoasting)
  const [pageNumber, setPageNumber] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState(defaultPagination);  
  const [date, setDate] = useState(new Date());

  const getRoastings = useCallback(async () => {
    try {
      const response = await axiosPrivate.get('/roastings', {
        params: {
          pageNumber: pageNumber,
          pageSize: pageSize,
          startDate: new Date(date.getFullYear(), date.getMonth(), 1),
          endDate: new Date(date.getFullYear(), date.getMonth() + 1, 0)
        }
      })
      setRoastings(response.data)
      setPaginationInfo(JSON.parse(response.headers['x-pagination']));
    } catch (error) {
      console.error(error)
    } 
  }, [axiosPrivate, pageNumber, pageSize, date])

  const handleEdit = (roasting: ITableRoasting) => {
    setRoastingToEdit({
      id: roasting.id,
      coffeeId: roasting.coffeeId.toString(),
      amount: roasting.amount.toString()
    })
  }

  useEffect(() => {
    getRoastings();
  }, [pageNumber, getRoastings])

  return (
    <div className='page'>
        <RoastingDashboard date={date} setDate={setDate}/>
        <RoastingTable 
          roastings={roastings} 
          paginationInfo={paginationInfo} 
          setPageNumber={setPageNumber}
          handleEdit={handleEdit}
          handleMutationSync={getRoastings}
        />
        <RoastingForm 
          handleMutationSync={getRoastings}
          roastingToEdit={roastingToEdit}
        />
    </div>
  )
}

export default Roastings