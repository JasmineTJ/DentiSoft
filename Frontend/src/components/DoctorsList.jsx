import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { mockDoctorData } from "../data/mockData";

const DoctorsList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { 
      field: "Image",
      headerName: "#",
      flex: 0.5,
    },
    {
      field: "Name",
      headerName: "Doctor Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "Status",
      headerName: "Status",
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
            fontSize: '13px',
            backgroundColor: params.row.Status === "Available" ? colors.greenAccent[500] : colors.redAccent[500],
          }}
        >
          {params.row.Status}
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Box
        m="20px 0 0 0"
        height="100vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
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
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .css-78c6dr-MuiToolbar-root-MuiTablePagination-toolbar": {
            minWidth: "300px",
            overflow: "hidden",
          },
        }}
      >
        <DataGrid 
        rows={mockDoctorData} 
        columns={columns} 
        getRowId={(row) => row.ID}
        hideFooter={true} 
        />
      </Box>
    </Box>
  );
};

export default DoctorsList;
