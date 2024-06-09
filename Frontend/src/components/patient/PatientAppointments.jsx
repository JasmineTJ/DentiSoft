import React from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import axios from "axios";
import { tokens } from "../../theme";
import { mockDataAppointments } from "../../data/mockData";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import AppointmentPopUp from "../AppointmentPopUp";
import "../../PatientSidebar.css";

import Header from "../../components/Header";
// import { cancelAppointment } from "../../../../server/controllers/patientsController";

const PatientAppointments = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = React.useState(mockDataAppointments);
  const [rowsPast, setRowsPast] = React.useState(mockDataAppointments);
  const patient = sessionStorage.getItem('user')

  React.useEffect(() => {
    axios.get("http://localhost:3001/login/patient/appointments", {params: {patient: patient}})
      .then((res) => {
        console.log(res.data);
        const {scheduledAppointmentsDetails, cancelledAppointmentsDetails, completedAppointmentsDetails} = res.data
        setRows(scheduledAppointmentsDetails);
        // setRows(res.data);
        setRowsPast(cancelledAppointmentsDetails, completedAppointmentsDetails)
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
      });
  }, [patient, rows, rowsPast]);

  const cancelAppointment = React.useCallback(
    (id) => {
      axios.delete(`http://localhost:3001/login/patient/appointments/cancelAppointment/${id}`)
        .then((res) => {
          console.log("Appointment cancelled successfully:", res.data)
          // Filter out the deleted appointment from the rows state
          setRows((prevRows) => prevRows.filter((row) => row.id !== id))
          window.location.reload()
        })
        .catch((error) => {
          console.error("Error deleting appointment:", error);
        });
    },
    [rows]
  );

  const deleteAppointment = React.useCallback(
    (id) => {
      axios.delete(`http://localhost:3001/login/patient/appointments/deleteAppointment/${id}`)
        .then((res) => {
          console.log("Appointment deleted successfully:", res.data)
          // Filter out the deleted appointment from the rows state
          setRowsPast((prevRows) => prevRows.filter((row) => row.id !== id))
          window.location.reload()
        })
        .catch((error) => {
          console.error("Error deleting appointment:", error);
        });
    },
    []
  );

  const upcomingColumns = [
    { field: "id", headerName: "ID" },
    {
      field: "doctorName",
      headerName: "Doctor Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "appointmentDate",
      headerName: "Appo. Date",
      type: "Date",
      headerAlign: "left",
      align: "center",
    },
    {
      field: "appointmentTime",
      headerName: "Appo. Time",
      flex: 1,
    },
    {
      field: "doctorEmail",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "conditionReason",
      headerName: "Condition/Reason",
      flex: 1,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      flex: 1,
      getActions: (params) => [
        <GridActionsCellItem
          icon={
            <IconButton aria-label="delete" color="error" size="large">
              <CancelIcon />
            </IconButton>
          }
          label="Delete"
          onClick={() => cancelAppointment(params.row.id)}
        />,
        <AppointmentPopUp appointmentData={params.row} />,
      ],
    },
  ];
  const pastColumns = [
    { field: "id", headerName: "ID" },
    {
      field: "doctorName",
      headerName: "Doctor Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "appointmentDate",
      headerName: "Appo. Date",
      type: "Date",
      headerAlign: "left",
      align: "center",
    },
    {
      field: "appointmentTime",
      headerName: "Appo. Time",
      flex: 1,
    },
    {
      field: "doctorEmail",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "conditionReason",
      headerName: "Condition/Reason",
      flex: 1,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      flex: 1,
      getActions: (params) => [
        <GridActionsCellItem
          icon={
            <IconButton aria-label="delete" color="error" size="large">
              <DeleteIcon />
            </IconButton>
          }
          label="Delete"
          onClick={() => deleteAppointment(params.row.id)}
        />,
      ],
    },
  ];

  return (
    <Box m="20px">
      <Header title="Upcoming Appointments" />
      <Box
        m="40px 0 0 0"
        height="50vh"
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
        <DataGrid checkboxSelection rows={rows} columns={upcomingColumns} />
      </Box>
      <Box mt={"3%"}>
        <Header title="Past Appointments" />
      </Box>
      <Box
        m="40px 0 0 0"
        height="50vh"
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
        <DataGrid checkboxSelection rows={rowsPast} columns={pastColumns} />
      </Box>
    </Box>
  );
};

export default PatientAppointments;
