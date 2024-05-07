import React from 'react'
import {ResponsiveContainer,BarChart,Bar, YAxis,XAxis, Tooltip} from 'recharts'
const Chart = () => {
    const Month=[
        {name:'Jan', performance:20},{name:'Feb', performance:50},{name:'Mar', performance:80},{name:'Apr', performance:60},
        {name:'May', performance:30},{name:'Jun', performance:20},{name:'Jul', performance:40},{name:'Aug', performance:90},
        {name:'Sep', performance:70},{name:'Oct', performance:60},{name:'Nov', performance:50},{name:'Dec', performance:20}
    ]
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
