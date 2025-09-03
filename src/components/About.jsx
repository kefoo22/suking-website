import React from "react";
import { motion } from "framer-motion";
import aboutImg from "../assets/about.jpg"; // replace with your own image

function About() {
  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
        {/* Left - Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <img
            src={aboutImg}
            alt="About SuKing"
            className="rounded-lg shadow-lg"
          />
        </motion.div>

        {/* Right - Text */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4 text-green-600">About Us</h2>
          <p className="text-gray-700 mb-4">
            At <span className="font-semibold text-green-600">SuKing</span>, we
            specialize in office chair repairs and provide high-quality office
            furniture at affordable prices.
          </p>
          <p className="text-gray-700 mb-4">
            Whether you're looking to{" "}
            <span className="font-medium">repair existing chairs</span>,{" "}
            <span className="font-medium">buy new ones</span>, or{" "}
            <span className="font-medium">sell old ones</span>, we’ve got you
            covered.
          </p>
          <p className="text-gray-700">
            With years of experience, our mission is to make every office space
            comfortable, stylish, and affordable.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default About;
