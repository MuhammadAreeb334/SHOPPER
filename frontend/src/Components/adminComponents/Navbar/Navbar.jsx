import React from "react";
import navLogo from "../../../assets/nav-logo.svg";

const Navbar = () => {
  return (
    <nav className="h-20 bg-white border-b border-gray-200 px-4 lg:px-12 flex items-center sticky top-0 z-50 flex-shrink-0">
      <div className="flex items-center">
        <img src={navLogo} alt="Company Logo" />
      </div>
    </nav>
  );
};

export default Navbar;