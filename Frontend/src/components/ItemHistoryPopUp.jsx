import * as React from "react";
import { Stack, Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import EquipmentTable from "./EquipmentTable";
import Header from "./Header";

import HistoryIcon from "@mui/icons-material/History";

const ItemHistoryPopUp = ({ itemId }) => {
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
        startIcon={<HistoryIcon />}
        color="info"
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
            <Header title="Equipment History" />
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
          <EquipmentTable itemId={itemId} />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default ItemHistoryPopUp;
