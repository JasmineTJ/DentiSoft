import React, { useEffect, useState, useCallback } from "react";
import axios from 'axios';
import { Box, useTheme } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import Header from "../../components/Header";
import AppointmentPopUp from "../AppointmentPopUp";

const AdminAppointments = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:3001/admin/appointments');
        console.log(response);
        const dataWithIds = response.data.map(item => ({ ...item, id: item.ID }));
        setRows(dataWithIds);
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
      }
    };
  
    fetchAppointments();
  }, [rows]);
  
  // Separate useEffect for logging
  useEffect(() => {
    console.log(rows);
  }, [rows]);
  
  const deleteAppointment = useCallback(
    async (id) => {
      try {
        // Call the API endpoint to delete the appointment
        await axios.delete(`http://localhost:3001/admin/appointments/${id}`);
  
        // Remove the deleted appointment from the local state
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  
        // Send an alert to the user
        alert('Appointment deleted successfully!');
      } catch (error) {
        console.error('Failed to delete appointment:', error);
        alert('Failed to delete appointment. Please try again.');
      }
    },
    [setRows]
  );
    
  const columns = [
    { field: "ID", headerName: "ID" },
    { field: "Patient Name", headerName: "Patient Name", flex: 1, cellClassName: "name-column--cell" },
    { field: "Email", headerName: "Email", flex: 1 },
    { field: "Gender", headerName: "Gender" },
    { field: "Date", type: "Date", headerName: "Date", flex: 1 },
    { field: "Time", type: "Time", headerName: "Time", flex: 1 },
    { field: "Mobile Number", type: "Number", headerName: "Mobile Number", flex: 1 },
    { field: "Doctor Name", type: "Name", headerName: "Doctor Name", flex: 1 },
    { field: "Service Name", headerName: "Service Name", flex: 1 },  
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      flex: 1,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<CancelIcon color="error" />}
          label="Delete"
          onClick={() => deleteAppointment(params.id)}
        />,
        <AppointmentPopUp />,
      ],      
    },
  ];
  
  return (
    <Box m="20px">
      <Header title="Appointments" subtitle={"Manage Appointments"} />
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

export default AdminAppointments;
