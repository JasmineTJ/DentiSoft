import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { mockPatientData as data } from "../data/mockData";
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const PatientsStackedChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorStyle = theme.palette.mode === "dark"
    ? `${colors.grey[200]}`
    : `${colors.grey[200]}`;

  const [selectedYears, setSelectedYears] = useState([]);
  const [series, setSeries] = useState([{ name: 'Patients', data: [] }]);
  const [seriesQuarter, setSeriesQuarter] = useState([]);
  const [categories, setCategories] = useState([]);
  const [yearColors, setYearColors] = useState([]);

  const distinctColors = [
    colors.greenAccent[400], 
    colors.redAccent[300], 
    colors.blueAccent[400],
    colors.greenAccent[500], 
    colors.redAccent[400], 
    colors.blueAccent[500],
    colors.greenAccent[600], 
    colors.redAccent[500], 
    colors.blueAccent[600]
  ];

  const options = {
    chart: {
      id: 'barYear',
      height: '100%',
      type: 'bar',
      events: {
        dataPointSelection: (event, chartContext, config) => {
          const selectedYear = parseInt(config.w.globals.labels[config.dataPointIndex], 10);
          setSelectedYears(prevSelectedYears => {
            if (!prevSelectedYears.includes(selectedYear)) {
              return [...prevSelectedYears, selectedYear];
            }
            return prevSelectedYears;
          });
        },
      },
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: true,
        },
      },
    },
    plotOptions: {
      bar: {
        distributed: true,
        horizontal: true,
        barHeight: '50%',
        dataLabels: {
          position: 'bottom'
        }
      }
    },
    dataLabels: {
      enabled: true,
      textAnchor: 'start',
      style: {
        colors: theme.palette.mode === "dark" ? [colors.primary[400]] : [colors.primary[600]],
      },
      formatter: function (val, opt) {
        return opt.w.globals.labels[opt.dataPointIndex];
      },
      offsetX: 0,
      dropShadow: {
        enabled: false
      }
    },
    legend:{
        labels: {
            colors: colorStyle,
       },
    },
    colors: yearColors,
    title: {
      text: 'Yearly Results',
      offsetX: 15,
      style: {
        color: colorStyle
      }
    },
    subtitle: {
      text: '(Click on bar to see details)',
      offsetX: 15,
      style: {
        color: colorStyle
      }
    },
    yaxis: {
      labels: {
        show: false
      }
    },
    xaxis: {
      categories: categories,
      labels: {
        style: {
          colors: [colorStyle],
          fontSize: '12px'
        }
      }
    },
    tooltip: {
      theme: theme.palette.mode,
    },
    toolbar: {
      show: false,
    }
  };

  const optionsQuarter = {
    chart: {
      id: 'barQuarter',
      height: "100%",
      type: 'bar',
      stacked: true,
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: true,
        },
      },
    },
    plotOptions: {
      bar: {
        columnWidth: '50%',
        horizontal: false
      }
    },
    colors: selectedYears.map(year => yearColors[categories.indexOf(year.toString())]),
    legend: {
      show: true,
      labels: {
        colors: colorStyle,
      },
    },
    grid: {
      yaxis: {
        lines: {
          show: false,
        }
      },
      xaxis: {
        lines: {
          show: true,
        },
      },
    },
    yaxis: {
      labels: {
        show: false
      }
    },
    xaxis: {
      categories: ['Q1', 'Q2', 'Q3', 'Q4'],
      labels: {
        style: {
          colors: colorStyle,
          fontSize: '12px'
        }
      }
    },
    title: {
      text: 'Quarterly Results',
      offsetX: 10,
      style: {
        color: colorStyle
      }
    },
    subtitle: {
      text: '(Click on legends to show/hide details)',
      offsetX: 15,
      style: {
        color: colorStyle
      }
    },
    tooltip: {
      theme: theme.palette.mode,
      x: {
        formatter: function (val, opts) {
          return opts.w.globals.seriesNames[opts.seriesIndex];
        }
      },
      y: {
        title: {
          formatter: function (val, opts) {
            return opts.w.globals.labels[opts.dataPointIndex];
          }
        }
      }
    }
  };

  useEffect(() => {
    const yearlyData = getYearlyData(data);
    const newCategories = yearlyData.map(item => item.year.toString());
    const colors = yearlyData.map((_, index) => distinctColors[index % distinctColors.length]);
    
    setSeries([{ name: 'Patients', data: yearlyData.map(item => item.count) }]);
    setCategories(newCategories);
    setYearColors(colors);
  }, [series, categories, yearColors, distinctColors]);

  useEffect(() => {
    if (selectedYears.length > 0) {
      const updatedSeriesQuarter = selectedYears.map(year => {
        const quarterlyData = getQuarterlyData(data, year);
        return { name: `Year ${year}`, data: quarterlyData };
      });
      setSeriesQuarter(updatedSeriesQuarter);
    } else {
      setSeriesQuarter([]); // Clear the seriesQuarter if no years are selected
    }
  }, [selectedYears]);  

  const getYearlyData = (data) => {
    let yearlyData = {};
    data.forEach(patient => {
      patient.medicalRecords.forEach(record => {
        const year = new Date(record.date).getFullYear();
        yearlyData[year] = yearlyData[year] ? yearlyData[year] + 1 : 1;
      });
    });
    return Object.entries(yearlyData).map(([year, count]) => ({ year: parseInt(year, 10), count }));
  };

  const getQuarterlyData = (data, selectedYear) => {
    let quarterlyData = [0, 0, 0, 0]; // For each quarter of the year
    data.forEach(patient => {
      patient.medicalRecords.forEach(record => {
        const recordDate = new Date(record.date);
        if (recordDate.getFullYear() === selectedYear) {
          const quarter = Math.floor(recordDate.getMonth() / 3);
          quarterlyData[quarter]++;
        }
      });
    });
    return quarterlyData;
  };

  return (
    <div>
      <div id="wrap" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div id="chart-year">
          <Chart options={options} series={series} type="bar" width={400} height={350} />
        </div>
        {selectedYears.length > 0 && (
          <div id="chart-quarter">
            <Chart options={optionsQuarter} series={seriesQuarter} type="bar" width={400} height={350} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientsStackedChart;
