import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-inner">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <span className="navbar-logo-dot" />
          <span className="heading-display" style={{ fontSize: 18 }}>DocDraft AI</span>
        </Link>

        {/* Desktop Nav */}
        <div className="navbar-links">
          <a href="#how-it-works" className="nav-link">How It Works</a>
          <a href="#features" className="nav-link">Features</a>
          <a href="#demo" className="nav-link">Demo</a>
          <a
            href="https://github.com/tig5389-prog/DFM_Frontend-01-11-25"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
          >
            GitHub
          </a>
        </div>

        {/* CTA */}
        <Link to="/app" className="btn btn-primary navbar-cta">
          Generate Docs
        </Link>

        {/* Hamburger */}
        <button
          className={`hamburger ${mobileOpen ? 'open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="mobile-menu glass-panel">
          <a href="#how-it-works" className="mobile-link" onClick={() => setMobileOpen(false)}>How It Works</a>
          <a href="#features" className="mobile-link" onClick={() => setMobileOpen(false)}>Features</a>
          <a href="#demo" className="mobile-link" onClick={() => setMobileOpen(false)}>Demo</a>
          <a
            href="https://github.com/tig5389-prog/DFM_Frontend-01-11-25"
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-link"
            onClick={() => setMobileOpen(false)}
          >
            GitHub
          </a>
          <Link to="/app" className="btn btn-primary" style={{ marginTop: 8, width: '100%' }} onClick={() => setMobileOpen(false)}>
            Generate Docs
          </Link>
        </div>
      )}
    </nav>
  )
}
