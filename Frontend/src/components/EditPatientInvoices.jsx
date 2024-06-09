// EditPatientInvoices.js
import { Box, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { useState, useEffect } from 'react';
import axios from 'axios';

const EditPatientInvoices = ({ patientId }) => {
  const [invoices, setInvoices] = useState([]);
  
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/admin/invoices/${patientId}`);
        const invoicesWithId = response.data.map(invoice => ({ id: invoice.BillingId, ...invoice }));
        setInvoices(invoicesWithId);
      } catch (error) {
        console.error('Failed to fetch invoices:', error);
      }
    };
  
    fetchInvoices();
  }, [patientId, invoices]);

const toggleInvoiceStatus = async (invoiceId) => {
  try {
    await axios.patch(`http://localhost:3001/admin//invoices/status/${invoiceId}`);
    const response = await axios.get(`http://localhost:3001/admin/invoices/${patientId}`);
    const invoicesWithId = response.data.map(invoice => ({ id: invoice.BillingId, ...invoice }));
    setInvoices(invoicesWithId);
  } catch (error) {
    console.error('Failed to toggle invoice status:', error);
  }
};
    
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "BillingId", headerName: "Billing ID" },
    {
      field: "Date",
      type: "Date",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "TotalCost",
      headerName: "Total Cost",
      flex: 1,
    },
    {
      field: "DentistName",
      headerName: "Doctor Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "InsuranceCoverage",
      headerName: "Insurance Coverage",
      flex: 1,
    },
    {
      field: "CostAfterInsuranceCoverage",
      headerName: "Total After Insurance",
      flex: 1,
    },
    {
      field: "Status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          sx={{
            backgroundColor: params.row.Status === "Paid" ? "green" : "red",
          }}
          onClick={() => toggleInvoiceStatus(params.row.BillingId)}
        >
          {params.row.Status}
        </Button>
      ),
    },
  ];

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
        {invoices && invoices.length > 0 && <DataGrid rows={invoices} columns={columns} />}
      </Box>
    </Box>
  );
};

export default EditPatientInvoices;
