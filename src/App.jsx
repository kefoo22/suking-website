import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BlogDetail from "./components/BlogDetail";

// 👇 Home page component with all sections
function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Testimonials />
      <Blog />
      <Contact />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="font-sans bg-gray-50 text-gray-900">
        <Header />

        <Routes>
          {/* Homepage */}
          <Route path="/" element={<Home />} />

          {/* Blog list */}
          <Route path="/blog" element={<Blog />} />

          {/* Blog detail */}
          <Route path="/blog/:slug" element={<BlogDetail />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
