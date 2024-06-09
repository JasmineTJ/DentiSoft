import React, { useState } from "react";
import Header from "../../components/Header";
import ReportsPopUp from "../ReportsPopUp";
import axios from "axios";

import {
  useTheme,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  Paper,
} from "@mui/material";
import { mockPatientData } from "../../data/mockData"; // Import the mock data

const PatientPortal = () => {
  // let patient = mockPatientData[1];
  const user = sessionStorage.getItem("user")
  const patient = JSON.parse(sessionStorage.getItem("user"))
  const [medicalRecords, setMedicalRecords] = useState(mockPatientData[1].medicalRecords)
  React.useEffect(() => {
    axios.get("http://localhost:3001/login/patient/records", {params: {patient: user}})
      .then((res) => {
        console.log(res.data);
        // console.log(patient.Smoker);
        setMedicalRecords(res.data)
        // const {scheduledAppointmentsDetails, cancelledAppointmentsDetails, completedAppointmentsDetails} = res.data
        // setRows(scheduledAppointmentsDetails);
        // setRows(res.data);
        // setRowsPast(cancelledAppointmentsDetails, completedAppointmentsDetails)
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
      });
  }, [setMedicalRecords, user, medicalRecords]);

  const theme = useTheme();
  const colorStyle = theme.palette.mode === "dark" ? "#141b2d" : "#fff";
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
      <Header title="Medical History" />
        <ReportsPopUp userType={"patient"} />
      </Box>
      <Box m="40px 0 0 0" height="75vh">
        <Box className="medical-history-page">
          <Box className="patient-info" borderBottom="1px solid #ddd" pb="20px">
            <Typography variant="h2" mb={"4%"}>
              General Information
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                mb: "6%",
              }}
            >
              <Stack>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  mb="5px"
                  fontSize={"20px"}
                  fontWeight={"bold"}
                >
                  Date of Birth: {patient.birthDate.split("T")[0]}
                </Typography>

                <Typography
                  variant="body1"
                  color="textSecondary"
                  fontSize={"20px"}
                  fontWeight={"bold"}
                >
                  Address: {patient.address}
                </Typography>
              </Stack>
              <Stack>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  fontSize={"20px"}
                  fontWeight={"bold"}
                >
                  Blood Group: {patient.bloodGroup}
                </Typography>{" "}
                <Typography
                  variant="body1"
                  color="textSecondary"
                  mb="5px"
                  fontSize={"20px"}
                  fontWeight={"bold"}
                >
                  Gender: {patient.gender}
                </Typography>
              </Stack>
              <Stack>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  mb="5px"
                  fontSize={"20px"}
                  fontWeight={"bold"}
                >
                  Smoking: {patient.Smoker===true?"Smoker":"Non-Smoker"}
                </Typography>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  mb="5px"
                  fontSize={"20px"}
                  fontWeight={"bold"}
                >
                  Aclohol Intake: {patient.alcoholIntake===true?"Occasional drinker":"Non-Drinker"}
                </Typography>
              </Stack>
            </Box>
          </Box>
          <Box className="medical-history">
            <Typography variant="h2" mb={"4%"} mt={"4%"}>
              Medical Records
            </Typography>
            <TableContainer
              component={Paper}
              sx={{ backgroundColor: `${colorStyle}` }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    {/* Date	Visit Reason 	Diagnosis   Affected Area 	Treatment  Medications	Surgeries	Imaging Results */}
                    <TableCell sx={{ fontSize: "20px" }}>ID</TableCell>
                    <TableCell sx={{ fontSize: "20px" }}>Date</TableCell>
                    <TableCell sx={{ fontSize: "20px" }}>Visit Reason</TableCell>
                    <TableCell sx={{ fontSize: "20px" }}>Visit to</TableCell>
                    <TableCell sx={{ fontSize: "20px" }}>Diagnosis</TableCell>
                    <TableCell sx={{ fontSize: "20px" }}>Affected Area</TableCell>
                    <TableCell sx={{ fontSize: "20px" }}>Treatment</TableCell>
                    <TableCell sx={{ fontSize: "20px" }}>Medications</TableCell>
                    <TableCell sx={{ fontSize: "20px" }}>Surgeries</TableCell>
                    {/* <TableCell sx={{ fontSize: "20px" }}>Imaging Results</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {medicalRecords.map((record, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ fontSize: "15px" }}>
                        {index+1}
                      </TableCell>
                      <TableCell sx={{ fontSize: "15px" }}>
                        {record.date}
                      </TableCell>
                      <TableCell sx={{ fontSize: "15px" }}>
                        {record.visitReason}
                      </TableCell>
                      <TableCell sx={{ fontSize: "15px" }}>
                        {record.CreatedBy}
                      </TableCell>
                      <TableCell sx={{ fontSize: "15px" }}>
                        {record.DiseaseOrCondition}
                      </TableCell>
                      <TableCell sx={{ fontSize: "15px" }}>
                        {/* Affected Area */}
                        {record.AffectedArea}
                        {/* Affected Area */}
                      </TableCell>
                      <TableCell sx={{ fontSize: "15px" }}>
                        {record.treatment}
                      </TableCell>
                      <TableCell sx={{ fontSize: "15px" }}>
                        {/* Medications */}
                        {record.Medications}
                        {/* Medications */}
                      </TableCell>
                      <TableCell sx={{ fontSize: "15px" }}>
                        {record.surgeries.length>0?record.surgeries:"None"}
                        {/* Surgeries */}
                      </TableCell>
                      {/* <TableCell sx={{ fontSize: "15px" }}> */}
                        {/* Imaging Results */}
                        {/* {record.allergies} */}
                        {/* Imaging Results */}
                      {/* </TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PatientPortal;
