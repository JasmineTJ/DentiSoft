import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { useEffect, useState } from "react";
import axios from "axios";

const EquipmentTable = ({ itemId }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    {
      field: "PurchaseID",
      headerName: "Purchase ID",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "PurchaseDate",
      type: "Purchase Date",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "Cost",
      headerName: "Cost",
      flex: 1,
    },
    {
      field: "Quantity",
      headerName: "Quantity Purchased",
      flex: 1,
    },
  ];

  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchPurchaseDetails = async () => {
      const response = await axios.get(`http://localhost:3001/admin/purchases/${itemId}`);
      setRows(response.data);
      console.log(response.data);
    };

    fetchPurchaseDetails();
  }, [itemId, rows]);

  return (
    <Box m="20px">
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
        <DataGrid getRowId={(row) => row.PurchaseID} rows={rows} columns={columns} />
      </Box>
    </Box>
  );
};

export default EquipmentTable;
