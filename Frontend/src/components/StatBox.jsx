import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

const StatBox = ({ title, subtitle, icon, progress, increase }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 25px" display="flex" flexDirection="row" justifyContent="space-between">
      <Box display="flex" flexDirection="column" justifyContent="space-between">
          <Typography mb="20px" variant="h3" fontWeight="bold" sx={{ color: colors.grey[100] }}>
            {title}
          </Typography>
          <Typography variant="h4" sx={{ color: colors.greenAccent[400] }}>
          {subtitle}
        </Typography>        
      </Box>
      <Box alignContent="center">
      {React.cloneElement(icon, { sx: { fontSize: '40px', color: colors.greenAccent[400]} })}
      </Box>
    </Box>
  );
};

export default StatBox;
