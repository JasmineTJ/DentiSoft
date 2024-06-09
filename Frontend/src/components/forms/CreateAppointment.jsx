import React from "react";
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

const CreateAppointment = () => {
  const theme = useTheme();

  const doctorBorderColor =
    theme.palette.mode === "dark" ? "#868dfb" : "#a4a9fc";

  const Service = ["Examination", "Consultation", "Surgery"];

  const [selectedDoctor, setSelectedDoctor] = React.useState("");

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  const consultingDoctor = mockDataTeam.map((doctor) => doctor.name);
  const doctorImage = mockDoctorData[0].Image;

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const checkoutSchema = yup.object().shape({
    doctor: yup.string().required("required"),
    dateOfAppointment: yup.date().required("required"),
    visitReason: yup.string().required("required"),
    Service: yup.string().required("required"),
    cost: yup
      .number()
      .required("Cost is required")
      .positive("Cost must be a positive number"),
  });
  const initialValues = {
    doctor: "",
    dateOfAppointment: "",
    visitReason: "",
    Service: "",
    cost: "",
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
                  value={selectedDoctor ? selectedDoctor.name : ""}
                  onChange={(e) => {
                    const doctorName = e.target.value;
                    const doctor = mockDataTeam.find(
                      (doctor) => doctor.name === doctorName
                    );
                    setSelectedDoctor(doctor);
                    handleChange(e);
                  }}
                  onBlur={handleBlur}
                  error={!!touched.doctor && !!errors.doctor}
                  name="doctor"
                >
                  {consultingDoctor.map((doctor) => (
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
                  src={require(`../../assets/doctors/${doctorImage}`)}
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
                    selectedDoctor && selectedDoctor.workingHours
                      ? selectedDoctor.workingHours
                      : ""
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

export default CreateAppointment;
