import React from "react";
import { Box, useTheme, Stack, Typography, Button } from "@mui/material";
import { tokens } from "../theme";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import DeleteIcon from "@mui/icons-material/Delete";
import EditDoctorPopUp from "./EditDoctorPopUp";

const DoctorCard = ({ doctor, handleDelete }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorStyle =
    theme.palette.mode === "dark"
      ? `${colors.blueAccent[700]}`
      : "hsla(0,0%,82%,.3)";
  const shadowBorderColor = theme.palette.mode === "dark" ? "#868dfb" : "black";

  return (
    <Stack
      sx={{
        minWidth: "450px",
        maxWidth: "50vw",
        width: "40vw",
        height: "40vh",
        maxHeight: "90vh",
        backgroundColor: colorStyle,
        p: "3% 4% 4% 4%",
        boxShadow: `1px 1px 15px ${shadowBorderColor}`,
        borderRadius: "10px",
        ":hover": {
          transition: "all .3s ease-out",
          transform: "translateY(-10px)",
        },
        marginLeft: "3%",
      }}
      display={"flex"}
      flexDirection={"row"}
      gap={6}
    >
      <Box ml={-15} mt={-4}>
        <img
          src={doctor.personalImageURL}
          alt="Profile"
          style={{
            width: "20vw",
            height: "35vh",
            boxShadow: `1px 1px 10px ${shadowBorderColor}`,
            borderRadius: "10px",
          }}
        />
      </Box>
      <Box>
        <Stack display={"flex"} flexDirection={"column"} gap={3}>
          <Stack display={"flex"} flexDirection={"column"} gap={0.3}>
            <Typography variant="h4" fontWeight={"bold"} fontSize={"1.5rem"}>
              {doctor.fName} {doctor.lName}
            </Typography>
            <Typography
              variant="h5"
              fontSize={"1.5rem"}
              color={`${colors.greenAccent[400]}`}
            >
              {doctor.specialization}
            </Typography>
          </Stack>
          <Stack display={"flex"} flexDirection={"column"} gap={1}>
            <Stack flexDirection={"row"} gap={1}>
              <Typography
                sx={{
                  border: "1px solid",
                  padding: "4px",
                  color: `${colors.greenAccent[400]}`,
                }}
                fontWeight={"bold"}
                fontSize={"16px"}
              >
                ID
              </Typography>
              <Typography variant="h4" mt={0.5}>
                {doctor.DentistSSN}
              </Typography>
            </Stack>
            <Stack flexDirection={"row"} gap={2}>
              <WorkspacePremiumIcon
                sx={{ color: `${colors.greenAccent[500]}` }}
              />
              <Typography sx={{ display: "flex", alignItems: "start" }}>
                {doctor.degreeOfSpecialization}
              </Typography>
            </Stack>
            <Stack flexDirection={"row"} gap={2}>
              <LocalPhoneIcon sx={{ color: `${colors.greenAccent[500]}` }} />
              <Typography> {doctor.phone}</Typography>
            </Stack>
            <Stack flexDirection={"row"} gap={2}>
              <LocationOnIcon sx={{ color: `${colors.greenAccent[500]}` }} />
              <Typography sx={{ display: "flex", alignItems: "start" }}>
                {doctor.address}
              </Typography>
            </Stack>
            <Stack mt={4}>
              <Stack display={"flex"} flexDirection={"row"} gap={2}>
                <Button
                  startIcon={<DeleteIcon />}
                  color="error"
                  variant="contained"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "50px",
                    pr: "2%",
                  }}
                  onClick={() => {
                    handleDelete(doctor.DentistSSN);
                  }}
                ></Button>
                <EditDoctorPopUp />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};

export default DoctorCard;
