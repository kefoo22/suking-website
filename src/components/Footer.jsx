import React from "react";
import { FaInstagram, FaTwitter, FaTiktok } from "react-icons/fa"; // <-- icons
import logo from "../assets/logo.png"; // <-- adjust path if needed

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-10 pb-6">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-6 md:mb-0">
          <img src={logo} alt="SuKing Logo" className="h-10" />
          <h2 className="text-xl font-bold text-white">SuKing</h2>
        </div>

        {/* Social Links */}
        <div className="flex gap-6 text-xl">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 transition"
          >
            <FaInstagram />
          </a>
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-100 transition"
          >
            <FaTiktok />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
          >
            <FaTwitter />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-6 border-t border-gray-700 pt-4">
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} SuKing. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
