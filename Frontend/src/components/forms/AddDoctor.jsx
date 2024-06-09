import React from "react";
import axios from 'axios';
import {
  Box,
  Button,
  TextField,
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
import Header from "../../components/Header";

const AddDoctor = () => {
  const theme = useTheme();

  const checkboxColor = theme.palette.mode === "dark" ? "#868dfb" : "#a4a9fc";

  const genders = ["Male", "Female"];
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const hours = [
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
  ];

  const handleFormSubmit = async (values) => {
    try {
      const doctorValues = {
        ...values,
        birthDate: values.dateOfBirth,
        DentistSSN: values.SSN,
        fName: values.firstName,
        lName: values.lastName,
        password: values.password,
        confirmPassword: values.reEnterPassword,
        phone: values.contact, // map 'contact' to 'phone'
      };
      const response = await axios.post('http://localhost:3001/admin/doctors', doctorValues);
      alert('Doctor created successfully.');
    } catch (error) {
      console.error('An error occurred while creating doctor:', error);
      if (error.response && error.response.data && error.response.data.message) {
        // Display the error message from the server
        alert(error.response.data.message);
      } else {
        alert('An error occurred while creating doctor.');
      }
    }
  };
  
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  const checkoutSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string(),
    SSN: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    contact: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("required"),
    specialization: yup.string().required("required"),
    degree: yup.string().required("required"),
    gender: yup.string().required("required"),
    password: yup.string().required("required"),
    reEnterPassword: yup.string().required("required"),
    address: yup.string().required("required"),
    dateOfBirth: yup.string().required("required"),
    workingDays: yup
      .array()
      .min(1, "Select at least one day")
      .required("required"),
    workingHours: yup
      .array()
      .min(1, "Select at least one hour")
      .required("required"),
  });

  const initialValues = {
    firstName: "",
    lastName: "",
    SSN: "",
    email: "",
    contact: "",
    specialization: "",
    degree: "",
    gender: "",
    password: "",
    reEnterPassword: "",
    address: "",
    dateOfBirth: "",
    workingDays: [],
    workingHours: [],
  };

  return (
    <Box m="20px">
      <Header title="Add Doctor" subtitle={"Add a Doctor to the staff"} />

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
          setFieldValue,
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
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="SSN"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.SSN}
                name="SSN"
                error={!!touched.SSN && !!errors.SSN}
                helperText={touched.SSN && errors.SSN}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Specialization"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.specialization}
                name="specialization"
                error={!!touched.specialization && !!errors.specialization}
                helperText={touched.specialization && errors.specialization}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Degree"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.degree}
                name="degree"
                error={!!touched.degree && !!errors.degree}
                helperText={touched.degree && errors.degree}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Re-Enter Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.reEnterPassword}
                name="reEnterPassword"
                error={!!touched.reEnterPassword && !!errors.reEnterPassword}
                helperText={touched.reEnterPassword && errors.reEnterPassword}
                sx={{ gridColumn: "span 2" }}
              />
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 4" }}
              >
                <InputLabel>Working Days</InputLabel>
                <Select
                  multiple
                  value={values.workingDays}
                  onChange={(event) =>
                    setFieldValue("workingDays", event.target.value)
                  }
                  onBlur={handleBlur}
                  name="workingDays"
                  error={!!touched.workingDays && !!errors.workingDays}
                  renderValue={(selected) => selected.join(", ")}
                >
                  {days.map((day) => (
                    <MenuItem key={day} value={day}>
                      <Checkbox
                        sx={{ color: `${checkboxColor}` }}
                        checked={values.workingDays.indexOf(day) > -1}
                      />
                      <ListItemText primary={day} />
                    </MenuItem>
                  ))}
                </Select>
                {touched.workingDays && errors.workingDays && (
                  <div style={{ color: "red", fontSize: 12 }}>
                    {errors.workingDays}
                  </div>
                )}
              </FormControl>
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 4" }}
              >
                <InputLabel>Working Hours</InputLabel>
                <Select
                  multiple
                  value={values.workingHours}
                  onChange={(event) =>
                    setFieldValue("workingHours", event.target.value)
                  }
                  onBlur={handleBlur}
                  name="workingHours"
                  error={!!touched.workingHours && !!errors.workingHours}
                  renderValue={(selected) => selected.join(", ")}
                >
                  {hours.map((hour) => (
                    <MenuItem key={hour} value={hour}>
                      <Checkbox
                        sx={{ color: `${checkboxColor}` }}
                        checked={values.workingHours.indexOf(hour) > -1}
                      />
                      <ListItemText primary={hour} />
                    </MenuItem>
                  ))}
                </Select>
                {touched.workingHours && errors.workingHours && (
                  <div style={{ color: "red", fontSize: 12 }}>
                    {errors.workingHours}
                  </div>
                )}
              </FormControl>
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 4" }}
              >
                <InputLabel>Gender</InputLabel>
                <Select
                  value={values.gender}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="gender"
                  error={!!touched.gender && !!errors.gender}
                >
                  {genders.map((gender) => (
                    <MenuItem key={gender} value={gender}>
                      {gender}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name="address"
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Date of Birth"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.dateOfBirth}
                name="dateOfBirth"
                error={!!touched.dateOfBirth && !!errors.dateOfBirth}
                helperText={touched.dateOfBirth && errors.dateOfBirth}
                sx={{ gridColumn: "span 4" }}
              />
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

export default AddDoctor;
