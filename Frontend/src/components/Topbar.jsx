import { Box, IconButton, useTheme, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ColorModeContext } from "../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Logo from "../assets/images/Logo.jpeg";

const Topbar = ({ personSettings }) => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const colorStyle = theme.palette.mode === "dark" ? "#868dfb" : "#a4a9fc";

  return (
    <Stack
      display="flex"
      justifyContent={"space-between"}
      alignItems={"center"}
      flexDirection={"row"}
      sx={{ borderBottom: `8px solid ${colorStyle}` }}
    >
      <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
        {/* ICONS */}
        <img
          src={Logo}
          alt=""
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            margin: "10px 10px 10px 10px",
          }}
        />
        <Typography variant="h2">Radiant Smiles</Typography>
      </Box>
      <Box>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <NavLink to={`${personSettings}`}>
          <IconButton>
            <SettingsOutlinedIcon />
          </IconButton>
        </NavLink>
      </Box>
    </Stack>
  );
};

export default Topbar;
