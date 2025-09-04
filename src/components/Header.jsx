import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollLink from "./ScrollLink"; // ✅ new import
import logo from "../assets/logo.png";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home", type: "anchor" },
    { name: "About", href: "#about", type: "anchor" },
    { name: "Services", href: "#services", type: "anchor" },
    { name: "Testimonials", href: "#testimonials", type: "anchor" },
    { name: "Blog", href: "/blog", type: "route" },
    { name: "Contact", href: "#contact", type: "anchor" },
  ];

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src={logo} alt="SuKing Logo" className="h-10 w-auto" />
          <h1 className="text-2xl font-bold text-green-600">SuKing</h1>
        </div>

        <ul className="hidden md:flex gap-6 text-gray-700">
          {navLinks.map((link, i) => (
            <motion.li
              key={i}
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative"
            >
              {link.type === "anchor" ? (
                <ScrollLink
                  to={link.href}
                  className="hover:text-green-600 transition-colors"
                >
                  {link.name}
                </ScrollLink>
              ) : (
                <Link to={link.href} className="hover:text-green-600 transition-colors">
                  {link.name}
                </Link>
              )}
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
                <motion.li key={i} whileHover={{ x: 5 }} className="text-lg">
                  {link.type === "anchor" ? (
                    <ScrollLink
                      to={link.href}
                      className="hover:text-green-600"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </ScrollLink>
                  ) : (
                    <Link
                      to={link.href}
                      className="hover:text-green-600"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  )}
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
