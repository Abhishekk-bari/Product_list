// Importing React and useState hook from React library
import React, { useState } from 'react';

// Importing a logo image from the assets directory
import logo from '../assets/logo.png';

// Importing a Button component from a custom UI library
import { Button } from "@/components/ui/button";

// Importing icons from react-icons library
import { BsCart4 } from "react-icons/bs"; // Cart icon
import { FaRegBell } from "react-icons/fa"; // Bell (notification) icon
import { HiMenuAlt3, HiX } from "react-icons/hi"; // Menu and close icons

// Defining a functional component for the Navbar
const Navbar: React.FC = () => {
  // Using useState hook to manage the state of the mobile menu visibility
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    // Main navigation wrapper with padding and background color
    <nav className="pb-8 pt-10 bg-white">
      {/* Content wrapper to control layout and responsive design */}
      <div className="max-w-8xl mx-auto sm:px-6 lg:px-4">
        {/* Flex container to arrange logo and menu items horizontally */}
        <div className="flex justify-between items-center h-10">
          {/* Logo */}
          <img src={logo} className="w-36 h-auto object-contain" alt="Logo" />

          {/* Desktop Menu (only visible on medium screens and larger) */}
          <div className="hidden md:flex space-x-8 text-xl items-center">
            <BsCart4 className="text-3xl" /> {/* Cart icon */}
            <FaRegBell className="text-3xl" /> {/* Notification icon */}
            <Button className="bg-green-500 text-gray-600 rounded px-2 py-1">
              Login {/* Login button */}
            </Button>
          </div>

          {/* Mobile Menu Button (visible only on small screens) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} // Toggles the mobile menu state
              aria-label="Toggle menu" // Accessibility attribute for screen readers
            >
              {/* Conditional rendering of menu or close icon based on state */}
              {isMobileMenuOpen ? (
                <HiX className="text-3xl" /> // Close icon when menu is open
              ) : (
                <HiMenuAlt3 className="text-3xl" /> // Menu icon when menu is closed
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu (only displayed when mobile menu state is true) */}
        {isMobileMenuOpen && (
          <div className="md:hidden flex flex-col space-y-4 mt-4">
            <BsCart4 className="text-2xl" /> {/* Smaller cart icon */}
            <FaRegBell className="text-2xl" /> {/* Smaller notification icon */}
            <Button className="bg-green-500 text-gray-600 rounded px-2 py-1">
              Login {/* Login button */}
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
