import React from "react";
import axios from "axios";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataPrescriptions } from "../../data/mockData";
import Header from "../../components/Header";

const PatientPrescriptions = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
    const patient = sessionStorage.getItem('user')
    const [rows, setRows] = React.useState(mockDataPrescriptions);
  React.useEffect(() => {
    axios.get('http://localhost:3001/login/patient/prescriptions', {params: {patient: patient}})
    .then((res) => {
        setRows(res.data)
      })}, [rows, patient]);

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      cellClassName: "title-column--cell",
    },
    {
      field: "doctorName",
      headerName: "Created by",
    },
    {
      field: "date",
      type: "Date",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "disease",
      headerName: "Disease/Condition",
      flex: 1,
    },
    {
      field: "drugs",
      headerName: "Medications",
      flex: 1,
      renderCell: (params) => (
        <Typography
          display={"flex"}
          flexDirection={"row"}
          flexWrap={"wrap"}
          style={{ whiteSpace: "normal", maxWidth: "300px", minWidth: "70px" }}
          color={colors.greenAccent[500]}
        >
          {params.row.drugs.join(", ")}
        </Typography>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="Prescriptions" subtitle={"View Your Prescriptions"} />
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
        <DataGrid rows={rows} columns={columns} />
      </Box>
    </Box>
  );
};

export default PatientPrescriptions;
