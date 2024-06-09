import React from "react";
import { useTheme, Stack, Typography } from "@mui/material";

const ServiceCard = ({ serviceName, serviceDescription, Image }) => {
  const theme = useTheme();
  const shadowBorderColor = theme.palette.mode === "dark" ? "#868dfb" : "black";

  return (
    <>
      <Stack
        position={"relative"}
        sx={{
          minWidth: "450px",
          maxWidth: "50vw",
          width: "40vw",
          height: "40vh",
          maxHeight: "90vh",
          p: "3% 4% 1% 1%",
          boxShadow: `1px 1px 8px ${shadowBorderColor}`,
          borderRadius: "10px",
          ":hover": {
            transition: "all 0.5s ease-out",
            scale: "1.1",
            opacity: "0.9",
          },
          marginLeft: "3%",
          backgroundImage: `url(${Image})`,
          backgroundSize: "cover",
        }}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"end"}
        alignContent={"end"}
      >
        <Stack
          sx={{
            backgroundColor: "#ffffff",
            opacity: " 0.8",
            borderRadius: "10px",
            padding: "1%",
          }}
          gap={3}
        >
          <Typography variant="h2" fontWeight={"bold"} color={"#36987f"}>
            {serviceName}
          </Typography>
          <Typography
            variant="h5"
            fontSize={"20px"}
            color={"#000"}
            sx={{ opacity: "2" }}
          >
            {serviceDescription}
          </Typography>
        </Stack>
      </Stack>
    </>
  );
};

export default ServiceCard;
