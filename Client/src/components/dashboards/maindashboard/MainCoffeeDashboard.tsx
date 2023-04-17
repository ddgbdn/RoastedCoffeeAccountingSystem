import React, { useEffect, useState } from 'react'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import { VictoryContainer, VictoryPie } from 'victory';

const MainCoffeeDashboard = () => {
  const axiosPrivate = useAxiosPrivate();
  
  const [coffeeStats, setCoffeeStats] = useState(defaultCoffeeStats);

  useEffect(() => {
    const getCoffeeStats = async () => {
      try {
          const response = await axiosPrivate.get('/statistics/greencoffee');
          setCoffeeStats(response.data);
      } catch (error) {
          console.error(error);
      }
    }
    getCoffeeStats();
  }, [axiosPrivate])

  return (
    <div className='dashboardChild mainCoffeeDashboard'>
      <h2 className='coffeeDashTitle'>Green Coffee Dashboard</h2>
      <div className='coffeeDashStats'>
        <div className='dashStat'>
          <span className='dashStatLabel'>Available Sacks</span>
          <span className='dashStatValue'>{coffeeStats.availableSacks}</span>
        </div>
        <div className='dashStat'>
          <span className='dashStatLabel'>Total Sacks</span>
          <span className='dashStatValue'>{coffeeStats.totalSacks}</span>
        </div>
        <div className='dashStat'>
          <span className='dashStatLabel'>Available Amount (kg)</span>
          <span className='dashStatValue'>{`< ${coffeeStats.availableAmount.toFixed(1)}`}</span>
        </div>
        <div className='dashStat'>
          <span className='dashStatLabel'>Total Amount (kg)</span>
          <span className='dashStatValue'>{coffeeStats.totalAmount.toFixed(1)}</span>
        </div>
      </div>
      <div className='coffeeDashChart'>
        <VictoryPie 
          data={coffeeStats.countries}
          x="name"
          y="count"
          height={300}
          width={480}
          style={{
            labels: {
              fontSize: 15,
              fill: "aliceblue"              
            }}
          }
          animate={{
            duration: 2000
          }}
          containerComponent={
            <VictoryContainer
              responsive={true}
            />
          }            
        />
      </div>
    </div>
  )
}

export interface ICoffeeStats {
  totalSacks: number,
  availableSacks: number,
  totalAmount: number,
  availableAmount: number,
  countries: Country[]
}

export interface Country {
  name: string,
  count: number
}

export const defaultCoffeeStats: ICoffeeStats = {
  totalSacks: 0,
  availableSacks: 0,
  totalAmount: 0,
  availableAmount: 0,
  countries: [{name: "", count: 0}]
}

export default MainCoffeeDashboard