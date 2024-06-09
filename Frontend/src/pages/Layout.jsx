import React from "react";
import { Outlet } from "react-router-dom";

import PatientSidebar from "../components/patient/PatientSidebar";
import AdminSidebar from "../components/admin/AdminSidebar";
import DoctorSidebar from "../components/doctor/DoctorSidebar";
import Topbar from "../components/Topbar";

const Layout = ({ person, setPerson }) => {
  const handleUser = () => {
    const userType = JSON.parse(sessionStorage.getItem('userType'))
    console.log(userType)
    console.log(person)
    userType==="admin"? setPerson("admin"): userType==="patient"? setPerson("patient"): setPerson("doctor")
  }
  handleUser()
  return (
    <div
      className="app"
      style={{ display: "flex", flexDirection: "row", height: "100vh" }}
    >
      {person === "patient" ? (
        <PatientSidebar />
      ) : person === "doctor" ? (
        <DoctorSidebar />
      ) : (
        <AdminSidebar />
      )}
      <main
        className="content"
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          overflowY: "auto",
        }}
      >
        <Topbar personSettings={"patientSettings"} />
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
