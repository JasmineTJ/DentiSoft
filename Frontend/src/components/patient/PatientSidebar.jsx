import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme, Stack } from "@mui/material";
import { tokens } from "../../theme";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import BookIcon from "@mui/icons-material/Book";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ReceiptIcon from "@mui/icons-material/Receipt";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import SummarizeIcon from "@mui/icons-material/Summarize";
import LogoutIcon from "@mui/icons-material/Logout";
import MyProfilePic from "../../assets/images/profile.png";

import { Item } from "../../utils/SiderbarItem";

const PatientSidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const colorStyle = theme.palette.mode === "dark" ? "#868dfb" : "red";
  const user = sessionStorage.getItem('user')
  const userData = JSON.parse(user)
  // console.log("user is")
  // console.log(user)

  return (
    <Sidebar
      rootStyles={{
        ".ps-sidebar-container": {
          backgroundColor: `${colors.primary[400]}`,
          minHeight: "100vh",
        },
      }}
      collapsed={isCollapsed}
    >
      <Menu
        iconShape="square"
        rootStyles={{
          ".ps-menu-button:hover": {
            backgroundColor: "transparent !important",
            color: `${colorStyle} !important`,
          },
        }}
      >
        {/* LOGO AND MENU ICON */}
        <MenuItem
          onClick={() => setIsCollapsed(!isCollapsed)}
          icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
          style={{
            margin: "10px 0 20px 0",
            color: colors.grey[100],
          }}
        >
          {!isCollapsed && (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                <MenuOutlinedIcon />
              </IconButton>
            </Box>
          )}
        </MenuItem>

        {!isCollapsed && (
          <Box
            mb="25px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection={"column"}
          >
            <img
              src={MyProfilePic}
              alt="MS"
              width={"100px"}
              style={{
                borderRadius: "50%",
              }}
            />
            <Box textAlign="center">
              <Typography
                variant="h4"
                color={colors.grey[100]}
                fontWeight="bold"
                sx={{ m: "10px 0 0 0" }}
              >
                {userData.fName} {userData.lName}
              </Typography>
              <Typography
                variant="h5"
                color={colors.greenAccent[500]}
                mb={"5%"}
              >
                Patient
              </Typography>
            </Box>
          </Box>
        )}

        <Stack gap={2}>
          <NavLink to={"patientAppointments"}>
            <Item
              title="Appointments"
              icon={<FactCheckOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </NavLink>
          <NavLink to={"bookAppointment"}>
            <Item
              title="Book an Appointment"
              icon={<BookIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </NavLink>
          <NavLink to={"patientPortal"}>
            <Item
              title="Medical Record"
              icon={<SummarizeIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </NavLink>
          <NavLink to={"patientPrescriptions"}>
            <Item
              title="Prescriptions"
              icon={<VaccinesIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </NavLink>
          <NavLink to="Billing">
            <Item
              title="Invoices"
              icon={<ReceiptIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </NavLink>
          <NavLink to="../Login">
            <Item
              title="Logout"
              icon={<LogoutIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </NavLink>
        </Stack>
      </Menu>
    </Sidebar>
  );
};

export default PatientSidebar;
