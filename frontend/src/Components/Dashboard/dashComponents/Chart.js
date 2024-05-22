import React, { useState } from 'react'
import { Month } from '../User/StaticDataUser'
import { ResponsiveContainer, BarChart, Bar, YAxis, XAxis, Tooltip } from 'recharts'
import { useScrollTrigger } from '@mui/material'
import noBarGraphDataImage from "../../../assets/images/noBarGraphData.png"
const Chart = () => {
  const [chartData, setChartData] = useState(null)
  return (
    <div className='App'>
      {chartData && chartData.length ?
        <ResponsiveContainer width="100%" aspect={3}>
          <BarChart data={chartData} width={100} height={400}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey='performance' fill='#6455c6' />
          </BarChart>
        </ResponsiveContainer>
        : <div className='bar-graph-no-data'>
          <img src={noBarGraphDataImage} alt="no bar graph data" className='no-bar-graph-data-image' />
          <div className='no-bar-graph-data-text'>Set up task settings to have result. Data will appear when you complete your goals</div>
        </div>
      }
    </div>
  )
}

export default Chart