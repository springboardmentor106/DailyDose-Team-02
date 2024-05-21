import React from 'react'
import {ResponsiveContainer,BarChart,Bar, YAxis,XAxis, Tooltip} from 'recharts'
const Chart = ({Month}) => {

  return (
    <div className='App'>
        <ResponsiveContainer width="100%" aspect={3}>
            <BarChart data={Month} width={100} height={400}>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Bar dataKey='performance' fill='#6455c6' />
            </BarChart>
        </ResponsiveContainer>
      
    </div>
  )
}

export default Chart