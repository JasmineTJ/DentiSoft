import { MenuItem } from "react-pro-sidebar";
import { tokens } from "../theme";
import { Typography, useTheme } from "@mui/material";

export const Item = ({ title, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography sx={{ textDecoration: "none", fontSize: "1rem" }}>
        {title}
      </Typography>
    </MenuItem>
  );
};
