import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Section 1: About */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">About Us</h2>
          <p className="text-sm leading-relaxed">
            We are committed to providing the best products and services to our customers. 
            Your satisfaction is our priority.
          </p>
        </div>

        {/* Section 2: Quick Links */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-white">Home</a>
            </li>
            <li>
              <a href="/about" className="hover:text-white">About</a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white">Contact</a>
            </li>
            <li>
              <a href="/faq" className="hover:text-white">FAQ</a>
            </li>
          </ul>
        </div>

        {/* Section 3: Contact Info */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Contact Us</h2>
          <ul className="text-sm space-y-2">
            <li>
              <span className="font-semibold">Email:</span> support@example.com
            </li>
            <li>
              <span className="font-semibold">Phone:</span> +123-456-7890
            </li>
            <li>
              <span className="font-semibold">Address:</span> 123 Main Street, City, Country
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
        © {new Date().getFullYear()} Your Company Name. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
