import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { mockOperationsData as data } from "../data/mockData";


const OperationPieChart = ({ operation }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorStyle = theme.palette.mode === "dark"
      ? `${colors.grey[200]}`
      : `${colors.grey[200]}`;
  
    // Prepare the data for the pie chart
    const operationData = data.find(op => op.operation === operation);
    const series = Object.keys(operationData).filter(key => key !== 'operation' && !key.endsWith('Color')).map(key => operationData[key]);
    const labels = Object.keys(operationData).filter(key => key !== 'operation' && !key.endsWith('Color'));
    // Create a mapping of operations to color schemes
    const operationColors = {
        'Cleaning': [colors.blueAccent[200], colors.blueAccent[300], colors.blueAccent[400], colors.blueAccent[500], colors.blueAccent[600]],
        'Fillings': [colors.greenAccent[200], colors.greenAccent[300], colors.greenAccent[400], colors.greenAccent[500], colors.greenAccent[600]],
        'Orthodontics': [colors.redAccent[200], colors.redAccent[300], colors.redAccent[400], colors.redAccent[500], colors.redAccent[600]],
        'Extractions': [colors.blueAccent[200], colors.blueAccent[300], colors.blueAccent[400], colors.blueAccent[500], colors.blueAccent[600]],
        'Surgery': [colors.greenAccent[200], colors.greenAccent[300], colors.greenAccent[400], colors.greenAccent[500], colors.greenAccent[600]],
        'Other': [colors.redAccent[200], colors.redAccent[300], colors.redAccent[400], colors.redAccent[500], colors.redAccent[600]],
    };
    const options = {
      labels: labels,
      fill: {
        colors: operationColors[operation],
        opacity: 1,
        type: 'solid',
      },
      theme: {
        monochrome: {
          enabled: false,
        },
      },
      legend: {
        show: true,
        markers: {
          colors: operationColors[operation],
        },
        labels: {
             colors: colorStyle,
        },
        position: 'top',
        offsetX: 0,
        offsetY: 0,
      },
      stroke: {
        show: true,
        width: 2,
        colors: colors.primary[400],
      },
    };
  
    return <Chart options={options} series={series} type="pie" />;
  };
  
  export default OperationPieChart;
  