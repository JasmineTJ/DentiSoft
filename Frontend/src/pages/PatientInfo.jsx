import "../Register.css";
import { useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";
import {
  Typography,
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
import Header from "../components/Header";

const PatientInfo = () => {
  let navigate = useNavigate();
  const chronicDiseaseStatus = ["Yes", "No"];
  const allergyStatus = ["Yes", "No"];
  const alcoholStatus = ["Yes", "No"];
  const smokingStatus = ["Yes", "No"];
  const bloodGroup = ["O+", "O-", "A+", "A-", "AB-", "AB+", "B-", "B+"];

  const handleFormSubmit = (data) => {
    // console.log(data)
    const firstFormData = JSON.parse(sessionStorage.getItem('firstFormData'))
    const alldata = {firstFormData, data}
    axios.post("http://localhost:3001/login/register/patient", alldata).then((res) => {
      console.log(res.data)
      if (res.data === true) navigate("../../login")
    })
    // console.log(data);
  };

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const checkoutSchema = yup.object().shape({
    chronicDiseaseStatus: yup.string(),
    chronicDiseases: yup.string(),
    alcoholStatus: yup.string().required(),
    smokingStatus: yup.string().required(),
    allergyStatus: yup.string(),
    allergies: yup.string(),
    bloodGroup: yup.string().required(),
  });
  const initialValues = {
    chronicDiseaseStatus: "",
    chronicDiseases: "",
    alcoholStatus: "",
    smokingStatus: "",
    allergyStatus: "",
    allergies: "",
    bloodGroup: "",
  };

  return (
    <Box m="20px">
      <Header
        title="Medical Info"
        subtitle={"Kindly Fill These Info to be Added to Your Profile"}
      />

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
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 4" }}
              >
                <InputLabel>Have a Chronic Disease?</InputLabel>
                <Select
                  value={values.chronicDiseaseStatus}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="chronicDiseaseStatus"
                  error={
                    !!touched.chronicDiseaseStatus &&
                    !!errors.chronicDiseaseStatus
                  }
                >
                  {chronicDiseaseStatus.map((chronicDiseaseStatus) => (
                    <MenuItem
                      key={chronicDiseaseStatus}
                      value={chronicDiseaseStatus}
                    >
                      {chronicDiseaseStatus}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {values.chronicDiseaseStatus === "Yes" && (
                <Box sx={{ gridColumn: "span 4" }}>
                  <TextField
                    fullWidth
                    variant="filled"
                    multiline
                    label="Chronic Diseases"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.chronicDiseases}
                    name="chronicDiseases"
                    error={
                      !!touched.chronicDiseases && !!errors.chronicDiseases
                    }
                    helperText={
                      touched.chronicDiseases && errors.chronicDiseases
                    }
                  />
                  <Typography variant="h6">
                    Separate Each Disease With a Comma, for example:
                    Diabetes,Alzheimer,...So on.
                  </Typography>
                </Box>
              )}
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 4" }}
              >
                <InputLabel>Have any Allergies?</InputLabel>
                <Select
                  value={values.allergyStatus}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="allergyStatus"
                  error={!!touched.allergyStatus && !!errors.allergyStatus}
                >
                  {allergyStatus.map((allergyStatus) => (
                    <MenuItem key={allergyStatus} value={allergyStatus}>
                      {allergyStatus}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {values.allergyStatus === "Yes" && (
                <Box sx={{ gridColumn: "span 4" }}>
                  <TextField
                    fullWidth
                    variant="filled"
                    multiline
                    label="Allergies"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.allergies}
                    name="allergies"
                    error={!!touched.allergies && !!errors.allergies}
                    helperText={touched.allergies && errors.allergies}
                  />
                  <Typography variant="h6">
                    Separate Each Allergy With a Comma, for example:
                    Eggs,Penicillin,...So on.
                  </Typography>
                </Box>
              )}
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 4" }}
              >
                <InputLabel>Smoking Status</InputLabel>
                <Select
                  value={values.smokingStatus}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="smokingStatus"
                  error={!!touched.smokingStatus && !!errors.smokingStatus}
                >
                  {smokingStatus.map((smokingStatus) => (
                    <MenuItem key={smokingStatus} value={smokingStatus}>
                      {smokingStatus}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 4" }}
              >
                <InputLabel>Alcohol Status</InputLabel>
                <Select
                  value={values.alcoholStatus}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="alcoholStatus"
                  error={!!touched.alcoholStatus && !!errors.alcoholStatus}
                >
                  {alcoholStatus.map((alcoholStatus) => (
                    <MenuItem key={alcoholStatus} value={alcoholStatus}>
                      {alcoholStatus}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 4" }}
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
            </Box>
            <Box display="flex" justifyContent="start" mt="20px">
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                size="large"
                sx={{ marginBottom: "20px" }}
                //This onClick Disconnects the Submit from form
                onClick={() => {
                  // navigate("../../login");
                }}
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

export default PatientInfo;
