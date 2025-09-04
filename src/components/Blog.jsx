import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "contentful";
import { Link } from "react-router-dom";

function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const client = createClient({
      space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
      accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
    });

    client
      .getEntries({ content_type: "blogPost", order: "-fields.date" })
      .then((response) => setPosts(response.items))
      .catch(console.error);
  }, []);

  return (
    <section id="blog" className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        {/* ✅ Back to Home */}
        <div className="mb-8 text-left">
          <Link
            to="/"
            className="inline-block bg-gray-700 text-white px-5 py-2 rounded-lg shadow-md hover:bg-gray-800 transition"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Blog Title */}
        <h2 className="text-3xl font-bold text-center mb-10 text-green-600">
          Our Blog
        </h2>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, i) => {
            const { title, date, excerpt, image, slug } = post.fields;

            return (
              <motion.div
                key={post.sys.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow hover:shadow-xl overflow-hidden transform hover:-translate-y-2 transition"
              >
                {image && (
                  <img
                    src={image.fields.file.url}
                    alt={title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{title}</h3>
                  <p className="text-gray-500 text-sm mb-4">{date}</p>
                  <p className="text-gray-700 mb-4">{excerpt}</p>
                  <Link
                    to={`/blog/${slug}`}
                    className="text-green-600 font-semibold hover:underline"
                  >
                    Read More →
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Blog;
