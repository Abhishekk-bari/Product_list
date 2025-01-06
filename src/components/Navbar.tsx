import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-2xl font-bold text-red-600">Food Explorer</h1>
          <div className="space-x-10 text-xl ">
            <a href="#" className="text-gray-600 hover:text-green-600">Home</a>
            <a href="#" className="text-gray-600 hover:text-green-600">About</a>
            <a href="#" className="text-gray-600 hover:text-green-600">Contact</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
