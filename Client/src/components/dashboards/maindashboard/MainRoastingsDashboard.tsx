import React, { useEffect, useState } from 'react'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import { VictoryAxis, VictoryBar, VictoryChart } from 'victory';

const MainRoastingsDashboard = () => {
  const axiosPrivate = useAxiosPrivate();

  const [roastingStats, setRoastingStats] = useState(defaultRoastingStats);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const getRoastingStats = async () => {
      try {
        const response = await axiosPrivate.get('/statistics/roastings', {
          params: {
            date: date.toDateString()
          }
        })
        setRoastingStats(response.data)
      } catch (error) {
        console.error(error);
      }
    }    
    getRoastingStats();
  }, [axiosPrivate, date])

  return (
    <div className='dashboardChild mainRoastingDashboard'>
        <h2 className="roastDashTitle">
          Rostings Dashboard
        </h2>
        <div className='roastStatsContainer'>
          <h3>All Time</h3>
          <div className="roastDashStats">
            <div className='dashStat'>
              <span className='dashStatLabel'>Average Per Day (kg)</span>
              <span className='dashStatValue'>{roastingStats.averagePerDay.toFixed(3)}</span>
            </div>
            <div className='dashStat'>
              <span className='dashStatLabel'>Average Total Per Month (kg)</span>
              <span className='dashStatValue'>{roastingStats.averageTotal.toFixed(2)}</span>
            </div>
            <div className='dashStat'>
              <span className='dashStatLabel'>Total Amount (kg)</span>
              <span className='dashStatValue'>{roastingStats.total.toFixed(2)}</span>
            </div>
            <div className='dashStat'>
              <span className='dashStatLabel'>Total Working Days</span>
              <span className='dashStatValue'>{roastingStats.workingDays}</span>
            </div>
          </div>
        </div>
        <div className="roastMonthStats">
          <div className='roastMonthTitle'>
            <button 
              className='roastDashButton'
              onClick={() => {
                setDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1))
              }}
            >
              <i className='bi bi-caret-left-fill'/>
            </button>
            <h3>{date.toLocaleString('en-GB', {month: 'long'})}</h3>
            <button 
              className='roastDashButton'
              onClick={() => {
                setDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1))
              }}
            >
              <i className='bi bi-caret-right-fill'/>
            </button>
          </div>
          <div className='dashStat'>
            <span className='dashStatLabel'>Average Per Day (kg)</span>
            <span className='dashStatValue'>{roastingStats.averagePerDayThisMonth.toFixed(3)}</span>
          </div>
          <div className='dashStat'>
            <span className='dashStatLabel'>Working Days</span>
            <span className='dashStatValue'>{roastingStats.workingDaysThisMonth}</span>
          </div>
          <div className='dashStat'>
            <span className='dashStatLabel'>Total (kg)</span>
            <span className='dashStatValue'>{roastingStats.sixPreviousMonthsTotal[5].toFixed(2)}</span>
          </div>
        </div>
        <div className="roastDashChart">
          <VictoryChart 
            animate={{
              duration: 2000
            }}
          >
            <VictoryAxis 
              style={{
                axis: {
                  stroke: '#a8a8a8'
                },
                tickLabels: {
                  fill: 'aliceblue'
                },
                grid: {
                  stroke: '#a8a8a8',
                  strokeDasharray: '7',
                }
              }}
            />
            <VictoryAxis 
              dependentAxis
              style={{
                axis: {
                  stroke: '#a8a8a8'
                },
                tickLabels: {
                  fill: 'aliceblue'
                },
                grid: {
                  stroke: '#a8a8a8',
                  strokeDasharray: '7',
                } 
              }}
            />
            <VictoryBar 
              data={roastingStats.sixPreviousMonthsTotal.map((m, i) => {
                return {
                  x: new Date(date.getFullYear(), date.getMonth() - (5 - i))
                    .toLocaleString('en-GB', {month: 'short'}),
                  y: m
                }
              })}
              labels={({datum}) => `${datum.y.toFixed(2)}`}
              style={{
                data: {fill: '#c9c9c9'},
                labels: {fill: '#c9c9c9'}
              }}
              animate={{
                duration: 2000,
                onLoad: { duration: 1000 }
              }}
              alignment='start'
            />
          </VictoryChart>
        </div>
    </div>
  )
}

export interface IRoastingStats {
  averagePerDay: number,
  averagePerDayThisMonth: number,
  total: number,
  averageTotal: number,
  sixPreviousMonthsTotal: number[],
  workingDays: number,
  workingDaysThisMonth: number
}

export const defaultRoastingStats: IRoastingStats = {
  averagePerDay: 0,
  averagePerDayThisMonth: 0,
  total: 0,
  averageTotal: 0,
  sixPreviousMonthsTotal: [0,0,0,0,0,0], //Rewrite with fill
  workingDays: 0,
  workingDaysThisMonth: 0
}

export default MainRoastingsDashboard