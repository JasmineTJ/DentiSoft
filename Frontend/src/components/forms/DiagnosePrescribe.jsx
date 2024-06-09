import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";

const DiagnosePrescribe = ({selectedPatient}) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const user = sessionStorage.getItem('user')

  const diagnosisSchema = yup.object().shape({
    affectedArea: yup.string().required("Affected area is required"),
    diagnosis: yup.string().required("Diagnosis is required"),
    diagnoseDescription: yup.string().required("Description is required"),

    treatmentType: yup.string().required("Description is required"),
    treatmentDescription: yup.string().required("Description is required"),
    treatmentEndDate: yup.string().required("Description is required"),

    medicationName: yup.string().required("Description is required"),
    Dosage: yup.string().required("Medication is required"),
    dosageFreq: yup.string().required("Medication is required"),
  });

  const initialValues = {
    affectedArea: "",
    diagnosis: "",
    diagnoseDescription: "",

    treatmentType: "",
    treatmentDescription: "",
    treatmentEndDate: "",

    medicationName: "",
    Dosage: "",
    dosageFreq: "",
  };
  
  const handleFormSubmit = (values) => {
    console.log(values);
    // console.log(selectedPatient)
    axios.post("http://localhost:3001/dentist/diagnose", values, {params: {patientID: selectedPatient, dentist: user}}).then((res) => {
      console.log(res.data)
    })
    
  };
  
  return (
<Box m="20px">
      <Formik
        initialValues={initialValues}
        validationSchema={diagnosisSchema}
        onSubmit={handleFormSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
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
                Diagnose Section
              </Typography>
              <TextField
                fullWidth
                variant="filled"
                label="Affected Area"
                name="affectedArea"
                value={values.affectedArea}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.affectedArea && !!errors.affectedArea}
                helperText={touched.affectedArea && errors.affectedArea}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                label="Diagnosis"
                name="diagnosis"
                value={values.diagnosis}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.diagnosis && !!errors.diagnosis}
                helperText={touched.diagnosis && errors.diagnosis}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                label="Diagnose Description"
                name="diagnoseDescription"
                value={values.diagnoseDescription}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.diagnoseDescription && !!errors.diagnoseDescription
                }
                helperText={
                  touched.diagnoseDescription && errors.diagnoseDescription
                }
                sx={{ gridColumn: "span 4" }}
              />
              <Typography variant="h4" sx={{ gridColumn: "span 4" }}>
                Treatment Section
              </Typography>
              <TextField
                fullWidth
                variant="filled"
                label="Treatment Type"
                name="treatmentType"
                value={values.treatmentType}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.treatmentType && !!errors.treatmentType}
                helperText={touched.treatmentType && errors.treatmentType}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Treatment End Date"
                name="treatmentEndDate"
                value={values.treatmentEndDate}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.treatmentEndDate && !!errors.treatmentEndDate}
                helperText={touched.treatmentEndDate && errors.treatmentEndDate}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                label="Treatment Description"
                name="treatmentDescription"
                value={values.treatmentDescription}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.treatmentDescription && !!errors.treatmentDescription
                }
                helperText={
                  touched.treatmentDescription && errors.treatmentDescription
                }
                sx={{ gridColumn: "span 4" }}
              />
              <Typography variant="h4" sx={{ gridColumn: "span 4" }}>
                Medication Section
              </Typography>
              <TextField
                fullWidth
                variant="filled"
                label="Medication Name"
                name="medicationName"
                value={values.medicationName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.medicationName && !!errors.medicationName}
                helperText={touched.medicationName && errors.medicationName}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                label="Dosage"
                name="Dosage"
                value={values.Dosage}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.Dosage && !!errors.Dosage}
                helperText={touched.Dosage && errors.Dosage}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                label="Dosage Frequency"
                name="dosageFreq"
                value={values.dosageFreq}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.dosageFreq && !!errors.dosageFreq}
                helperText={touched.dosageFreq && errors.dosageFreq}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="start" mt="20px">
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                size="large"
              >
                Save Diagnosis
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default DiagnosePrescribe;
