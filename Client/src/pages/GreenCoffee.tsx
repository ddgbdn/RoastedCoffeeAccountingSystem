import React, { useCallback, useEffect, useState } from 'react'
import GreenCoffeeDashboard from '../components/dashboards/greencoffeedashboard/GreenCoffeeDashboard';
import GreenCoffeeForm, { IFormCoffee, defaultFormCoffee } from '../components/forms/greencoffeeform/GreenCoffeeForm';
import GreenCoffeeTable, { ITableCoffee } from '../components/tables/greencoffeetable/GreenCoffeeTable';
import './pages.css';
import { defaultPagination } from '../components/tables/TablePaginationFooter';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { defaultCoffeeStats } from '../components/dashboards/maindashboard/MainCoffeeDashboard';

const GreenCoffee = () => {
    const axiosPrivate = useAxiosPrivate();

    const [coffee, setCoffee] = useState<ITableCoffee[]>([]);
    const [coffeeToEdit, setCoffeeToEdit] = useState<IFormCoffee>(defaultFormCoffee);
    const [coffeeStats, setCoffeeStats] = useState(defaultCoffeeStats);

    const pageSize = 10;
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

    const getCoffeeStats = useCallback(async () => {
        try {
            const response = await axiosPrivate.get('/statistics/greencoffee');
            setCoffeeStats(response.data);
        } catch (error) {
            console.error(error);
        }
    }, [axiosPrivate])

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
        getCoffeeStats();
    }, [getCoffeeStats])

    useEffect(() => {
        getCoffee();        
    }, [pageNumber, getCoffee])  
      
    return (
        <div className='page'>
            <GreenCoffeeDashboard coffeeStats={coffeeStats}/>
            <GreenCoffeeTable 
                coffee={coffee} 
                paginationInfo={paginationInfo} 
                setPageNumber={setPageNumber}
                handleEdit={handleEdit}
                handleMutationSync={() => {
                    getCoffee();
                    getCoffeeStats();
                }}
            />
            <GreenCoffeeForm 
                handleMutationSync={async () => {
                    getCoffee();
                    getCoffeeStats();
                }} 
                coffeeToEdit={coffeeToEdit}/>
        </div>
    )
}

export default GreenCoffee