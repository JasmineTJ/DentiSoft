import React from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Stack,
  useTheme,
} from "@mui/material";

import { mockDataTeam } from "../../data/mockData";
import { mockDoctorData } from "../../data/mockData";

import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import TimeButtons from "../TimeButtons";
import { json } from "react-router-dom";

const EditAppointment = () => {
  const theme = useTheme();

  const doctorBorderColor =
    theme.palette.mode === "dark" ? "#868dfb" : "#a4a9fc";

  const Service = ["Examination", "Consultation", "Surgery"];

  const [selectedDoctorIndex, setSelectedDoctorIndex] = React.useState("");

  const [doctorsList, setDoctorsList] = React.useState([""]);
  const [doctorsImages, setDoctorsProfilesList] = React.useState([""]);
  const [doctorsWorkingHours, setDoctorsWorkingHours] = React.useState([""]);
  const [selectedRow, setSelectedRow] = React.useState([""]);
  React.useEffect(() => {
    axios.get("http://localhost:3001/login/patient/editAppointment")
      .then((res) => {
        const { dentistsNames, dentistsImages, dentistsWorkingHours } = res.data;
        setDoctorsList(dentistsNames)
        setDoctorsProfilesList(dentistsImages)
        setDoctorsWorkingHours(dentistsWorkingHours)
        const rowData = JSON.parse(sessionStorage.getItem('rowData'))
        const row = [rowData.id, rowData.doctorName, rowData.appointmentDate, rowData.appointmentTime, rowData.doctorEmail, rowData.conditionReason]
        setSelectedRow(row)
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
      });
  }, [selectedRow]);

  const handleFormSubmit = (values) => {
    console.log(values);
    const appointmentTime = sessionStorage.getItem("selectedWorkingHoursIndex")
    console.log(appointmentTime)
    const visitID = selectedRow[0]
    const allData = {values, appointmentTime, visitID}
    axios.post("http://localhost:3001/login/patient/editAppointment", allData).then((res) => {
      console.log(res.data)
      window.location.reload()
    }).catch((error) => {
      console.error("Error updating appointment", error);
    });
  };

  // const consultingDoctor = mockDataTeam.map((doctor) => doctor.name);
  // const doctorImage = mockDoctorData[0].Image;

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const checkoutSchema = yup.object().shape({
    doctor: yup.string().required("required"),
    dateOfAppointment: yup.date().required("required"),
    // visitReason: yup.string().required("required"),
    Service: yup.string().required("required"),
    // cost: yup
    //   .number()
    //   .required("Cost is required")
    //   .positive("Cost must be a positive number"),
  });
  const initialValues = {
    doctor: selectedRow[1],
    dateOfAppointment: selectedRow[2],
    // visitReason: selectedRow[5],
    Service: selectedRow[5],
    // cost: "",
  };

  return (
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
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <Typography variant="h4" sx={{ gridColumn: "span 4" }}>
                Appointment Details
              </Typography>
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 2" }}
              >
                <InputLabel>Consulting Doctor</InputLabel>
                <Select
                  value={selectedDoctorIndex ? doctorsList[selectedDoctorIndex] : ""}
                  onChange={(e) => {
                    const doctorName = e.target.value;
                    const doctorIndex = doctorsList.indexOf(doctorName)
                    setSelectedDoctorIndex(doctorIndex)
                    handleChange(e);
                    // console.log(selectedDoctorIndex)
                    // console.log(doctorIndex)
                    // console.log(doctorName)
                  }}
                  onBlur={handleBlur}
                  error={!!touched.doctor && !!errors.doctor}
                  name="doctor"
                >
                  {doctorsList.map((doctor) => (
                    <MenuItem key={doctor.id} value={doctor}>
                      {doctor}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Box sx={{ gridColumn: "span 2" }} ml={18} mt={-7}>
                {" "}
                <img
                  width={"200px"}
                  height={"200px"}
                  style={{
                    borderRadius: "15px",
                    border: `5px solid ${doctorBorderColor}`,
                  }}
                  src={process.env.PUBLIC_URL + `/doctors/${doctorsImages[selectedDoctorIndex]}`}
                  alt=""
                />
              </Box>
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Date Of Appointment"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.dateOfAppointment}
                name="dateOfAppointment"
                error={
                  !!touched.dateOfAppointment && !!errors.dateOfAppointment
                }
                helperText={
                  touched.dateOfAppointment && errors.dateOfAppointment
                }
                sx={{ gridColumn: "span 4" }}
              />
              <Stack direction={"column"} gap={2}>
                <Typography variant="h6">Time of Appointment</Typography>
                <TimeButtons
                  workingHours={
                    selectedDoctorIndex
                      ? doctorsWorkingHours[selectedDoctorIndex]
                      : doctorsWorkingHours[0]
                  }
                  displayDirection={"row"}
                />
              </Stack>
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 4" }}
              >
                <InputLabel>Service</InputLabel>
                <Select
                  value={values.Service}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="Service"
                  error={!!touched.Service && !!errors.Service}
                >
                  {Service.map((Service) => (
                    <MenuItem key={Service} value={Service}>
                      {Service}
                    </MenuItem>
                  ))}
                </Select>
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
  );
};

export default EditAppointment;
