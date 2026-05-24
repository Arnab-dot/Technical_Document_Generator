import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import InputPanel from './InputPanel'
import OutputPanel from './OutputPanel'
import { generateFromPR, generateFromCode } from '../../api'
import './AppPage.css'

export default function AppPage() {
  const [docs, setDocs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleGenerate = useCallback(async (input) => {
    setLoading(true)
    setError(null)
    setDocs([])

    try {
      let result
      if (input.type === 'pr') {
        result = await generateFromPR(input.prUrl)
      } else {
        result = await generateFromCode(input.code, input.filename)
      }

      if (!result || result.length === 0) {
        setError('No documentation generated. The PR might not contain supported code files.')
        return
      }

      setDocs(result)
    } catch (err) {
      setError(err.message || 'Failed to connect to the backend server.')
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <div className="app-page">
      {/* Navbar */}
      <nav className="app-navbar glass-panel">
        <div className="app-navbar-inner">
          <Link to="/" className="navbar-logo" style={{ textDecoration: 'none' }}>
            <span className="navbar-logo-dot" style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#00d4aa',
              boxShadow: '0 0 8px rgba(0, 212, 170, 0.5)',
              display: 'inline-block',
            }} />
            <span className="heading-display" style={{ fontSize: 18, marginLeft: 10 }}>DocDraft AI</span>
          </Link>
          <Link to="/" className="back-link">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M10 7H4m0 0l3-3M4 7l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="app-content">
        <div className="app-grid">
          <InputPanel onGenerate={handleGenerate} loading={loading} />
          <OutputPanel docs={docs} loading={loading} error={error} />
        </div>
      </div>
    </div>
  )
}
