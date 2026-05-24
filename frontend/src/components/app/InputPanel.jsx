import { useState } from 'react'
import './InputPanel.css'

export default function InputPanel({ onGenerate, loading }) {
  const [activeTab, setActiveTab] = useState('pr')
  const [prUrl, setPrUrl] = useState('')
  const [filename, setFilename] = useState('')
  const [language, setLanguage] = useState('python')
  const [code, setCode] = useState('')

  const handleSubmit = () => {
    if (activeTab === 'pr') {
      if (!prUrl.trim()) return
      onGenerate({ type: 'pr', prUrl: prUrl.trim() })
    } else {
      if (!code.trim()) return
      onGenerate({
        type: 'code',
        code: code.trim(),
        filename: filename.trim() || 'untitled.txt',
      })
    }
  }

  return (
    <div className="input-panel glass-panel">
      {/* Header */}
      <div className="panel-header">
        <h2 className="heading-ui panel-label">Input</h2>
      </div>

      {/* Tabs */}
      <div className="tab-pills" style={{ marginBottom: 24 }}>
        <button
          className={`tab-pill ${activeTab === 'pr' ? 'active' : ''}`}
          onClick={() => setActiveTab('pr')}
        >
          GitHub PR
        </button>
        <button
          className={`tab-pill ${activeTab === 'code' ? 'active' : ''}`}
          onClick={() => setActiveTab('code')}
        >
          Paste Code
        </button>
      </div>

      {/* PR Tab */}
      {activeTab === 'pr' && (
        <div className="input-tab-content">
          <label className="label-text">Pull Request URL</label>
          <input
            type="text"
            className="glass-input"
            placeholder="https://github.com/owner/repo/pull/123"
            value={prUrl}
            onChange={(e) => setPrUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          />

          {/* Static file selector placeholder */}
          <div className="file-selector glass-panel" style={{ padding: 16, marginTop: 16, borderRadius: 12 }}>
            <p className="label-text" style={{ marginBottom: 8 }}>Optional: select specific files</p>
            <div className="file-check">
              <input type="checkbox" id="file-all" defaultChecked readOnly />
              <label htmlFor="file-all" style={{ fontSize: 13, color: 'var(--text-secondary)' }}>All changed files</label>
            </div>
          </div>
        </div>
      )}

      {/* Code Tab */}
      {activeTab === 'code' && (
        <div className="input-tab-content">
          <label className="label-text">Source File</label>
          <input
            type="text"
            className="glass-input"
            placeholder="e.g., main.py"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            style={{ marginBottom: 16 }}
          />

          <label className="label-text">Language</label>
          <select
            className="glass-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{ marginBottom: 16 }}
          >
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="go">Go</option>
            <option value="java">Java</option>
            <option value="rust">Rust</option>
          </select>

          <label className="label-text">Code</label>
          <textarea
            className="glass-textarea"
            placeholder="Paste your code here..."
            rows={12}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={{ height: 280 }}
          />
        </div>
      )}

      {/* Generate Button */}
      <button
        className="btn btn-primary btn-large generate-btn"
        onClick={handleSubmit}
        disabled={loading}
        style={{ marginTop: 24 }}
      >
        {loading ? (
          <>
            <div className="spinner" />
            Analyzing{activeTab === 'pr' ? ' PR' : ''}...
          </>
        ) : (
          'Generate Documentation'
        )}
      </button>

      {/* Trust info */}
      <div className="trust-box" style={{ marginTop: 20 }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
          <circle cx="8" cy="8" r="7" stroke="#00d4aa" strokeWidth="1.5" fill="none"/>
          <path d="M8 5v4M8 11h.01" stroke="#00d4aa" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <p className="body-text" style={{ fontSize: 13, margin: 0, color: 'var(--text-secondary)' }}>
          DocDraft reads your code locally. Nothing is stored. Your API key is never logged.
        </p>
      </div>

      {/* Supported file types */}
      <p className="label-text supported-types">
        Supports: .py · .js · .ts · .go · .java · .rs · .tsx · .jsx
      </p>
    </div>
  )
}
