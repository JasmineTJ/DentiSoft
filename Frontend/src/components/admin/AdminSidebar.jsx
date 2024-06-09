import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { NavLink } from "react-router-dom";
import { Box, IconButton, Typography, useTheme, Stack } from "@mui/material";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import SickOutlinedIcon from "@mui/icons-material/SickOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import AddIcon from "@mui/icons-material/Add";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import MyProfilePic from "../../assets/images/profile.png";

import { Item } from "../../utils/SiderbarItem";

const AdminSidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const colorStyle = theme.palette.mode === "dark" ? "#868dfb" : "red";

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
                Muhammad Sami
              </Typography>
              <Typography
                variant="h5"
                color={colors.greenAccent[500]}
                mb={"5%"}
              >
                Admin
              </Typography>
            </Box>
          </Box>
        )}

        <Stack gap={2}>
          <NavLink to="adminDashboard">
            <Item
              title="Dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </NavLink>
          <NavLink to="adminAppointments">
            <Item
              title="Appointments"
              icon={<FactCheckOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </NavLink>
          <NavLink to="adminDoctors">
            <Item
              title="Doctors"
              icon={<GroupOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </NavLink>
          <NavLink to="addDoctor">
            <Item
              title="Add a Doctor"
              icon={<PersonAddAltIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </NavLink>
          <NavLink to="patients">
            <Item
              title="Patients"
              icon={<SickOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </NavLink>
          <NavLink to="addPatient">
            <Item
              title="Add a Patient"
              icon={<PersonAddAltIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </NavLink>
          <NavLink to="inventory">
            <Item
              title="Inventory"
              icon={<WarehouseIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </NavLink>
          <NavLink to="addEquipment">
            <Item
              title="Add Equipment"
              icon={<AddIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </NavLink>
          <NavLink to="services">
            <Item
              title="Set Service Costs"
              icon={<SupportAgentIcon />}
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

export default AdminSidebar;
