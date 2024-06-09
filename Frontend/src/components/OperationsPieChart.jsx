import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { mockOperationsData as data } from "../data/mockData";
import OperationPieChart from './1OperationPieChart';

const OperationsPieChart = () => {
  const [selectedOperation, setSelectedOperation] = useState(null);
  const theme = useTheme();
  const [themeMode, setThemeMode] = useState(theme.palette.mode);

  // This effect runs when the theme changes
  // useEffect(() => {
  //   setThemeMode(theme.palette.mode);
  // }, [theme.palette.mode]);
  const colors = tokens(themeMode);
  const colorStyle = themeMode === "dark"
    ? `${colors.grey[200]}`
    : `${colors.grey[200]}`;

  // Calculate the total for each operation
  const operationTotals = data.map(operation => {
    let total = 0;
    for (let key in operation) {
      if (key !== 'operation' && !key.endsWith('Color')) {
        total += operation[key];
      }
    }
    return total;
  });

  const options = {
    chart: {
      height: '100%',
      events: {
        dataPointSelection: (event, chartContext, config) => {
          const operation = config.w.config.labels[config.dataPointIndex];
          setSelectedOperation(operation);
          console.log(operation);
        }
      }
    },
    labels: data.map(operation => operation.operation),
    fill: {
      colors: [colors.blueAccent[200], colors.greenAccent[400], colors.redAccent[400], colors.greenAccent[200], colors.blueAccent[500], colors.redAccent[200]],
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
        colors: data.map(doctor => doctor.color),
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
      width: 3,
      colors: colors.primary[400],
    },
    // tooltip: {
    //   custom: ({ series, seriesIndex, dataPointIndex, w }) => {
    //     const label = w.globals.labels[dataPointIndex];
    //     const value = series[seriesIndex] ? series[seriesIndex][dataPointIndex] : undefined;
    //     return (
    //       '<div style="padding: 10px;">' +
    //       '<strong>' + (label || 'N/A') + ': ' + (value || 'N/A') + '</strong>' +
    //       '<br/>Click for more details' +
    //       '</div>'
    //     );
    //   }
    // }
  };
  // const options2 = {
  //   chart: {
  //     height: '100%',
  //     events: {
  //       dataPointSelection: (event, chartContext, config) => {
  //         const operation = config.w.config.labels[config.dataPointIndex];
  //         setSelectedOperation(operation);
  //         console.log(operation);
  //       }
  //     }
  //   },
  //   plotOptions: {
  //     pie: {
  //       customScale: 1
  //     }
  //   },
  //   labels: data.map(operation => operation.operation),
  //   dataLabels:{
  //     style: {
  //       fontSize: '13px',
  //     },
  //   },
  //   fill: {
  //     colors: [colors.blueAccent[200], colors.greenAccent[400], colors.redAccent[400], colors.greenAccent[200], colors.blueAccent[500], colors.redAccent[200]],
  //     opacity: 1,
  //     type: 'solid',
  //   },
  //   theme: {
  //     monochrome: {
  //       enabled: false,
  //     },
  //   },
  //   legend: {
  //     show: true,
  //     markers: {
  //       colors: data.map(doctor => doctor.color),
  //     },
  //     labels: {
  //       colors: colorStyle,
  //     },
  //     position: 'top',
  //     offsetX: 0,
  //     offsetY: 12
  //   },
  //   stroke: {
  //     show: true,
  //     width: 3,
  //     colors: colors.primary[400],
  //   },
  // };
  return (
    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
      <div style={{ flex: 1 }}>
        <Chart key= {themeMode} options={options} series={operationTotals} type="pie" />
      </div>
      {selectedOperation && (
        <div style={{ flex: 1 }}>
          <OperationPieChart operation={selectedOperation} />
        </div>
      )}
    </div>
  );
  // return (
  //   <div style={{ marginTop: selectedOperation ? '0px' : '-110px', height:'300px', display: 'flex', justifyContent: 'space-evenly' }}>
  //     <div style={{ flex: 1 }}>
  //       <Chart key={themeMode} options={selectedOperation ? options2 : options} series={operationTotals} type="pie" />
  //     </div>
  //     {selectedOperation && (
  //       <div style={{ flex: 1 }}>
  //         <OperationPieChart operation={selectedOperation} />
  //       </div>
  //     )}
  //   </div>
  // );
};

export default OperationsPieChart;
