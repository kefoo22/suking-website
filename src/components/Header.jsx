import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react"; // hamburger & close icons
import logo from "../assets/logo.png"; // replace with your actual logo

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Blog", href: "#blog" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="SuKing Logo" className="h-10 w-auto" />
          <h1 className="text-2xl font-bold text-green-600">SuKing</h1>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-6 text-gray-700">
          {navLinks.map((link, i) => (
            <motion.li
              key={i}
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative"
            >
              <a
                href={link.href}
                className="hover:text-green-600 transition-colors"
              >
                {link.name}
              </a>

              {/* Animated underline */}
              <motion.span
                className="absolute left-0 bottom-0 h-[2px] bg-green-600 w-full origin-left scale-x-0"
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.li>
          ))}
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="fixed top-0 right-0 h-full w-2/3 bg-white shadow-lg z-50 md:hidden"
          >
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h2 className="text-xl font-bold text-green-600">SuKing</h2>
              <button onClick={() => setIsOpen(false)}>
                <X size={28} className="text-gray-700" />
              </button>
            </div>
            <ul className="flex flex-col gap-6 px-6 py-8 text-gray-700">
              {navLinks.map((link, i) => (
                <motion.li
                  key={i}
                  whileHover={{ x: 5 }}
                  className="text-lg"
                >
                  <a
                    href={link.href}
                    className="hover:text-green-600"
                    onClick={() => setIsOpen(false)} // close on link click
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
