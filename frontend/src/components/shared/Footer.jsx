import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Left — Branding */}
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="footer-logo-dot" />
              <span className="heading-display" style={{ fontSize: 20 }}>DocDraft AI</span>
            </div>
            <p className="body-text" style={{ fontSize: 14, marginTop: 8 }}>
              Documentation that writes itself.
            </p>
            <p className="label-text" style={{ marginTop: 12 }}>
              Built during an 18-hour hackathon by ByteDrops.
            </p>
          </div>

          {/* Center — Navigation */}
          <nav className="footer-nav">
            <Link to="/" className="footer-link">Home</Link>
            <a href="#how-it-works" className="footer-link">How It Works</a>
            <a href="https://github.com/tig5389-prog/DFM_Frontend-01-11-25" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a>
            <Link to="/app" className="footer-link">API Docs</Link>
          </nav>

          {/* Right — Credits */}
          <div className="footer-credits">
            <p className="label-text">
              Made with Gemini API · FastAPI · Zero dollars invested
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
