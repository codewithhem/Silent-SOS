import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">

        <div className="footer-brand">
          <h3>
            Silent<span>SOS</span>
          </h3>

          <p>
            A discreet emergency platform designed to help
            when speaking is not possible.
          </p>
        </div>

        <div className="footer-links">
          <div>
            <h4>Platform</h4>
            <a href="/">Home</a>
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </div>

          <div>
            <h4>Safety</h4>
            <a href="#how-it-works">How It Works</a>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 Silent SOS. All rights reserved.</p>
        <span>Built for safer moments.</span>
      </div>
    </footer>
  );
}

export default Footer;