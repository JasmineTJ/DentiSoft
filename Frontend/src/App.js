import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Routes, Route } from "react-router-dom";
import Favicon from "react-favicon";
import Logo from "./assets/images/Logo.jpeg";

//Importing Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import PatientInfo from "./pages/PatientInfo";

import BookAppointment from "./components/forms/BookAppointment";
import ProfileSettings from "./components/forms/ProfileSettings";
//Importing Admin components (Sidebar Items)
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminDoctors from "./components/admin/AdminDoctors";
import AddDoctor from "./components/forms/AddDoctor";
import AddPatient from "./components/forms/AddPatient";
import AdminAppointments from "./components/admin/AdminAppointments";
import AdminPatients from "./components/admin/AdminPatients";
import Inventory from "./components/admin/Inventory";
import AddEquipmentForm from "./components/forms/AddEquipment";
import ServiceCostForm from "./components/forms/ServiceCost";
//Importing Patient components (Sidebar Items)
import PatientDashboard from "./components/patient/PatientDashboard";
import PatientPortal from "./components/patient/PatientPortal";
import PatientAppointments from "./components/patient/PatientAppointments";
import PatientPrescriptions from "./components/patient/PatientPrescriptions";
import Billing from "./components/patient/Billing";
//Importing Doctor components (Sidebar Items)
import DoctorDashboard from "./components/doctor/DoctorDashboard";
import DoctorAppointments from "./components/doctor/DoctorAppointments";
import DoctorPatients from "./components/doctor/DoctorPatients";
import Layout from "./pages/Layout";
import LandingPage from "./pages/LandingPage";
import React, { useEffect, useState } from "react";

function App() {
  useEffect(() => {
    document.title = "Radiant Smiles Clinic";
  }, []);

  const [theme, colorMode] = useMode();
  const [person, setPerson] = useState("admin");
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Favicon url={Logo} />
        <Routes>
          <Route
            index
            path="login"
            element={<Login person={person} setPerson={setPerson} />}
          />
          <Route path="login/register" element={<Register />} />
          <Route path="login/register/patientinfo" element={<PatientInfo />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="login/layout" element={<Layout person={person} setPerson={setPerson}/>}>
            <Route path="adminDashboard" element={<AdminDashboard />} />
            <Route path="adminDoctors" element={<AdminDoctors />} />
            <Route path="addDoctor" element={<AddDoctor />} />
            <Route path="adminAppointments" element={<AdminAppointments />} />
            <Route path="settings" element={<ProfileSettings />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="addEquipment" element={<AddEquipmentForm />} />
            <Route path="services" element={<ServiceCostForm />} />
            <Route path="patients" element={<AdminPatients />} />
            <Route path="addPatient" element={<AddPatient />} />

            <Route path="patientDashboard" element={<PatientDashboard />} />
            <Route path="patientPortal" element={<PatientPortal />} />
            <Route path="bookAppointment" element={<BookAppointment />} />
            <Route
              path="patientAppointments"
              element={<PatientAppointments />}
            />
            <Route
              path="patientPrescriptions"
              element={<PatientPrescriptions />}
            />
            <Route path="Billing" element={<Billing />} />
            <Route path="patientSettings" element={<ProfileSettings />} />
            <Route path="doctorDashboard" element={<DoctorDashboard />} />
            <Route path="doctorAppointments" element={<DoctorAppointments />} />
            <Route path="doctorPatients" element={<DoctorPatients />} />
            <Route path="doctorSettings" element={<ProfileSettings />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
