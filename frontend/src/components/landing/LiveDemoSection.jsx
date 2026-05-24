import ScrollReveal from '../shared/ScrollReveal'
import './LiveDemoSection.css'

export default function LiveDemoSection() {
  return (
    <section className="section demo-section" id="demo">
      <div className="container">
        <ScrollReveal>
          <h2 className="heading-display demo-heading">See It Work</h2>
        </ScrollReveal>

        <ScrollReveal delay={1}>
          <div className="demo-panel glass-panel">
            <div className="demo-grid">
              {/* Left — Input */}
              <div className="demo-input">
                {/* Tabs */}
                <div className="tab-pills">
                  <button className="tab-pill active">PR URL</button>
                  <button className="tab-pill">Paste Code</button>
                </div>

                <div className="demo-input-body">
                  <input
                    type="text"
                    className="glass-input"
                    placeholder="https://github.com/your-org/your-repo/pull/42"
                    readOnly
                  />

                  <button className="btn btn-primary btn-large demo-generate-btn">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 2l1.5 3.5L13 7l-3.5 1.5L8 12l-1.5-3.5L3 7l3.5-1.5L8 2z" fill="currentColor"/>
                    </svg>
                    Generate Docs
                  </button>

                  <p className="label-text demo-supported">
                    Supports Python, JavaScript, TypeScript, Go, Java, Rust
                  </p>
                </div>
              </div>

              {/* Right — Output Preview */}
              <div className="demo-output">
                <div className="demo-output-header">
                  <span className="label-text" style={{ color: 'var(--accent-teal)' }}>
                    Generated Documentation
                  </span>
                  <span className="live-badge pulse">
                    <span className="live-dot" />
                    LIVE PREVIEW
                  </span>
                </div>

                <div className="demo-skeleton">
                  <div className="skeleton" style={{ width: '60%', height: 24, marginBottom: 16 }} />
                  <div className="skeleton" style={{ width: '100%', height: 14, marginBottom: 8 }} />
                  <div className="skeleton" style={{ width: '85%', height: 14, marginBottom: 8 }} />
                  <div className="skeleton" style={{ width: '92%', height: 14, marginBottom: 24 }} />
                  <div className="skeleton" style={{ width: '100%', height: 80, borderRadius: 12 }} />
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
