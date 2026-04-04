import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/adminComponents/Navbar/Navbar.jsx";
import Sidebar from "../Components/adminComponents/Sidebar/Sidebar.jsx";

const Admin = () => {
  return (
    <div className="h-screen flex flex-col lg:overflow-hidden">
      <Navbar />
      <div className="lg:flex lg:flex-1 lg:overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Admin;