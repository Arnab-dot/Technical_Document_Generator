import { useState, useCallback } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import './OutputPanel.css'

export default function OutputPanel({ docs, loading, error }) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [copied, setCopied] = useState(false)

  const selectedDoc = docs?.[selectedIndex] || null

  const handleCopy = useCallback(async () => {
    if (!selectedDoc) return
    try {
      await navigator.clipboard.writeText(selectedDoc.markdown)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      alert('Failed to copy to clipboard.')
    }
  }, [selectedDoc])

  const handleDownloadAll = useCallback(async () => {
    if (!docs || docs.length === 0) return
    try {
      const zip = new JSZip()
      docs.forEach((doc) => {
        let name = doc.filename.split('/').pop()
        if (!name.endsWith('.md')) name += '.md'
        zip.file(name, doc.markdown)
      })
      const blob = await zip.generateAsync({ type: 'blob' })
      saveAs(blob, 'technical-documentation.zip')
    } catch (err) {
      console.error('Zip generation failed', err)
    }
  }, [docs])

  // Custom code block renderer for react-markdown
  const components = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '')
      return !inline && match ? (
        <SyntaxHighlighter
          style={oneDark}
          language={match[1]}
          PreTag="div"
          customStyle={{
            background: '#0d1117',
            borderRadius: 12,
            border: '1px solid rgba(255,255,255,0.08)',
            fontSize: 14,
            lineHeight: 1.6,
          }}
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      )
    },
  }

  // ---------- Empty State ----------
  if (!loading && (!docs || docs.length === 0) && !error) {
    return (
      <div className="output-panel glass-panel">
        <div className="output-empty">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="empty-icon">
            <path d="M20 16h8l4-6h16l4 6h8v48H20V16z" stroke="#00d4aa" strokeWidth="2" fill="none" opacity="0.3"/>
            <path d="M32 36v12M48 36v12M32 36h16M32 48h16" stroke="#00d4aa" strokeWidth="2" strokeLinecap="round" opacity="0.25"/>
            <path d="M24 28h32" stroke="#00d4aa" strokeWidth="1.5" opacity="0.15"/>
          </svg>
          <h3 className="heading-display empty-title">Documentation will appear here</h3>
          <p className="body-text empty-hint">
            Paste your code or enter a PR URL and hit Generate
          </p>
        </div>
      </div>
    )
  }

  // ---------- Loading State ----------
  if (loading) {
    return (
      <div className="output-panel glass-panel">
        <div className="panel-header">
          <h2 className="heading-ui panel-label" style={{ color: 'var(--accent-teal)' }}>Output</h2>
        </div>
        <div className="output-loading">
          <div className="skeleton" style={{ width: '50%', height: 28, marginBottom: 20 }} />
          <div className="skeleton" style={{ width: '100%', height: 16, marginBottom: 10 }} />
          <div className="skeleton" style={{ width: '88%', height: 16, marginBottom: 10 }} />
          <div className="skeleton" style={{ width: '94%', height: 16, marginBottom: 28 }} />
          <div className="skeleton" style={{ width: '100%', height: 100, borderRadius: 12 }} />
        </div>
      </div>
    )
  }

  // ---------- Error State ----------
  if (error) {
    return (
      <div className="output-panel glass-panel">
        <div className="panel-header">
          <h2 className="heading-ui panel-label" style={{ color: 'var(--color-danger)' }}>Error</h2>
        </div>
        <div className="output-error">
          <p className="body-text" style={{ color: 'var(--color-danger)' }}>{error}</p>
        </div>
      </div>
    )
  }

  // ---------- Results State ----------
  return (
    <div className="output-panel glass-panel">
      {/* Toolbar */}
      <div className="output-toolbar">
        <div className="file-tabs">
          {docs.map((doc, i) => (
            <button
              key={i}
              className={`file-tab glass-pill ${i === selectedIndex ? 'active' : ''}`}
              onClick={() => { setSelectedIndex(i); setCopied(false); }}
            >
              {doc.filename.split('/').pop()}
            </button>
          ))}
        </div>
        <div className="toolbar-actions">
          <button
            className="btn btn-secondary toolbar-btn"
            onClick={handleCopy}
          >
            {copied ? (
              <>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="4" y="4" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M10 4V3a1.5 1.5 0 00-1.5-1.5H3A1.5 1.5 0 001.5 3v5.5A1.5 1.5 0 003 10h1" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
                Copy
              </>
            )}
          </button>
          <button
            className="btn btn-primary toolbar-btn"
            onClick={handleDownloadAll}
            style={{ fontSize: 12 }}
          >
            Download All
          </button>
        </div>
      </div>

      {/* Rendered markdown */}
      <div className="output-content markdown-rendered">
        {selectedDoc && (
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
            {selectedDoc.markdown}
          </ReactMarkdown>
        )}
      </div>

      {/* Metadata bar */}
      <div className="output-meta">
        <span>Generated in 2.3s</span>
        <span>·</span>
        <span>847 tokens used</span>
        <span>·</span>
        <span>{docs.length} section{docs.length !== 1 ? 's' : ''}</span>
        <span>·</span>
        <span>gemini-2.5-flash</span>
      </div>
    </div>
  )
}
