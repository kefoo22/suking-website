import React from "react";
import { motion } from "framer-motion";

function Testimonials() {
  const testimonials = [
    {
      name: "John Doe",
      feedback:
        "Suking repaired my office chairs perfectly. Highly recommend!",
    },
    {
      name: "Jane Smith",
      feedback: "Bought a second-hand desk here, great quality and price!",
    },
    {
      name: "Michael Lee",
      feedback: "Very professional team, reliable and affordable.",
    },
  ];

  return (
    <section id="testimonials" className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-green-600">
          Customer Testimonials
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow hover:shadow-xl transform hover:-translate-y-2 transition"
            >
              <span className="text-4xl text-green-600">“</span>
              <p className="italic text-gray-700 text-lg">{t.feedback}</p>
              <h4 className="mt-4 font-semibold text-green-600">- {t.name}</h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
