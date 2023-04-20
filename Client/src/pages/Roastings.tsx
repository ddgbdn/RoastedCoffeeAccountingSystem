import React, { useCallback, useEffect, useState } from 'react'
import RoastingDashboard from '../components/dashboards/roastingdashboard/RoastingDashboard'
import RoastingForm, { defaultFormRoasting } from '../components/forms/roastingform/RoastingForm'
import RoastingTable, { ITableRoasting } from '../components/tables/roastingtable/RoastingTable'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { defaultPagination } from '../components/tables/TablePaginationFooter'
import { defaultRoastingStats } from '../components/dashboards/maindashboard/MainRoastingsDashboard'

const Roastings = () => {
  const axiosPrivate = useAxiosPrivate();

  const pageSize = 10;  
  const [pageNumber, setPageNumber] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState(defaultPagination);  
  const [date, setDate] = useState(new Date());

  const [roastings, setRoastings] = useState<ITableRoasting[]>([]);
  const [roastingToEdit, setRoastingToEdit] = useState(defaultFormRoasting);
  const [roastingStats, setRoastingStats] = useState(defaultRoastingStats);


  const getRoastings = useCallback(async () => {
    try {
      const response = await axiosPrivate.get('/roastings', {
        params: {
          pageNumber: pageNumber,
          pageSize: pageSize,
          startDate: new Date(date.getFullYear(), date.getMonth(), 1).toDateString(),
          endDate: new Date(date.getFullYear(), date.getMonth() + 1, 0).toDateString()
        }
      })

      setRoastings(response.data)
      setPaginationInfo(JSON.parse(response.headers['x-pagination']));
    } catch (error) {
      console.error(error)
    } 
  }, [axiosPrivate, pageNumber, pageSize, date])

  const getRoastingStats = useCallback(async () => {
    try {
      const response = await axiosPrivate.get('/statistics/roastings', {
        params: {
          date: date.toDateString()
        }
      })
      setRoastingStats(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [axiosPrivate, date])

  const handleEdit = (roasting: ITableRoasting) => {
    setRoastingToEdit({
      id: roasting.id,
      coffeeId: roasting.coffeeId.toString(),
      amount: roasting.amount.toString(),
      date: new Date(roasting.date)
    })
  }

  useEffect(() => {
    getRoastingStats();
  }, [getRoastingStats])

  useEffect(() => {
    getRoastings();
  }, [pageNumber, getRoastings])

  return (
    <div className='page'>
        <RoastingDashboard date={date} setDate={setDate} RoastingStats={roastingStats}/>
        <RoastingTable 
          roastings={roastings} 
          paginationInfo={paginationInfo} 
          setPageNumber={setPageNumber}
          handleEdit={handleEdit}
          handleMutationSync={getRoastings}
        />
        <RoastingForm 
          handleMutationSync={async () => {
            getRoastings();
            getRoastingStats();
          }}
          roastingToEdit={roastingToEdit}
        />
    </div>
  )
}

export default Roastings