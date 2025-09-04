import React from "react";
import { useNavigate } from "react-router-dom";

function ScrollLink({ to, children, onClick, className }) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();

    if (window.location.pathname !== "/") {
      navigate("/", { replace: false });
      // wait for homepage to render, then scroll
      setTimeout(() => {
        const el = document.querySelector(to);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const el = document.querySelector(to);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }

    if (onClick) onClick();
  };

  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}

export default ScrollLink;
