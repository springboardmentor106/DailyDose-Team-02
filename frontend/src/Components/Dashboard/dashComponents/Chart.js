import React from 'react'
import { ResponsiveContainer, BarChart, Bar, YAxis, XAxis, Tooltip } from 'recharts'
import noBarGraphDataImage from "../../../assets/images/noBarGraphData.png"

const Chart = ({ chartData }) => {
console.log(chartData)
  return (
    <div className='App'>
      {chartData ?
        <ResponsiveContainer width="100%" aspect={3}>
          <BarChart data={chartData} width={100} height={400}>
            <XAxis dataKey="month" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Bar dataKey='completePercentage' fill='#6455c6' />
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