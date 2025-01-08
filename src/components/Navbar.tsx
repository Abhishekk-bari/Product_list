import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { Button } from "@/components/ui/button";
import { BsCart4 } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="pb-8 pt-10 bg-white">
      <div className="max-w-8xl mx-auto sm:px-6 lg:px-4">
        <div className="flex justify-between items-center h-10">
          {/* Logo */}
          <img src={logo} className="w-36 h-auto object-contain" alt="Logo" />

          {/* Desktop Menu ui*/}
          <div className="hidden md:flex space-x-8 text-xl items-center">
            <BsCart4 className="text-3xl" />
            <FaRegBell className="text-3xl" />
            <Button className="bg-green-500 text-gray-600 rounded px-2 py-1">
              Login
            </Button>
          </div>

          {/* Mobile Menu Button related*/}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <HiX className="text-3xl" />
              ) : (
                <HiMenuAlt3 className="text-3xl" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu ui */}
        {isMobileMenuOpen && (
          <div className="md:hidden flex flex-col space-y-4 mt-4">
            <BsCart4 className="text-2xl" />
            <FaRegBell className="text-2xl" />
            <Button className="bg-green-500 text-gray-600 rounded px-2 py-1">
              Login
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
