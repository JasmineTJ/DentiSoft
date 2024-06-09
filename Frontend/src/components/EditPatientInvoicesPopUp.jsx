// EditPatientInvoicesPopUp.js
import * as React from "react";
import { Stack, Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import Header from "./Header";
import ReceiptIcon from "@mui/icons-material/Receipt";
import "../InvoicesPopUp.css";
import axios from "axios";

import EditPatientInvoices from "./EditPatientInvoices";

const EditPatientInvoicesPopUp = ({ patientId }) => {
  const [open, setOpen] = React.useState(false);
  const [invoices, setInvoices] = React.useState([]);

  const handleClickOpen = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/admin/invoices/${patientId}`);
      setInvoices(response.data);
      setOpen(true);
    } catch (error) {
      console.error('Failed to fetch invoices:', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        startIcon={<ReceiptIcon />}
        color="warning"
        variant="contained"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "50px",
          pr: "2%",
        }}
        onClick={handleClickOpen}
      ></Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
          <Stack
            display={"flex"}
            direction={"row"}
            alignItems={"start"}
            justifyContent={"space-between"}
          >
            <Header title="Edit This Patient Invoices Status" />
            <Button
              startIcon={<CloseIcon />}
              color="primary"
              variant="contained"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                pl: "3%",
                ":hover": { backgroundColor: "red" },
              }}
              onClick={handleClose}
            />
          </Stack>
        </DialogTitle>
        <DialogContent>
          <EditPatientInvoices patientId={patientId} invoices={invoices} />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default EditPatientInvoicesPopUp;
