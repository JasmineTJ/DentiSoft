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

const EditPatient = () => {
  const genders = ["Male", "Female"];
  const smoker = ["Yes", "No"];
  const bloodGroup = ["O+", "O-", "A+", "A-", "AB-", "AB+", "B-", "B+"];

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  const checkoutSchema = yup.object().shape({
    firstName: yup.string(),
    lastName: yup.string(),
    SSN: yup.string(),
    email: yup.string().email("invalid email"),
    contact: yup.string().matches(phoneRegExp, "Phone number is not valid"),
    gender: yup.string(),
    smokingStatus: yup.string(),
    bloodGroup: yup.string(),
    address: yup.string(),
    dateOfBirth: yup.string(),
    insuranceCompany: yup.string(),
    coverageRate: yup.number().positive("Rate must be a positive percent"),
  });
  const initialValues = {
    firstName: "",
    lastName: "",
    SSN: "",
    email: "",
    contact: "",
    gender: "",
    smokingStatus: "",
    bloodGroup: "",
    address: "",
    dateOfBirth: "",
    insuranceCompany: "",
    coverageRate: "",
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
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
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
                  value={values.smokingStatus}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="smokingStatus"
                  error={!!touched.smokingStatus && !!errors.smokingStatus}
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
                value={values.dateOfBirth}
                name="dateOfBirth"
                error={!!touched.dateOfBirth && !!errors.dateOfBirth}
                helperText={touched.dateOfBirth && errors.dateOfBirth}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Insurance Provider(Company)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.insuranceCompany}
                name="insuranceCompany"
                error={!!touched.insuranceCompany && !!errors.insuranceCompany}
                helperText={touched.insuranceCompany && errors.insuranceCompany}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Coverage Rate"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.coverageRate}
                name="coverageRate"
                error={!!touched.coverageRate && !!errors.coverageRate}
                helperText={touched.coverageRate && errors.coverageRate}
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

export default EditPatient;
