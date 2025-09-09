import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";
import heroBg from "../assets/contact-bg.jpg";

function Contact() {
  const form = useRef();
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [chairQuery, setChairQuery] = useState("");
  const [captchaToken, setCaptchaToken] = useState(null);

  // ✅ Extract ?chair= query parameter
  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.split("?")[1]);
    const chair = params.get("chair");
    if (chair) {
      setChairQuery(`Hello, I'm interested in the chair: ${chair}`);
    }
  }, []);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    const email = form.current.user_email.value;
    const honeypot = form.current.hidden_field.value;

    // ✅ Honeypot anti-spam
    if (honeypot) {
      setStatus("❌ Spam detected.");
      setLoading(false);
      return;
    }

    // ✅ Email format validation
    if (!validateEmail(email)) {
      setStatus("❌ Please enter a valid email address.");
      setLoading(false);
      return;
    }

    // ✅ Check reCAPTCHA
    if (!captchaToken) {
      setStatus("❌ Please verify that you are human.");
      setLoading(false);
      return;
    }

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
          setCaptchaToken(null); // reset captcha
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
          {/* Honeypot field */}
          <input
            type="text"
            name="hidden_field"
            style={{ display: "none" }}
            tabIndex="-1"
            autoComplete="off"
          />

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
            value={chairQuery}
            onChange={(e) => setChairQuery(e.target.value)}
            className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          ></textarea>

          {/* ✅ Google reCAPTCHA */}
          <ReCAPTCHA
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
            onChange={(token) => setCaptchaToken(token)}
            onExpired={() => setCaptchaToken(null)}
          />

          <button
            type="submit"
            disabled={loading}
            className={`bg-green-600 text-white py-3 rounded hover:bg-green-700 transition disabled:opacity-60`}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

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
