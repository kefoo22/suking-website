import React from "react";
import { FaTools, FaChair, FaDollarSign } from "react-icons/fa";
import { motion } from "framer-motion";
import servicesBg from "../assets/services-bg.jpg";

function Services() {
  const services = [
    {
      title: "Chair Repairs",
      desc: "We fix office chairs for comfort and durability.",
      icon: <FaTools className="text-green-600 text-4xl mb-4" />,
    },
    {
      title: "Buy Furniture",
      desc: "We buy used office furniture at fair prices.",
      icon: <FaChair className="text-green-600 text-4xl mb-4" />,
    },
    {
      title: "Sell Furniture",
      desc: "Affordable new and refurbished office furniture.",
      icon: <FaDollarSign className="text-green-600 text-4xl mb-4" />,
    },
  ];

  return (
    <section
      id="services"
      className="relative py-16 bg-gray-100 text-white"
      style={{
        backgroundImage: `url(${servicesBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              className="bg-white text-gray-800 p-6 rounded-lg shadow-lg text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
            >
              {service.icon}
              <h3 className="text-xl font-semibold mb-2 text-green-600">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* ✅ Call to Action */}
        <div className="text-center mt-12">
          <a
            href="#contact"
            className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-green-700 transition text-lg font-semibold"
          >
            Contact Us Today
          </a>
        </div>
      </div>
    </section>
  );
}

export default Services;
