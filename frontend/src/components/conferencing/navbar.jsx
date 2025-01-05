import { Link } from "react-router-dom"; // Import from 'react-router-dom'
import React from "react";
import { NerdIcon, News01Icon } from "hugeicons-react";
// import {MobileNav} from "./components/MobileNav"

const navLinks = ["Dashboard", "Schedule", "Settings", "About"]; // Remove "Company Logo" from navLinks

const NavBar = () => {
  return (
    <nav className="w-full flex text-black bg-white justify-center">
      {navLinks.map((navLink) => (
        <Link
          to={`/${navLink.toLowerCase()}`} // Generate dynamic routes
          key={navLink} // Add key prop for React
          className="flex items-center gap-1  px-9 py-2 m-0"
        >
          <h2>{navLink}</h2> 
        </Link>
      ))}
    </nav>
  );
};

export default NavBar;