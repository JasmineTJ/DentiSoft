import React from "react";
import axios from "axios";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const ProfileSettings = () => {
  const theme = useTheme();
  const colorStyle = theme.palette.mode === "dark" ? "#FFF" : "#000";
  const userType = JSON.parse(sessionStorage.getItem("userType"))
  const user = JSON.parse(sessionStorage.getItem("user"))
  // const [userName, setUserName] = React.useState('');
  // let userName = ""
  React.useEffect(() => {
    let url = "";

    switch (userType) {
      case "admin":
        url = "http://localhost:3001/api/admins";
        break;
      case "doctor":
          url = "http://localhost:3001/api/doctors";
          break;
      case "patient":
          url = "http://localhost:3001/login/patient/profileSettings";
          break;
      default:
        console.error("Invalid user type");
        return;
    }
    axios.get(url, {params: {user: user}})
      .then((res) => {
        // console.log(formValues.userName);
        // userName = res.data
        // setFormValues({
        //   ...formValues,
        //   userName: res.data,
        // });
        // userName = res.data
        // setUserName(res.data)
      })
      .catch((error) => {
        console.error("Error getting profile:", error);
      });
  }, [user, userType]);
  
  const handleFormSubmit = (values) => {
    console.log(values);
    // console.log(userType)
    // console.log(user.patientID)
    let url = "";

    switch (userType) {
      case "admin":
        url = "http://localhost:3001/api/admins";
        break;
      case "doctor":
          url = "http://localhost:3001/api/doctors";
          break;
      case "patient":
          const patientId = user.patientID
          url = `http://localhost:3001/login/patient/patientSettings/${patientId}`;
          break;
      default:
        console.error("Invalid user type");
        return;
    }
        axios.patch(url, values).then((res) => {
          console.log(res.data)
          sessionStorage.setItem("user", JSON.stringify(res.data))
          window.location.reload()
        })
  };

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
  const checkoutSchema = yup.object().shape({
    //Privacy Settins Section
    userName: yup.string().required("required"),
    currentPassword: yup.string().required("required"),
    newPassword: yup.string().required("required"),
    //Account Settings Section
    firstName: yup.string().required("required"),
    lastName: yup.string(),
    email: yup.string().email("invalid email").required("required"),
    address: yup.string().required("required"),
    contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  });
  const initialValues = {
    userName: "",
    firstName: user.fName,
    lastName: user.lName,
    email: user.email,
    currentPassword: "",
    newPassword: "",
    address: user.address,
    contact: user.phone
  };
  const [formValues, setFormValues] = React.useState(initialValues);

  return (
    <Box m="20px">
      <Header title="Edit Profile" />

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
              <Typography variant="h3" color={`${colorStyle}`}>
                {" "}
                Privacy Settings
              </Typography>
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
                label="Current Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.currentPassword}
                name="currentPassword"
                error={!!touched.currentPassword && !!errors.currentPassword}
                helperText={touched.currentPassword && errors.currentPassword}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="New Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.newPassword}
                name="newPassword"
                error={!!touched.newPassword && !!errors.newPassword}
                helperText={touched.newPassword && errors.newPassword}
                sx={{ gridColumn: "span 2" }}
              />
              <Typography
                variant="h3"
                sx={{ gridColumn: "span 4" }}
                color={`${colorStyle}`}
              >
                {" "}
                Account Settings
              </Typography>

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

export default ProfileSettings;
