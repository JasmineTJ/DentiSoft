import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import SickOutlinedIcon from "@mui/icons-material/SickOutlined";
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import Header from "../../components/Header";
import ReportsPopUp from "../ReportsPopUp";
//Other Components Imports
import StatBox from "../../components/StatBox";
import DoctorsList from "../../components/DoctorsList";
import PatientsStackedChart from "../PatientsStackedChart";
import DistributedBarChart from "../GenderBarChart";
import RadialChart from "../RadialChart";

const DoctorDashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <ReportsPopUp userType={"doctor"} />
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="12,361"
            subtitle="Appointments Completed"
            icon={
              <FactCheckOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="431,225"
            subtitle="Surgeries Completed"
            icon={
              <LocalHospitalOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="32,441"
            subtitle="Total Patients"
            icon={
              <SickOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            mb="20px"
            p="0 30px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Patients Survay
              </Typography>
            </Box>
          </Box>
          <Box height="350px" display="flex" flexDirection="row" justifyContent="space-evenly" alignContent="center">
            <PatientsStackedChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
            <DoctorsList />
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Sales Quantity
          </Typography>
          <Box 
              mt="-15px"
              // height="100%" 
              display="flex"
              justifyContent="space-evenly" 
              alignItems="center"
            >
              <RadialChart />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            backgroundColor={colors.primary[400]}
            m="20px 40px 0 40px" alignItems='center'
          >
            <DistributedBarChart/>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DoctorDashboard;
