import GlassCard from '../shared/GlassCard'
import ScrollReveal from '../shared/ScrollReveal'
import './FeatureHighlightsSection.css'

const features = [
  {
    title: 'PR-Level Precision',
    desc: 'DocDraft doesn\'t just scan your entire repo — it focuses specifically on what changed in the pull request. Every generated doc section maps directly to a code change.',
    bullets: [
      'File-by-file diff analysis with function-level granularity',
      'Inline doc comments linked to specific code changes',
      'Automatic detection of breaking changes and deprecations',
    ],
    cardAlign: 'left',
    cardContent: (
      <div className="feature-mockup">
        <div className="mockup-diff">
          <div className="mockup-diff-header">
            <span className="diff-filename">src/handlers/auth.py</span>
            <span className="diff-badge diff-modified">Modified</span>
          </div>
          <div className="mockup-diff-lines">
            <div className="diff-line diff-remove">- def authenticate(user):</div>
            <div className="diff-line diff-add">+ def authenticate(user, mfa=False):</div>
            <div className="diff-line diff-context">      token = generate_jwt(user.id)</div>
            <div className="diff-line diff-add">+     if mfa: verify_totp(user)</div>
          </div>
        </div>
        <div className="mockup-arrow">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 4v16m0 0l-6-6m6 6l6-6" stroke="#00d4aa" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="mockup-doc">
          <div className="mockup-doc-line heading">authenticate()</div>
          <div className="mockup-doc-line">Added MFA support via optional</div>
          <div className="mockup-doc-line"><code>mfa</code> parameter. When enabled,</div>
          <div className="mockup-doc-line">calls <code>verify_totp()</code> before</div>
          <div className="mockup-doc-line">returning the JWT token.</div>
        </div>
      </div>
    ),
  },
  {
    title: 'Understands Context, Not Just Syntax',
    desc: 'Most tools parse code. DocDraft reads it. It understands variable naming patterns, call chains, and business logic to produce documentation that is genuinely useful.',
    bullets: [
      'Semantic analysis beyond AST parsing',
      'Infers intent from naming conventions and patterns',
      'Cross-file context awareness for accurate descriptions',
    ],
    cardAlign: 'right',
    cardContent: (
      <div className="feature-mockup">
        <div className="mockup-code-pair">
          <div className="mockup-code-block">
            <span className="mockup-code-label">Input</span>
            <pre className="mockup-pre">{`def xyq_proc(a, b, fl=0):
    r = db.exec(Q1, [a])
    if fl & 0x02:
        r = [x for x in r 
             if x.ts > b]
    return {"d": r, "c": len(r)}`}</pre>
          </div>
          <div className="mockup-code-block">
            <span className="mockup-code-label" style={{ color: 'var(--accent-teal)' }}>AI Output</span>
            <pre className="mockup-pre" style={{ color: 'var(--text-primary)' }}>{`Fetches records from the 
database, optionally filtering
by timestamp when the date
filter flag (0x02) is set.

Returns a dict with data 
and count.`}</pre>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Export Anywhere',
    desc: 'Documentation is only useful if it lives where your team already works. DocDraft outputs to every format and destination your workflow needs.',
    bullets: [
      'One-click copy as formatted Markdown',
      'Download as ZIP with organized file structure',
      'Direct export to Notion, Confluence, or your wiki',
    ],
    cardAlign: 'left',
    cardContent: (
      <div className="feature-mockup">
        <div className="export-options">
          <div className="export-btn glass-card">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M6 4h16v20H6V4z" stroke="#00d4aa" strokeWidth="1.5" fill="none"/>
              <path d="M10 10h8M10 14h6M10 18h7" stroke="#00d4aa" strokeWidth="1" strokeLinecap="round"/>
            </svg>
            <span>Copy Markdown</span>
          </div>
          <div className="export-btn glass-card">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M8 4h8l6 6v14H8V4z" stroke="#0090ff" strokeWidth="1.5" fill="none"/>
              <path d="M16 4v6h6" stroke="#0090ff" strokeWidth="1.5" fill="none"/>
              <path d="M14 16v6m0 0l-3-3m3 3l3-3" stroke="#0090ff" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span>Download ZIP</span>
          </div>
          <div className="export-btn glass-card">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect x="4" y="4" width="20" height="20" rx="4" stroke="#f5a623" strokeWidth="1.5" fill="none"/>
              <path d="M10 14h8M14 10v8" stroke="#f5a623" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span>Open in Notion</span>
          </div>
        </div>
      </div>
    ),
  },
]

export default function FeatureHighlightsSection() {
  return (
    <section className="section features" id="features">
      <div className="container">
        {features.map((f, i) => (
          <ScrollReveal key={i}>
            <div className={`feature-row ${f.cardAlign === 'right' ? 'reversed' : ''}`}>
              <GlassCard
                className="feature-card"
                glow={f.cardAlign === 'left' ? 'right' : 'left'}
              >
                {f.cardContent}
              </GlassCard>
              <div className="feature-text">
                <h3 className="heading-display feature-title">{f.title}</h3>
                <p className="body-text">{f.desc}</p>
                <ul className="feature-bullets">
                  {f.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
