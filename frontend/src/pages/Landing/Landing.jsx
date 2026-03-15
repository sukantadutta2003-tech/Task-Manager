import { useNavigate } from "react-router-dom";
import { FiCheckCircle, FiLayers, FiShield, FiZap, FiArrowRight } from "react-icons/fi";
import "./landing.css";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      {/* ===== NAVBAR ===== */}
      <nav className="landing-nav">
        <div className="landing-nav-left">
          <span className="landing-logo">✦ TaskLoom</span>
        </div>
        <div className="landing-nav-right">
          <button className="nav-btn outline" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="nav-btn filled" onClick={() => navigate("/login")}>
            Get Started
          </button>
        </div>
      </nav>

      {/* ===== HERO SECTION ===== */}
      <section className="hero">
        <div className="hero-badge">🚀 Your productivity, reimagined</div>
        <h1 className="hero-title">
          Organize your life,<br />
          <span className="hero-gradient">one task at a time.</span>
        </h1>
        <p className="hero-subtitle">
          TaskLoom helps you manage tasks effortlessly with custom lists,
          smart categories, and a beautiful interface that keeps you focused.
        </p>
        <div className="hero-actions">
          <button className="hero-btn primary" onClick={() => navigate("/login")}>
            Start Free <FiArrowRight />
          </button>
          <button className="hero-btn secondary" onClick={() => {
            document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
          }}>
            See Features
          </button>
        </div>
        <div className="hero-image-wrapper">
          <img src="/hero-mockup.png" alt="TaskLoom app preview" className="hero-image" />
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section id="features" className="features">
        <div className="features-header">
          <span className="features-badge">Features</span>
          <h2>Everything you need to stay productive</h2>
          <p>Powerful yet simple tools designed around the way you work.</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon" style={{ background: "rgba(99, 102, 241, 0.1)", color: "#6366f1" }}>
              <FiLayers />
            </div>
            <h3>Custom Lists</h3>
            <p>Organize tasks into Personal, Work, Shopping, Family, and more. Create unlimited custom lists.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon" style={{ background: "rgba(34, 197, 94, 0.1)", color: "#22c55e" }}>
              <FiCheckCircle />
            </div>
            <h3>Smart Task Tracking</h3>
            <p>Add, complete, and delete tasks instantly. Track your progress with a beautiful completed section.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon" style={{ background: "rgba(245, 158, 11, 0.1)", color: "#f59e0b" }}>
              <FiZap />
            </div>
            <h3>Lightning Fast</h3>
            <p>Blazing fast performance with real-time updates. Your tasks sync instantly across sessions.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon" style={{ background: "rgba(239, 68, 68, 0.1)", color: "#ef4444" }}>
              <FiShield />
            </div>
            <h3>Secure & Private</h3>
            <p>JWT-based authentication keeps your tasks safe. Only you can see your data.</p>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="cta">
        <div className="cta-content">
          <h2>Ready to get organized?</h2>
          <p>Join TaskLoom today and take control of your productivity.</p>
          <button className="hero-btn primary" onClick={() => navigate("/login")}>
            Create Free Account <FiArrowRight />
          </button>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="landing-footer">
        <span>© 2026 TaskLoom. Built with ❤️</span>
      </footer>
    </div>
  );
}

export default Landing;
