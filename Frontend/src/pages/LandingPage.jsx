import React from "react";

import { useNavigate } from "react-router-dom";
import { Link } from "react-scroll";
import { Box, Stack, Typography, Button, useTheme } from "@mui/material";
import ServiceCard from "../components/ServiceCard";
import Logo from "../assets/images/Logo.jpeg";

import serviceImage1 from "../assets/images/service_1.jpeg";
import serviceImage2 from "../assets/images/service_2.jpeg";
import serviceImage3 from "../assets/images/service_3.jpeg";
import serviceImage4 from "../assets/images/service_4.jpeg";
import FooterImage from "../assets/images/footer image.png";

import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const LandingPage = () => {
  const services = [
    {
      name: "Teeth Cleaning",
      description:
        "Regular cleaning to remove plaque and tartar, keeping your smile healthy and bright.",
      image: serviceImage1,
    },
    {
      name: "Dental Fillings",
      description:
        "Repair cavities and damage, restoring tooth structure and preventing further decay.",
      image: serviceImage2,
    },
    {
      name: "Teeth Whitening",
      description:
        "Lighten teeth color, remove stains, and enhance your smile's appearance.",
      image: serviceImage3,
    },
    {
      name: "Dental Implants",
      description:
        "Permanent solution for missing teeth, providing a natural look and feel.",
      image: serviceImage4,
    },
  ];

  let navigate = useNavigate();

  const theme = useTheme();
  const colorStyle = theme.palette.mode === "dark" ? "white" : "black";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
      maxWidth={"100vw"}
    >
      <Stack
        className="NavBar"
        flexDirection={"row"}
        justifyContent={"space-between"}
      >
        <img
          src={Logo}
          alt=""
          style={{
            width: "70px",
            height: "70px",
            borderRadius: "50%",
            marginLeft: "2%",
            marginBottom: "0.5%",
            marginTop: "0.5%",
          }}
        />
        <Stack
          className="Links"
          flexDirection={"row"}
          gap={6}
          mr={"3%"}
          flexWrap={"wrap"}
        >
          <Link
            smooth={true}
            offset={50}
            duration={500}
            delay={250}
            to={"Banner"}
          >
            <Typography
              variant="h3"
              fontWeight={"bold"}
              sx={{
                ":hover": {
                  color: "#36987f",
                  cursor: "pointer",
                  transition: "all .3s ease-out",
                  transform: "translateY(-5px)",
                },
                color: `${colorStyle}`,
              }}
              mt={"30px"}
            >
              Home
            </Typography>
          </Link>
          <Link
            smooth={true}
            offset={50}
            duration={500}
            delay={250}
            to={"About"}
          >
            <Typography
              variant="h3"
              fontWeight={"bold"}
              sx={{
                ":hover": {
                  color: "#36987f",
                  cursor: "pointer",
                  transition: "all .3s ease-out",
                  transform: "translateY(-5px)",
                },
                color: `${colorStyle}`,
              }}
              mt={"30px"}
            >
              About
            </Typography>
          </Link>
          <Link
            smooth={true}
            offset={50}
            duration={500}
            delay={250}
            to={"Services"}
          >
            <Typography
              variant="h3"
              fontWeight={"bold"}
              sx={{
                ":hover": {
                  color: "#36987f",
                  cursor: "pointer",
                  transition: "all .3s ease-out",
                  transform: "translateY(-5px)",
                },
                color: `${colorStyle}`,
              }}
              mt={"30px"}
            >
              Services
            </Typography>
          </Link>
          <Link
            smooth={true}
            offset={50}
            duration={500}
            delay={250}
            to={"Footer"}
          >
            <Typography
              variant="h3"
              fontWeight={"bold"}
              width={"114px"}
              mr={3}
              sx={{
                ":hover": {
                  color: "#36987f",
                  cursor: "pointer",
                  transition: "all .3s ease-out",
                  transform: "translateY(-5px)",
                },
                color: `${colorStyle}`,
              }}
              mt={"30px"}
            >
              Contact Us
            </Typography>
          </Link>
          <Button
            variant="contained"
            size="large"
            color="primary"
            sx={{
              marginTop: "3%",
              marginBottom: "3%",
              ":hover": {
                backgroundColor: "#36987f",
                transition: "all .3s ease-out",
                transform: "translateY(-5px)",
              },
              fontWeight: "bold",
              fontSize: "1rem",
            }}
            onClick={() => {
              navigate("login");
            }}
          >
            Login
          </Button>
        </Stack>
      </Stack>
      <div id="Banner" style={{ position: "relative" }}>
        <Stack className="Banner">
          <img src={require(`../assets/images/Dentist.jpeg`)} alt="" />
          <Stack position={"absolute"} top={"30%"} left={"10%"}>
            <Typography variant="h1" color={"#4cceac"}>
              WE USE LATEST MEDICAL TECHNOLOGY
            </Typography>
            <Typography variant="h1" fontWeight={"bold"} color={"#FFF"}>
              Let Us Brighten Your Smile
            </Typography>
          </Stack>
        </Stack>
      </div>
      <div id="About">
        <Stack
          className="About"
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Typography variant="h1" color={"#4cceac"} mt={5}>
            About Us
          </Typography>
          <Typography variant="h4" m={"2% 20% 2% 20%"}>
            Welcome to{" "}
            <span style={{ color: "#4cceac", fontStyle: "italic" }}>
              <strong> Radiant Smiles</strong>
            </span>
            , your trusted dental care provider. Our team is dedicated to
            providing high-quality, compassionate care to patients of all ages.
            With state-of-the-art facilities and a commitment to excellence, we
            strive to create a comfortable and welcoming environment for all
            your dental needs. Trust us to help you achieve a healthy, beautiful
            smile that lasts a lifetime.
          </Typography>
          <hr
            style={{
              width: "80vw",
              borderTop: "3px solid #4cceac",
            }}
          />
        </Stack>
      </div>
      <div id="Services">
        <Stack
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Typography variant="h1" color={"#4cceac"} mt={5}>
            Our Services
          </Typography>
          <Stack
            className="Services"
            flexDirection={"row"}
            flexWrap={"wrap"}
            gap={4}
            mt={"2%"}
            justifyContent={"center"}
            alignItems={"center"}
            mb={"3%"}
          >
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                serviceName={service.name}
                serviceDescription={service.description}
                Image={service.image}
              />
            ))}
          </Stack>
        </Stack>
      </div>
      <div id="Footer">
        <Stack
          className="Footer"
          sx={{ backgroundColor: "rgb(26,28,34)" }}
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"column"}
          gap={3}
        >
          <img
            src={FooterImage}
            alt="tooth logo"
            width={"100px"}
            height={"100px"}
          />{" "}
          <hr
            style={{
              width: "100%",
            }}
          />
          <Typography
            variant="h3"
            fontSize={"20px"}
            color={"#FFF"}
            width={"30%"}
            mb={2}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            Your health and well-being are our top priorities. Contact us today
            to schedule an appointment and experience the difference in
            personalized healthcare.
          </Typography>
          <Stack
            display={"flex"}
            flexDirection={"row"}
            gap={5}
            mb={10}
            justifyContent={"space-evenly"}
            alignItems={"center"}
          >
            <InstagramIcon
              color="secondary"
              sx={{
                fontSize: 40,
                ":hover": {
                  cursor: "pointer",
                  transition: "all .3s ease-out",
                  transform: "translateY(-5px)",
                },
              }}
            />
            <FacebookIcon
              color="secondary"
              sx={{
                fontSize: 40,
                ":hover": {
                  cursor: "pointer",
                  transition: "all .3s ease-out",
                  transform: "translateY(-5px)",
                },
              }}
            />
            <TwitterIcon
              color="secondary"
              sx={{
                fontSize: 40,
                ":hover": {
                  cursor: "pointer",
                  transition: "all .3s ease-out",
                  transform: "translateY(-5px)",
                },
              }}
            />
            <LinkedInIcon
              color="secondary"
              sx={{
                fontSize: 40,
                ":hover": {
                  cursor: "pointer",
                  transition: "all .3s ease-out",
                  transform: "translateY(-5px)",
                },
              }}
            />
          </Stack>
        </Stack>
      </div>
    </Box>
  );
};

export default LandingPage;
