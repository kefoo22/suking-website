import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import heroBg from "../assets/contact-bg.jpg"; // ✅ adjust path if needed

function Contact() {
  const form = useRef();
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [chairQuery, setChairQuery] = useState("");

  // ✅ Extract ?chair= query parameter
  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.split("?")[1]);
    const chair = params.get("chair");
    if (chair) {
      setChairQuery(`Hello, I'm interested in the chair: ${chair}`);
    }
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setStatus("✅ Message sent successfully!");
          form.current.reset();
        },
        () => {
          setStatus("❌ Failed to send message. Please try again.");
        }
      )
      .finally(() => setLoading(false));
  };

  return (
    <section
      id="contact"
      className="relative py-16 bg-cover bg-center"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">
          Contact Us
        </h2>

        <form
          ref={form}
          onSubmit={sendEmail}
          className="grid gap-4 bg-white/30 backdrop-blur-md p-6 rounded-lg shadow-lg border border-white/40"
        >
          <input
            type="text"
            name="user_name"
            placeholder="Your Name"
            required
            className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="email"
            name="user_email"
            placeholder="Your Email"
            required
            className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            required
            value={chairQuery} // ✅ Pre-fill with query if exists
            onChange={(e) => setChairQuery(e.target.value)}
            className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          ></textarea>
          <button
            type="submit"
            disabled={loading}
            className={`bg-green-600 text-white py-3 rounded hover:bg-green-700 transition disabled:opacity-60`}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        {/* Status message */}
        {status && (
          <p className="text-center mt-4 font-semibold">
            {status.startsWith("✅") ? (
              <span className="text-green-200">{status}</span>
            ) : (
              <span className="text-red-300">{status}</span>
            )}
          </p>
        )}
      </div>
    </section>
  );
}

export default Contact;
