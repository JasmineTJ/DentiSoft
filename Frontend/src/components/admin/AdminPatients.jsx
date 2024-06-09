import React, { useState, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import axios from 'axios';
import Header from "../../components/Header";
import Card from "../PatientCardAdmin";

const AdminPatients = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 6; // Number of patients per page

  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const [patients, setPatients] = useState([]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/admin/patients/${id}`);
      setPatients((prevPatients) =>
        prevPatients.filter((patient) => patient.patientID !== id)
      );
      alert('Patient deleted successfully');
    } catch (error) {
      console.error('Failed to delete patient:', error);
      alert('Failed to delete patient');
    }
  };
    
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:3001/admin/patients');
        setPatients(response.data);
      } catch (error) {
        console.error('Failed to fetch patients:', error);
      }
    };

    fetchPatients();
  }, [patients]);

  const currentPatients = patients.slice(
    indexOfFirstPatient,
    indexOfLastPatient
  );

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
        {currentPatients.map((patient, index) => (
          <Card key={index} patient={patient} handleDelete={handleDelete} />
        ))}
      </Stack>{" "}
      <Stack mt={"100px"} alignItems={"center"}>
        {patients.length > patientsPerPage && (
          <Pagination
            color="standard"
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(patients.length / patientsPerPage)}
            page={currentPage}
            onChange={paginate}
            size="large"
          />
        )}
      </Stack>
    </Box>
  );
};

export default AdminPatients;
