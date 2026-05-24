import ScrollReveal from '../shared/ScrollReveal'
import './HowItWorksSection.css'

const steps = [
  {
    num: '01',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M20 4l-2 2h-6a2 2 0 00-2 2v24a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2h-6l-2-2z" stroke="#00d4aa" strokeWidth="2" fill="none"/>
        <path d="M14 18h12M14 22h8M14 26h10" stroke="#00d4aa" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Connect Your Repo',
    desc: 'Paste a GitHub PR URL or drop in your code directly. No OAuth, no setup, no permissions beyond what you already have.',
  },
  {
    num: '02',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="14" stroke="#00d4aa" strokeWidth="2" fill="none"/>
        <path d="M20 12v8l5 5" stroke="#00d4aa" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="20" cy="20" r="3" fill="#00d4aa" fillOpacity="0.3"/>
      </svg>
    ),
    title: 'AI Reads the Diff',
    desc: 'DocDraft analyzes every changed file, understands context across functions and classes, and identifies what actually needs documenting.',
  },
  {
    num: '03',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M6 8h28v20a2 2 0 01-2 2H8a2 2 0 01-2-2V8z" stroke="#00d4aa" strokeWidth="2" fill="none"/>
        <path d="M6 8l14 12 14-12" stroke="#00d4aa" strokeWidth="2" fill="none"/>
        <path d="M26 34l4-4m0 0l4-4m-4 4l-4-4m4 4l4 4" stroke="#00d4aa" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Docs Land Instantly',
    desc: 'Clean markdown documentation appears in seconds. Copy it, download it, or push it straight to your wiki.',
  },
]

export default function HowItWorksSection() {
  return (
    <section className="section how-it-works" id="how-it-works">
      <div className="container">
        <ScrollReveal>
          <h2 className="heading-display how-heading">Three Steps. Zero Friction.</h2>
          <p className="body-text how-subheading">
            From code to docs in the time it takes to read this sentence.
          </p>
        </ScrollReveal>

        <div className="steps-grid">
          {steps.map((step, i) => (
            <ScrollReveal key={step.num} delay={i + 1}>
              <div className="step-card glass-card sweep-border">
                <div className="step-badge glass-pill">
                  <span>{step.num}</span>
                </div>
                <div className="step-icon">{step.icon}</div>
                <h3 className="heading-display step-title">{step.title}</h3>
                <p className="body-text step-desc">{step.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
