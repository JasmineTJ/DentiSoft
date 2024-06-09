import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useTheme } from '@mui/material';
import { tokens } from '../theme';
import { mockPatientData as data } from '../data/mockData';

const DistributedBarChart = () => {
  const theme = useTheme();
  const [themeMode, setThemeMode] = useState(theme.palette.mode);
  
  const colors = tokens(themeMode);
  const colorStyle = themeMode === "dark" ? colors.grey[200] : colors.grey[400];

  // Update themeMode state when theme changes
  // useEffect(() => {
  //   setThemeMode(theme.palette.mode);
  // }, [theme.palette.mode]);

  // Count the number of male and female patients
  const maleCount = data.filter(patient => patient.gender === 'Male').length;
  const femaleCount = data.filter(patient => patient.gender === 'Female').length;

  // Chart options and series
  const series = [
    {
      name: 'Patients',
      data: [
        { x: 'Male', y: maleCount },
        { x: 'Female', y: femaleCount }
      ]
    }
  ];
  

  const options = {
    chart: {
      height: 260,
      type: 'bar',
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false,
        },
      },
    },
    colors: [colors.blueAccent[500], themeMode === "dark" ? colors.redAccent[200] : colors.redAccent[700]],
    plotOptions: {
      bar: {
        columnWidth: '25%',
        distributed: true,
        borderRadius: 7,
      },
    },
    dataLabels: {
        enabled: false
    },
    legend: {
        show: false
    },
    tooltip: {
        theme: themeMode,
    },
    xaxis: {
        axisTicks: {
            show: false
        },
        categories: ['Male', 'Female'],
        labels: {
            style: {
                colors: [colors.blueAccent[500], themeMode === "dark" ? colors.redAccent[200] : colors.redAccent[500]],
                fontSize: '12px'
            }
        }
    },
    yaxis: {
        labels: {
            style: {
            colors: colorStyle,
            fontSize: '12px'
            }
        }
    },
  };
  return (
    <div>
      <div id="chart">
        <ReactApexChart options={options} series={series} type="bar" height={260} />
      </div>
    </div>
  );
}

export default DistributedBarChart;
