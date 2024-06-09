import * as React from "react";
import { Stack, Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import EditAppointment from "./forms/EditAppointment";
import Header from "./Header";

import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";

const EditDialog = ({appointmentData}) => {
  const [open, setOpen] = React.useState(false);
  sessionStorage.setItem("rowData", JSON.stringify(appointmentData))
  // console.log(`appoint data ${appointmentData.id}`)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <React.Fragment>
      <IconButton aria-label="edit" onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
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
            <Header title="Edit Appointment" />
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
          <EditAppointment
            handleClickOpen={handleClickOpen}
            handleClose={handleClose}
          />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default EditDialog;
