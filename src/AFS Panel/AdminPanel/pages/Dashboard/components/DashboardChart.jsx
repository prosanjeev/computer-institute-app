import React from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


const DashboardChart = () => {
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [
        {
          label: 'Branch',
          data: [45, 59, 54, 41, 66, 45],
          fill: false,
          borderColor: 'blue',
          tension: 0.1
        },
        {
          label: 'Student',
          data: [55, 69, 60, 61, 56, 55],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }
      ]
    };
  
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top'
        },
        title: {
          display: true,
          text: 'Monthly Revenue Chart'
        }
      }
    };
  
    return (
      <Box
        p={5}
        borderRadius="lg"
        boxShadow="md"
        bg={useColorModeValue('white', 'gray.800')}
      >
        <Line data={data} options={options} />
      </Box>
    );
  };

  export default DashboardChart