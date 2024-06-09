import React from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios";

const AddPatient = () => {
  const genders = ["Male", "Female"];
  const smoker = ["Yes", "No"];
  const bloodGroup = ["O+", "O-", "A+", "A-", "AB-", "AB+", "B-", "B+"];

  const handleFormSubmit = async (values) => {
    try {
      // Call the API endpoint to create a new patient
      const response = await axios.post('http://localhost:3001/admin/patients', values);
      console.log(values);
    
      // Log the response to the console
      console.log(response.data);
  
      // Display a success message
      alert('Patient created successfully');
    } catch (error) {
      console.error('Failed to create patient:', error);
  
      // Display an error message
      if (error.response && error.response.data && error.response.data.message) {
        // If the server returned a specific error message, display that
        alert('Failed to create patient: ' + error.response.data.message);
      } else {
        // Otherwise, display a generic error message
        alert('Failed to create patient: ' + error.message);
      }
    }
  };
      
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  const checkoutSchema = yup.object().shape({
    fName: yup.string().required("required"),
    lName: yup.string(),
    PatientSSN: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    phone: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("required"),
    gender: yup.string().required("required"),
    Smoker: yup.string().required("required"),
    bloodGroup: yup.string().required("required"),
    password: yup.string().required("required"),
    confirmPassword: yup.string().required("required"),
    address: yup.string().required("required"),
    birthDate: yup.string().required("required"),
    InsuranceCompany: yup.string(),
    InsuranceCoverage: yup.number().positive("Rate must be a positive percent"),
  });
  const initialValues = {
    fName: "",
    lName: "",
    PatientSSN: "",
    email: "",
    phone: "",
    gender: "",
    Smoker: "",
    bloodGroup: "",
    password: "",
    confirmPassword: "",
    address: "",
    birthDate: "",
    InsuranceCompany: "",
    InsuranceCoverage: "",
  };

  return (
    <Box m="20px">
      <Header title="Add Patient" subtitle={"Add a Patient to the Clinic"} />

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
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fName}
                name="fName"
                error={!!touched.fName && !!errors.fName}
                helperText={touched.fName && errors.fName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lName}
                name="lName"
                error={!!touched.lName && !!errors.lName}
                helperText={touched.lName && errors.lName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="SSN"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.PatientSSN}
                name="PatientSSN"
                error={!!touched.PatientSSN && !!errors.PatientSSN}
                helperText={touched.PatientSSN && errors.PatientSSN}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone}
                name="phone"
                error={!!touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
                sx={{ gridColumn: "span 4" }}
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
                value={values.confirmPassword}
                name="confirmPassword"
                error={!!touched.confirmPassword && !!errors.confirmPassword}
                helperText={touched.confirmPassword && errors.confirmPassword}
                sx={{ gridColumn: "span 2" }}
              />
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
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 2" }}
              >
                <InputLabel>Smoking Status</InputLabel>
                <Select
                  value={values.Smoker}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="Smoker"
                  error={!!touched.Smoker && !!errors.Smoker}
                >
                  {smoker.map((smoker) => (
                    <MenuItem key={smoker} value={smoker}>
                      {smoker}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 2" }}
              >
                <InputLabel>Blood Group</InputLabel>
                <Select
                  value={values.bloodGroup}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="bloodGroup"
                  error={!!touched.bloodGroup && !!errors.bloodGroup}
                >
                  {bloodGroup.map((bloodGroup) => (
                    <MenuItem key={bloodGroup} value={bloodGroup}>
                      {bloodGroup}
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
                value={values.birthDate}
                name="birthDate"
                error={!!touched.birthDate && !!errors.birthDate}
                helperText={touched.birthDate && errors.birthDate}
                sx={{ gridColumn: "span 4" }}
              />{" "}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Insurance Provider(Company)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.InsuranceCompany}
                name="InsuranceCompany"
                error={!!touched.InsuranceCompany && !!errors.InsuranceCompany}
                helperText={touched.InsuranceCompany && errors.InsuranceCompany}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Coverage Rate"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.InsuranceCoverage}
                name="InsuranceCoverage"
                error={!!touched.InsuranceCoverage && !!errors.InsuranceCoverage}
                helperText={touched.InsuranceCoverage && errors.InsuranceCoverage}
                sx={{ gridColumn: "span 2" }}
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

export default AddPatient;
