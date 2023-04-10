import React, { useCallback, useEffect, useState } from 'react'
import GreenCoffeeDashboard from '../components/dashboards/greencoffeedashboard/GreenCoffeeDashboard';
import GreenCoffeeForm, { IFormCoffee, defaultFormCoffee } from '../components/forms/greencoffeeform/GreenCoffeeForm';
import GreenCoffeeTable, { ITableCoffee } from '../components/tables/greencoffeetable/GreenCoffeeTable';
import './pages.css';
import { defaultPagination } from '../components/tables/TablePaginationFooter';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const GreenCoffee = () => {
    const axiosPrivate = useAxiosPrivate();

    const pageSize = 10;
    const [coffee, setCoffee] = useState<ITableCoffee[]>([]);
    const [coffeeToEdit, setCoffeeToEdit] = useState<IFormCoffee>(defaultFormCoffee);
    const [pageNumber, setPageNumber] = useState(1);
    const [paginationInfo, setPaginationInfo] = useState(defaultPagination)

    const getCoffee = useCallback(async () => {
        try {
            const response = await axiosPrivate.get('/greencoffee', {
            params: {
                includeExhausted: true,
                pageNumber: pageNumber,
                pageSize: pageSize
            }
        })
            setCoffee(response.data)
            setPaginationInfo(JSON.parse(response.headers['x-pagination']));
        } catch (error) {
            console.error(error)
        }
    }, [pageNumber, pageSize, axiosPrivate])

    const handleEdit = (coffee: ITableCoffee) => {
        setCoffeeToEdit({
            id: coffee.id, 
            variety: coffee.variety,
            country: coffee.country, 
            region: coffee.region,
            weight: coffee.weight.toString(),
            isExhausted: coffee.isExhausted
        });
    }

    useEffect(() => {
        getCoffee();        
    }, [pageNumber, getCoffee])  
      
    return (
        <div className='page'>
            <GreenCoffeeDashboard />
            <GreenCoffeeTable 
                coffee={coffee} 
                paginationInfo={paginationInfo} 
                setPageNumber={setPageNumber}
                handleEdit={handleEdit}
                handleMutationSync={getCoffee}
            />
            <GreenCoffeeForm handleMutationSync={getCoffee} coffeeToEdit={coffeeToEdit}/>
        </div>
    )
}

export default GreenCoffee