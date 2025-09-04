import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { createClient } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";

function BlogDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const client = createClient({
      space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
      accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
    });

    client
      .getEntries({
        content_type: "blogPost",
        "fields.slug": slug,
      })
      .then((response) => {
        if (response.items.length > 0) {
          setPost(response.items[0]);
        }
      })
      .catch(console.error);
  }, [slug]);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center">
        <p>Loading...</p>
      </div>
    );
  }

  const { title, date, content, image } = post.fields;

  // ✅ Custom rich text rendering
  const options = {
    renderNode: {
      [BLOCKS.HEADING_1]: (node, children) => (
        <h1 className="text-4xl font-bold text-green-600 mb-6">{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (node, children) => (
        <h2 className="text-3xl font-semibold text-green-500 mt-6 mb-4">
          {children}
        </h2>
      ),
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className="text-gray-700 leading-relaxed mb-4">{children}</p>
      ),
      [BLOCKS.QUOTE]: (node, children) => (
        <blockquote className="border-l-4 border-green-500 pl-4 italic text-gray-600 my-6">
          {children}
        </blockquote>
      ),
      [INLINES.HYPERLINK]: (node, children) => (
        <a
          href={node.data.uri}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-600 hover:underline"
        >
          {children}
        </a>
      ),
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const { file, title, description } = node.data.target.fields;
        return (
          <div className="my-6 flex justify-center">
            <img
              src={file.url}
              alt={description || title}
              className="rounded-lg shadow-md max-h-96 object-contain"
            />
          </div>
        );
      },
    },
  };

  return (
    <article className="max-w-3xl mx-auto py-16 px-4">
      {image && (
        <img
          src={image.fields.file.url}
          alt={title}
          className="w-full h-80 object-cover rounded-lg mb-6"
        />
      )}
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <p className="text-gray-500 mb-8">{date}</p>

      <div className="prose prose-lg max-w-none mb-12">
        {documentToReactComponents(content, options)}
      </div>

      {/* ✅ Back to Blog Button */}
      <div className="text-center">
        <Link
          to="/blog"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition"
        >
          ← Back to Blog
        </Link>
      </div>
    </article>
  );
}

export default BlogDetail;
