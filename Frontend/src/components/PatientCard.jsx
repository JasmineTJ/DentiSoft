import React from "react";
import { Box, useTheme, Stack, Typography } from "@mui/material";
import { tokens } from "../theme";
import MyProfilePic from "../assets/images/profile.png";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DateRangeIcon from "@mui/icons-material/DateRange";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import HomeIcon from "@mui/icons-material/Home";
import DiagnosePopUp from "./DiagnosePopUp";
import "../PatientSidebar.css";

const PatientCard = ({ patient }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorStyle =
    theme.palette.mode === "dark"
      ? `${colors.blueAccent[700]}`
      : "hsla(0,0%,82%,.3)";
  const shadowBorderColor = theme.palette.mode === "dark" ? "#868dfb" : "black";

  return (
    <Box
      sx={{
        minWidth: "450px",
        maxWidth: "500px",
        width: "480px",
        maxHeight: "550px",
        display: "flex",
        flexDirection: "column",
        backgroundColor: colorStyle,
        p: "3% 4% 4% 4%",
        boxShadow: `1px 1px 15px ${shadowBorderColor}`,
        borderRadius: "10px",
        ":hover": {
          transition: "all .3s ease-out",
          transform: "translateY(-10px)",
        },
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2} mb={4}>
        <img
          src={MyProfilePic}
          alt="Profile"
          width={120}
          height={120}
          style={{ borderRadius: "50%", marginRight: "3%" }}
        />
        <Stack>
          <Typography variant="h4">{patient.name}</Typography>
          <Stack flexDirection={"row"} gap={1}>
            <Typography
              sx={{
                border: "1px solid",
                padding: "2px",
                color: `${colors.greenAccent[400]}`,
              }}
              fontWeight={"bold"}
              fontSize={"16px"}
            >
              ID
            </Typography>
            <Typography variant="h4">{patient.patientID}</Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack spacing={2} mb={4}>
        <Typography sx={{ display: "flex", alignItems: "start" }}>
          <LocationOnIcon sx={{ color: `${colors.greenAccent[400]}` }} />{" "}
          <strong style={{ marginRight: "2%", marginLeft: "2%" }}>
            {" "}
            Address:
          </strong>{" "}
          {patient.address}
        </Typography>
        <Typography sx={{ display: "flex", alignItems: "start" }}>
          <DateRangeIcon sx={{ color: `${colors.greenAccent[400]}` }} />{" "}
          <strong style={{ marginRight: "2%", marginLeft: "2%" }}>
            {" "}
            Date of Birth:
          </strong>{" "}
          {patient.birthDate}
        </Typography>
      </Stack>
      <Stack spacing={2} mb={4}>
        <Typography sx={{ display: "flex", alignItems: "start" }}>
          <BloodtypeIcon sx={{ color: `${colors.greenAccent[400]}` }} />{" "}
          <strong style={{ marginRight: "2%", marginLeft: "2%" }}>
            {" "}
            Blood Group:
          </strong>{" "}
          {patient.bloodGroup}
        </Typography>
        {patient.lastVisitServiceDone > 0 && (
          <Typography sx={{ display: "flex", alignItems: "start" }}>
            <HomeIcon sx={{ color: `${colors.greenAccent[400]}` }} />
            <strong style={{ marginRight: "2%", marginLeft: "2%" }}>
              Last Visit Reason:
            </strong>{" "}
            {
              // patient.medicalRecords[patient.medicalRecords.length - 1]
              //   .visitReason
              patient.lastVisitServiceDone
            }
          </Typography>
        )}
      </Stack>
      <DiagnosePopUp selectedPatient={patient.patientID} />
    </Box>
  );
};

export default PatientCard;
