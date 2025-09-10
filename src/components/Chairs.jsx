import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "contentful";

function Chairs() {
  const [chairs, setChairs] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

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

  // ✅ Navigate to contact with pre-filled chair name
  const goToContact = (chairName) => {
    window.location.hash = `contact?chair=${encodeURIComponent(chairName)}`;
    setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <section id="chairs" className="relative py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8 text-green-600">
          Chairs in Stock
        </h2>
        {chairs.length === 0 ? (
          <p className="text-center text-gray-500">
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
                      onClick={() => setSelectedImage(image.fields.file.url)}
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

                  {/* ✅ Inquire Button */}
                  <div className="mt-4 text-center">
                    <button
                      onClick={() => goToContact(title)}
                      className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition text-sm font-semibold"
                    >
                      Inquire About This Chair
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* ✅ Full Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
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

export default Chairs;
