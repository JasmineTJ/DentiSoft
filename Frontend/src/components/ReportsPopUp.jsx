import * as React from "react";
import { tokens } from "../theme";
import axios from "axios";
import {
  Box,
  Button,
  Stack,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Checkbox,
  ListItemText,
  useTheme,
} from "@mui/material";

import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import Header from "./Header";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { useState } from "react";

const ReportsPopUp = (userType) => {
  const theme = useTheme();
  const checkboxColor = theme.palette.mode === "dark" ? "#868dfb" : "#a4a9fc";
  const [reports, setReports] = useState([]);
  let url = ""
  const user = sessionStorage.getItem("user")
  const userType1 = JSON.parse(sessionStorage.getItem("userType"))

  const handleFormSubmit = (values) => {
    console.log(values);
    console.log(userType1)
    switch (userType1) {
      case "admin":
        url = "http://localhost:3001/api/admins";
        break;
      case "doctor":
        url = "http://localhost:3001/api/doctors";
        break;
      case "patient":
        url = "http://localhost:3001/login/patient/exportReports";
        break;
      default:
        console.error("Invalid user type");
        return;
    }
    axios.post(url, values, {params: {user: user}})
    .then((res) => {
      console.log(res.data)
    })
    .catch((error) => {
      console.error("Error getting profile:", error);
    });
  };

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const checkoutSchema = yup.object().shape({
    Reports: yup
      .array()
      .min(1, "Select at least one report")
      .required("required"),
  });

  const initialValues = {
    Reports: [],
  };

  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    userType1 === "admin"
      ? setReports(["Inventory"])
      : setReports(["Medical History", "Prescriptions", "Invoices"]);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        sx={{
          backgroundColor: colors.blueAccent[700],
          color: colors.grey[100],
          fontSize: "14px",
          fontWeight: "bold",
          padding: "10px 20px",
        }}
        onClick={handleClickOpen}
      >
        <DownloadOutlinedIcon sx={{ mr: "10px" }} />
        Download Reports
      </Button>
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
            <Header title="Choose the Reports You Want in the PDF" />
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
          <Box m="20px">
            <Formik
              onSubmit={handleFormSubmit}
              initialValues={initialValues}
              validationSchema={checkoutSchema}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleSubmit,
                setFieldValue,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                      "& > div": {
                        gridColumn: isNonMobile ? undefined : "span 4",
                      },
                    }}
                  >
                    <FormControl
                      fullWidth
                      variant="filled"
                      sx={{ gridColumn: "span 4" }}
                    >
                      <InputLabel>Reports</InputLabel>
                      <Select
                        multiple
                        value={values.Reports || []}
                        onChange={(event) =>
                          setFieldValue("Reports", event.target.value)
                        }
                        onBlur={handleBlur}
                        name="Reports"
                        error={!!touched.Reports && !!errors.Reports}
                        renderValue={(selected) => selected.join(", ")}
                      >
                        {reports.map((report) => (
                          <MenuItem key={report} value={report}>
                            <Checkbox
                              sx={{ color: `${checkboxColor}` }}
                              checked={values.Reports?.indexOf(report) > -1}
                            />
                            <ListItemText primary={report} />
                          </MenuItem>
                        ))}
                      </Select>
                      {touched.Reports && errors.Reports && (
                        <div style={{ color: "red", fontSize: 12 }}>
                          {errors.Reports}
                        </div>
                      )}
                    </FormControl>
                  </Box>
                  <Box display="flex" justifyContent="start" mt="20px">
                    <Button
                      type="submit"
                      color="secondary"
                      variant="contained"
                      size="large"
                    >
                      Submit
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default ReportsPopUp;
