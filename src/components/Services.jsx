import React, { useEffect, useState } from "react";
import { FaTools, FaChair, FaDollarSign } from "react-icons/fa";
import { motion } from "framer-motion";
import { createClient } from "contentful";
import servicesBg from "../assets/services-bg.jpg";

function Services() {
  const [chairs, setChairs] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // ✅ new state

  // ✅ Fetch chairs from Contentful
  useEffect(() => {
    const client = createClient({
      space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
      accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
    });

    client
      .getEntries({ content_type: "chairStock" })
      .then((res) => setChairs(res.items))
      .catch(console.error);
  }, []);

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

  // ✅ Navigate to contact with pre-filled chair name
  const goToContact = (chairName) => {
    window.location.hash = `contact?chair=${encodeURIComponent(chairName)}`;
    setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

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
        {/* ✅ Services Section */}
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
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
              }}
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
          <button
            onClick={() => goToContact("General Services Inquiry")}
            className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-green-700 transition text-lg font-semibold"
          >
            Contact Us Today
          </button>
        </div>

        {/* ✅ Chairs in Stock Section */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-center mb-8 text-green-500">
            Chairs in Stock
          </h2>
          {chairs.length === 0 ? (
            <p className="text-center text-gray-300">
              No chairs available at the moment.
            </p>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {chairs.map((chair, i) => {
                const { title, description, price, image } = chair.fields;
                return (
                  <motion.div
                    key={chair.sys.id}
                    className="bg-white text-gray-800 p-6 rounded-lg shadow-lg flex flex-col justify-between"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: i * 0.2 }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
                    }}
                  >
                    {image && (
                      <img
                        src={image.fields.file.url}
                        alt={title}
                        className="w-full h-40 object-cover rounded-md mb-4 cursor-pointer"
                        onClick={() => setSelectedImage(image.fields.file.url)} // ✅ click to open modal
                      />
                    )}
                    <div>
                      <h3 className="text-lg font-semibold text-green-600 mb-2">
                        {title}
                      </h3>
                      <p className="text-gray-600">{description}</p>
                      {price && (
                        <p className="text-green-700 font-bold mt-2">
                          R {price}
                        </p>
                      )}
                    </div>

                    {/* ✅ Contact Us Button */}
                    <div className="mt-4 text-center">
                      <button
                        onClick={() => goToContact(title)}
                        className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition text-sm font-semibold"
                      >
                        Contact Us
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ✅ Full Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)} // close on background click
        >
          <img
            src={selectedImage}
            alt="Full Chair"
            className="max-w-3xl max-h-[90vh] rounded-lg shadow-lg"
          />
          <button
            className="absolute top-6 right-6 text-white text-3xl font-bold"
            onClick={() => setSelectedImage(null)}
          >
            ✕
          </button>
        </div>
      )}
    </section>
  );
}

export default Services;
