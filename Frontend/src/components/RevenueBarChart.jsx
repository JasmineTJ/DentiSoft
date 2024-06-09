import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { mockDoctorData as data } from "../data/mockData";

const RevenueBarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const [themeMode, setThemeMode] = useState(theme.palette.mode);
  
  const colors = tokens(themeMode);
  const colorStyle = themeMode === "dark" ? colors.grey[200] : colors.grey[400];

  // Update themeMode state when theme changes
  // useEffect(() => {
  //   setThemeMode(theme.palette.mode);
  // }, [theme.palette.mode]);

  // Calculate total revenue
  const totalRevenue = data.reduce((total, doctor) => total + doctor.Revenue, 0);

  // Prepare series data
  const seriesData = data.map(doctor => parseFloat((doctor.Revenue / totalRevenue * 100).toFixed(2)));

  const [series] = useState([
    {
      name: "Revenue Percentage",
      data: seriesData
    }
  ]);

  const options = {
    chart: {
      height: '100%',
      type: 'bar',
    },
    plotOptions: {
      bar: {
        columnWidth: '20px',
        distributed: true,
        borderRadius: 4,
        dataLabels: {
          position: 'top',
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + "%";
      },
      offsetY: -17,
      style: {
        fontSize: '12px',
        colors: [colorStyle],
      }
    },
    colors: [colors.blueAccent[400], colors.greenAccent[400]],
    xaxis: {
      categories: data.map(doctor => doctor.Name),
      position: 'bottom',
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: true
      },
      labels: {
        style: {
          colors: colorStyle,
        }
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          }
        }
      },
    },
    yaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: true,
        style: {
          colors: colorStyle,
        },
        formatter: function (val) {
          return val + "%";
        }
      }
    },
    tooltip: {
      theme: themeMode === "dark" ? "dark" : "light",
    },
    legend: {
      show: false,
    },
  };

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="bar" height={340} />
    </div>
  );
};

export default RevenueBarChart;
