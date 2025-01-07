import React from 'react';
import logo from '../assets/logo.png';
import { Button } from "@/components/ui/button"


const Navbar: React.FC = () => {
  return (
    <nav className="bg-white pb-8 pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-10">
          <img src={logo} className='w-36 h-auto object-contain' alt="Logo" />
          <div className="space-x-10 text-xl ">
            <a href="#" className="text-gray-600 hover:text-green-600">Cart</a>
            <a href="#" className="text-gray-600 hover:text-green-600">Contact</a>
            <Button className="bg-green-500 text-gray-600 rounded px-2 py-1">Login</Button> 
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
