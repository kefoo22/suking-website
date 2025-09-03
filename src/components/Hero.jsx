import React from "react";
import { motion } from "framer-motion";
import heroBg from "../assets/hero-bg.jpg"; // replace with your actual image

function Hero() {
  return (
    <section
      id="home"
      className="relative py-32 text-center text-white"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Quality Office Furniture & Chair Repairs
        </motion.h2>

        <motion.p
          className="text-lg mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Reliable repairs, buying & selling of office chairs and furniture in
          one place.
        </motion.p>

        <motion.a
          href="#contact"
          className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 inline-block"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
        >
          Get in Touch
        </motion.a>
      </div>
    </section>
  );
}

export default Hero;
