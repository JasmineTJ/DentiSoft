import { mockDoctorData } from "../../data/mockData";
import React, { useState, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Header from "../../components/Header";
import DoctorCard from "../DoctorCard";
import axios from 'axios';

const AdminDoctors = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 4;
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const [doctors, setDoctors] = useState([]);

  const fetchDoctors = async () => {
    const response = await axios.get('http://localhost:3001/admin/doctors');
    const data = await response.data;
    setDoctors(data);
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleDelete = React.useCallback(
    (id) => {
      setTimeout(() => {
        setDoctors((currentDoctors) =>
          currentDoctors.filter((doctor) => doctor.ID !== id)
        );
      });
    },
    [setDoctors]
  );

  const currentDoctors = doctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  const paginate = (e, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 1800, behavior: "smooth" });
  };

  return (
    <Box m="30px">
      <Header title="Doctors" subtitle={"Manage The Clinic Doctors"} />
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
        {currentDoctors.map((doctor, index) => (
          <DoctorCard key={index} doctor={doctor} handleDelete={handleDelete} />
        ))}
      </Stack>{" "}
      <Stack mt={"100px"} alignItems={"center"}>
        {doctors.length > doctorsPerPage && (
          <Pagination
          color="standard"
          shape="rounded"
          defaultPage={1}
          count={Math.ceil(doctors.length / doctorsPerPage)}
          page={currentPage}
          onChange={paginate}
          size="large"
        />        
        )}
      </Stack>
    </Box>
  );
};

export default AdminDoctors;
