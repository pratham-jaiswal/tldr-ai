import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="landing-container">
      <header className="landing-header">
        <h1>TL;DR AI</h1>
        <p>Simplify content instantly with AI-powered summaries.</p>
      </header>
      <section className="preview-section">
        <div className="preview-box">
          <p className="preview-text">
            Too long; didn't read?
            <br />
            Let AI summarize it for you in seconds.
          </p>
          <div className="cta-buttons">
            <Link to="/tldr" className="btn primary">
              Get Started
            </Link>
            <Link to="/about" className="btn secondary">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
