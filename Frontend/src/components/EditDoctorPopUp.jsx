import * as React from "react";
import { Stack, Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import EditDoctor from "./forms/EditDoctor";
import Header from "./Header";

import EditIcon from "@mui/icons-material/Edit";

const EditDoctorPopUp = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <React.Fragment>
      <Button
        startIcon={<EditIcon />}
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
            <Header title="Edit Doctor Info" />
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
          <EditDoctor />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default EditDoctorPopUp;
