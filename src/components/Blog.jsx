import React from "react";
import { motion } from "framer-motion";

function Blog() {
  const posts = [
    {
      title: "5 Tips for Extending Office Chair Life",
      date: "Aug 10, 2025",
      img: "https://source.unsplash.com/400x250/?office,chair",
      excerpt:
        "Learn how to keep your office chair in top condition with simple maintenance steps.",
    },
    {
      title: "Why Refurbished Furniture is a Smart Choice",
      date: "Jul 22, 2025",
      img: "https://source.unsplash.com/400x250/?furniture,workspace",
      excerpt:
        "Discover the benefits of choosing refurbished furniture for affordability and sustainability.",
    },
    {
      title: "Office Ergonomics: Choosing the Right Chair",
      date: "Jun 15, 2025",
      img: "https://source.unsplash.com/400x250/?ergonomics,chair",
      excerpt:
        "A guide to selecting ergonomic chairs to improve posture and productivity at work.",
    },
  ];

  return (
    <section id="blog" className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-green-600">
          Our Blog
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow hover:shadow-xl overflow-hidden transform hover:-translate-y-2 transition"
            >
              <img
                src={post.img}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-500 text-sm mb-4">{post.date}</p>
                <p className="text-gray-700 mb-4">{post.excerpt}</p>
                <a
                  href="#"
                  className="text-green-600 font-semibold hover:underline"
                >
                  Read More →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Blog;
