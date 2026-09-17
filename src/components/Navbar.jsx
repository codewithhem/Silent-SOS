import { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const user = localStorage.getItem("user");

  const handleLogout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");

  window.location.href = "/";
};

  return (
    <nav className="navbar">

      <div className="nav-logo">
        <h2>Silent<span>SOS</span></h2>
      </div>

      <div className={`nav-links ${menuOpen ? "open" : ""}`}>

        <a
          href="/"
          onClick={() => setMenuOpen(false)}
        >
          Home
        </a>

        {user ? (
  <>
    <a href="/trusted-contacts" onClick={() => setMenuOpen(false)}>
      Trusted Contacts
    </a>

    <a href="/emergency-history" onClick={() => setMenuOpen(false)}>
      Emergency History
    </a>

    <button
      className="logout-btn"
      onClick={() => {
        setMenuOpen(false);
        handleLogout();
      }}
    >
      Logout
    </button>
  </>
        ) : (
          <>
            <a
              href="/login"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </a>

            <a
              href="/register"
              onClick={() => setMenuOpen(false)}
            >
              Register
            </a>
          </>
        )}

      </div>

      <button
        className="menu-button"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

    </nav>
  );
}

export default Navbar;