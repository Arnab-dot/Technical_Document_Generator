import { Link } from 'react-router-dom'
import AnimatedBorder from '../shared/AnimatedBorder'
import ScrollReveal from '../shared/ScrollReveal'
import './HeroSection.css'

const FAKE_PYTHON = `@dataclass
class PRAnalyzer:
    """Analyzes pull request diffs for
    documentation generation."""
    
    repo: str
    pr_number: int
    _client: GitHubClient = field(init=False)

    def __post_init__(self) -> None:
        self._client = GitHubClient(self.repo)

    async def analyze_diff(
        self,
        files: list[ChangedFile],
        context_depth: int = 3
    ) -> AnalysisResult:
        """Parse changed files and extract
        documentation-worthy patterns."""
        hunks = await self._client.get_hunks(
            self.pr_number, files
        )
        return self._extract_patterns(hunks)`

const FAKE_MARKDOWN = `## PRAnalyzer Class

Handles analysis of pull request diffs to identify
documentation-worthy patterns in changed code.

**Key Methods:**
• \`analyze_diff()\` — Parses changed files and
  extracts patterns using configurable context
• \`_extract_patterns()\` — Internal pattern
  matching across diff hunks`

export default function HeroSection() {
  return (
    <section className="hero section">
      <div className="grid-pattern" />
      <div className="container hero-container">
        {/* Left Content */}
        <ScrollReveal className="hero-content">
          {/* Pill Badge */}
          <div className="hero-badge glass-pill">
            <span className="hero-badge-text">
              AI-Powered · GitHub Native · Zero Config
            </span>
          </div>

          {/* Headline */}
          <h1 className="hero-headline heading-display">
            Your Code.
            <br />
            <span className="gradient-text">Documented.</span>
          </h1>

          {/* Sub-headline */}
          <p className="hero-subheadline body-text">
            DocDraft AI reads your pull requests and codebases, then writes technical
            documentation that actually makes sense. In seconds.
          </p>

          {/* CTAs */}
          <div className="hero-ctas">
            <Link to="/app" className="btn btn-primary btn-large">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 2l8 6-8 6V2z" fill="currentColor"/>
              </svg>
              Generate Docs Now
            </Link>
            <a
              href="https://github.com/tig5389-prog/DFM_Frontend-01-11-25"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
              </svg>
              View on GitHub
            </a>
          </div>

          {/* Social Proof */}
          <p className="hero-proof label-text">
            Used by engineers at 40+ teams · Free · No signup required
          </p>
        </ScrollReveal>

        {/* Right — Code Preview Card */}
        <ScrollReveal className="hero-card-wrapper" delay={2}>
          <AnimatedBorder className="float-animation">
            <div className="hero-code-card glass-panel">
              {/* Title bar */}
              <div className="code-titlebar">
                <div className="code-dots">
                  <span className="dot dot-red" />
                  <span className="dot dot-yellow" />
                  <span className="dot dot-green" />
                </div>
                <span className="code-filename">pull_request_handler.py</span>
              </div>

              {/* Code */}
              <div className="code-block">
                <pre><code>{FAKE_PYTHON}</code></pre>
              </div>

              {/* Separator */}
              <div className="code-separator">
                <div className="separator-line" />
                <span className="separator-label">AI Generated ↓</span>
                <div className="separator-line" />
              </div>

              {/* Generated Output */}
              <div className="code-output markdown-rendered">
                <h2 style={{ fontSize: 16, marginTop: 0, borderBottom: 'none', paddingBottom: 0 }}>PRAnalyzer Class</h2>
                <p style={{ fontSize: 13, lineHeight: 1.6, marginBottom: 8, color: 'var(--text-secondary)' }}>
                  Handles analysis of pull request diffs to identify documentation-worthy patterns in changed code.
                </p>
                <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>Key Methods:</p>
                <ul style={{ paddingLeft: 16, margin: 0 }}>
                  <li style={{ fontSize: 13, lineHeight: 1.5 }}>
                    <code style={{ fontSize: 11 }}>analyze_diff()</code> — Parses changed files and extracts patterns
                  </li>
                  <li style={{ fontSize: 13, lineHeight: 1.5 }}>
                    <code style={{ fontSize: 11 }}>_extract_patterns()</code> — Internal pattern matching across diff hunks
                  </li>
                </ul>
              </div>
            </div>
          </AnimatedBorder>
        </ScrollReveal>
      </div>
    </section>
  )
}
