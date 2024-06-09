import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { mockRadialData as data } from "../data/mockData";

const RadialChart = () => {
  const theme = useTheme();
  const [themeMode, setThemeMode] = useState(theme.palette.mode);
  
  const colors = tokens(themeMode);
  const colorStyle = themeMode === "dark" ? colors.grey[200] : colors.grey[400];

  // Update themeMode state when theme changes
  // useEffect(() => {
  //   setThemeMode(theme.palette.mode);
  // }, [theme.palette.mode]);

  // Extract the labels and series from the mock data
  const labels = Object.keys(data);
  const series = Object.values(data).map(value => parseInt(value, 10));

  const options = {
    chart: {
      height: 300,
      type: 'radialBar',
      toolbar: {
        show: true,
        tools: {
          download: true,
        }
      }
    },
    plotOptions: {
      radialBar: {
        hollow: {
            margin: 5,
            size: '50%',
            background: 'transparent',
        },
        track: {
            show: true,
            strokeWidth: '80%',
            opacity: 1,
            margin: 6, 
            dropShadow: {
                enabled: true,
                top: 0,
                left: 0,
                blur: 1,
                opacity: 0.4
            }
        },
        dataLabels: {
          name: {
            fontSize: '20px',
          },
          value: {
            fontSize: '16px',
            color: colorStyle,
            formatter: function (val) {
                return val + ''
              }
          },
          total: {
            show: true,
            label: 'Total',
            color: colorStyle,
            fontSize: '17px',
            formatter: function () {
              return series.reduce((a, b) => a + b, 0);
            }
          }
        }
      }
    },
    labels: labels,
    colors: [colors.blueAccent[500], colors.redAccent[500], colors.greenAccent[600]],
  };

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={options} series={series} type="radialBar" height={300} />
      </div>
    </div>
  );
}

export default RadialChart;
