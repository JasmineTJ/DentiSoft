import React, { useState, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { mockPatientData } from "../../data/mockData";
import Header from "../../components/Header";
import Card from "../PatientCard";
import axios from "axios";

const DoctorPatients = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 6; // Number of patients per page

  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = mockPatientData.slice(
    indexOfFirstPatient,
    indexOfLastPatient
  );
  const [patients, setPatients] = useState([]);
  const user = sessionStorage.getItem('user')
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:3001/dentist/patients', {params: {dentist: user}});
        setPatients(response.data);
        // console.log(response.data.length)
        // console.log(typeof(currentPatients))
      } catch (error) {
        console.error('Failed to fetch patients:', error);
      }
    };

    fetchPatients();
  }, [user]);

  const paginate = (e, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 1800, behavior: "smooth" });
  };
  return (
    <Box m="30px">
      <Header title="Patients" />
      <Stack
        gap={4}
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {patients.map((patient, index) => (
          <Card key={patient.patientID} patient={patient} />
        ))}
      </Stack>{" "}
      <Stack mt={"100px"} alignItems={"center"}>
        {patients.length > patientsPerPage && (
          <Pagination
            color="standard"
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(mockPatientData.length / patientsPerPage)}
            page={currentPage}
            onChange={paginate}
            size="large"
          />
        )}
      </Stack>
    </Box>
  );
};

export default DoctorPatients;
