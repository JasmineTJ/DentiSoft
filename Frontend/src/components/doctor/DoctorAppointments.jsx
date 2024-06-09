import React from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDoctorDataAppointments } from "../../data/mockData";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import axios from "axios";

import Header from "../../components/Header";

const DoctorAppointments = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = React.useState(mockDoctorDataAppointments);
  const user = sessionStorage.getItem('user')
  console.log(user)

  React.useEffect(() => {
    const fetchAppointments = async () => {
      console.log(rows)
      try {
        const response = await axios.get('http://localhost:3001/dentist/appointments', {params: {dentist: user}});
        console.log(response);
        const dataWithIds = response.data.map(item => ({ ...item, id: item.ID }));
        setRows(dataWithIds);
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
      }
    };
  
    fetchAppointments();
  }, [user, rows]);

  const deleteUser = React.useCallback(
    (id) => {
      setTimeout(() => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      });
    },
    [setRows]
  );

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "patientName",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "dateTime",
      headerName: "Date & Time",
      type: "Date",
      flex: 1,
    },
    {
      field: "mobile",
      headerName: "Mobile Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "disease",
      headerName: "Disease/Reason",
      flex: 1,
    },
    // {
    //   field: "actions",
    //   type: "actions",
    //   headerName: "Actions",
    //   flex: 1,
    //   getActions: (params) => [
    //     <GridActionsCellItem
    //       icon={
    //         <IconButton aria-label="delete" color="error" size="large">
    //           <CancelIcon />
    //         </IconButton>
    //       }
    //       label="Delete"
    //       onClick={() => deleteUser(params.id)}
    //     />,
    //     <IconButton>
    //       <CheckCircleIcon color="success" />
    //     </IconButton>,
    //   ],
    // },
  ];

  return (
    <Box m="20px">
      <Header title="Appointments" subtitle="Managing Your Appointments" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .css-78c6dr-MuiToolbar-root-MuiTablePagination-toolbar": {
            minWidth: "300px",
            overflow: "hidden",
          },
        }}
      >
        <DataGrid checkboxSelection rows={rows} columns={columns} />
      </Box>
    </Box>
  );
};

export default DoctorAppointments;
