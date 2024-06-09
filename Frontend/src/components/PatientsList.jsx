import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { mockPatientData } from "../data/mockData";

const PatientsList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // Calculate the treatment counts
  const treatmentCounts = {};

  mockPatientData.forEach(patient => {
    patient.medicalRecords.forEach(record => {
      if (treatmentCounts[record.treatment]) {
        treatmentCounts[record.treatment]++;
      } else {
        treatmentCounts[record.treatment] = 1;
      }
    });
  });
  // Transform treatmentCounts into an array of objects
  const treatments = Object.keys(treatmentCounts).map(treatment => ({
    treatment,
    count: treatmentCounts[treatment],
  }));

  const columns = [
    { 
      field: "treatment",
      headerName: "Patients Groups",
      flex: 2,
      cellClassName: "name-column--cell"
    },
    {
      field: "count",
      headerName: "No. of Patients",
      flex: 1,
      renderCell: (params) => (
        <Box
          display="inline"
          alignItems="center"
          border={`1px solid rgba(255, 255, 255,0)`}
          borderRadius={'5px'}
          colors={colors.grey[100]}
          p="7px"
          m="20px"
          variant="contained"
          sx={{
            backgroundColor: params.row.count > 10 ? colors.greenAccent[500] : colors.redAccent[500],
            minWidth: '50px',
            justifyContent: 'center',
          }}
        >
          {params.value}
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Box
        sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              fontSize: "1.1em",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
              fontSize: "1.2em",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .css-78c6dr-MuiToolbar-root-MuiTablePagination-toolbar": {
              minWidth: "300px",
              overflow: "hidden",
            },
          }}
      >
      <DataGrid 
        rows={treatments} 
        columns={columns} 
        getRowId={(row) => row.treatment}
        hideFooter={true} 
        autoHeight={true}
      />
      </Box>
    </Box>
  );
};

export default PatientsList;
