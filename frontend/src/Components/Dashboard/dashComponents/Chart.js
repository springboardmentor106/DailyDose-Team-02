import React, { useEffect, useState } from 'react'
import { Month } from '../User/StaticDataUser'
import { ResponsiveContainer, BarChart, Bar, YAxis, XAxis, Tooltip } from 'recharts'
import { useScrollTrigger } from '@mui/material'
import noBarGraphDataImage from "../../../assets/images/noBarGraphData.png"
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Constants from '../../../constants'
const Chart = () => {
  const [chartData, setChartData] = useState(null)
  const navigate = useNavigate()
  const getGoalProgress = async () => {
    try {
      const token = localStorage.getItem("token");
      const caretakerId = localStorage.getItem("caretakerId");
      const response = await fetch(Constants.BASE_URL + '/api/goals/monthly-stats', {
        method: "POST",
        headers: {
          'Content-Type': "application/json",
          'Authorization': token
        },
        body: JSON.stringify({ caretakerId: caretakerId })
      });

      if (response.status === 401) {
        navigate("/login");
        localStorage.clear();
        return; // Added return to exit function early
      }

      const data = await response.json();
      if (data.status === "success") {
        console.log("chart data", data.monthsData)
        setChartData(data.monthsData)
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.message); // changed to error.message to properly display the error
    }
  };

  useEffect(() => {
    getGoalProgress()
  }, [])
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