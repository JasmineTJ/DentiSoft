import { useNavigate, NavLink } from "react-router-dom";
import "../Login.css";
import Header from "../components/Header";

import React, { useState } from "react";
import axios from "axios";
import { Typography, Box, Button, TextField, useTheme } from "@mui/material";

import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";

const Login = ({ person, setPerson }) => {
  const theme = useTheme();

  const colorStyle =
    theme.palette.mode === "dark" ? "#3e4396" : "hsla(0, 0%, 82%, .3)";

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (data) => {
    const alldata = {data, person}
    axios.post("http://localhost:3001/login", alldata).then((res) => {
      console.log(res.data)
      sessionStorage.setItem('user', JSON.stringify(res.data))
      // sessionStorage.setItem('userID', JSON.stringify(res.data))
      sessionStorage.setItem('userType', JSON.stringify(person))
      // if (res.data === true){
        person === "admin"
        ? navigate("layout/adminDashboard")
        : person === "doctor"
        ? navigate("layout/doctorDashboard")
        : navigate("layout/patientAppointments")
      // }
      // console.log(alldata)
      // navigate('layout')
    })
  };

  let navigate = useNavigate();
  const [patientButtonColor, setPatientButtonColor] = useState(undefined);
  const [doctorButtonColor, setDoctorButtonColor] = useState(undefined);
  const [adminButtonColor, setAdminButtonColor] = useState("red");

  const checkoutSchema = yup.object().shape({
    userName: yup.string().required("required"),
    password: yup.string().required("required"),
  });
  const initialValues = {
    userName: "",
    password: "",
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minWidth: "100%",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          background: `${colorStyle} 0% 0% no-repeat padding-box`,
          width: "30%",
          minWidth: "550px",
          minHeight: "720px",
          height: "80%",
          opacity: "1",
          borderRadius: "8px",
        }}
      >
        <Typography
          sx={{
            minWidth: "75%",
            minHeight: "7%",
            textAlign: "left",
            font: "normal normal bold 40px/48px Roboto",
            color: "#000",
            opacity: "1",
            ml: "9%",
            mr: "9%",
            mt: "14%",
          }}
        >
          Welcome to DentiSoft
        </Typography>
        {person === "patient" && (
          <Box display={"flex"} flexDirection={"row"} ml={"8%"} mr={"8%"}>
            <Typography
              sx={{
                ml: "2%",
                width: "50%",
                font: "normal normal normal 25px/30px Roboto",
                color: "#9D9D9D",
                textAlign: "left",
              }}
            >
              New to DentiSoft?
            </Typography>
            <Typography
              sx={{
                width: "20%",
                height: "4vh",
                font: "normal normal normal 25px/30px Roboto",
                color: "#2F9BA2",
                textAlign: "left",
                "&:hover": {
                  color: "#868dfb",
                  cursor: "pointer",
                },
              }}
            >
              <NavLink to={"register"} className="nav_link">
                Sign Up
              </NavLink>
            </Typography>
          </Box>
        )}

        <Box
          className="Person"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: `${adminButtonColor}`,
              "&:hover": {
                backgroundColor: "#868dfb",
              },
            }}
            onClick={() => {
              setPatientButtonColor("rgb(14, 18, 31)");
              setDoctorButtonColor("rgb(14, 18, 31)");
              setAdminButtonColor("red");
              setPerson("admin");
            }}
          >
            Admin
          </Button>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: `${doctorButtonColor}`,
              "&:hover": {
                backgroundColor: "#868dfb",
              },
            }}
            onClick={() => {
              setPatientButtonColor("rgb(14, 18, 31)");
              setDoctorButtonColor("red");
              setAdminButtonColor("rgb(14, 18, 31)");
              setPerson("doctor");
            }}
          >
            Doctor
          </Button>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: `${patientButtonColor}`,
              "&:hover": {
                backgroundColor: "#868dfb",
              },
            }}
            onClick={() => {
              setPatientButtonColor("red");
              setDoctorButtonColor("rgb(14, 18, 31)");
              setAdminButtonColor("rgb(14, 18, 31)");
              setPerson("patient");
            }}
          >
            Patient
          </Button>
        </Box>
        <Box className="Sign In Form" m="20px">
          <Header title="Sign In" />
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
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 4",
                    },
                  }}
                >
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="User Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.userName}
                    name="userName"
                    error={!!touched.userName && !!errors.userName}
                    helperText={touched.userName && errors.userName}
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
                    sx={{ gridColumn: "span 4" }}
                  />
                </Box>
                <Box display="flex" justifyContent="center" mt="20px">
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    size="large"
                    onClick={() => {
                      // person === "admin"
                      //   ? navigate("layout/adminDashboard")
                      //   : person === "doctor"
                      //   ? navigate("layout/doctorDashboard")
                      //   : navigate("layout/patientDashboard");
                    }}
                  >
                    Login
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
