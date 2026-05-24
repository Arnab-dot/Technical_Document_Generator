import ScrollReveal from '../shared/ScrollReveal'
import './TechStackSection.css'

const technologies = [
  { name: 'GitHub API', icon: (
    <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
    </svg>
  )},
  { name: 'Google Gemini', icon: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M10 4c0 6-6 6-6 6s6 0 6 6c0-6 6-6 6-6s-6 0-6-6z" fill="currentColor" fillOpacity="0.6"/>
    </svg>
  )},
  { name: 'FastAPI', icon: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M4 3h12l-2 14H6L4 3z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M8 9h4l-1 5H9L8 9z" fill="currentColor" fillOpacity="0.4"/>
    </svg>
  )},
  { name: 'Python', icon: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2c-4 0-4 2-4 2v2h4v1H4s-3 0-3 4 2 4 2 4h2v-2s0-2 2-2h4s2 0 2-2V4s0-2-4-2zm-2 1.5a.75.75 0 110 1.5.75.75 0 010-1.5z" fill="currentColor" fillOpacity="0.7"/>
      <path d="M10 18c4 0 4-2 4-2v-2h-4v-1h6s3 0 3-4-2-4-2-4h-2v2s0 2-2 2h-4s-2 0-2 2v3s0 2 4 2zm2-1.5a.75.75 0 110-1.5.75.75 0 010 1.5z" fill="currentColor" fillOpacity="0.7"/>
    </svg>
  )},
  { name: 'Markdown', icon: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="1" y="4" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M4 13V7l3 3 3-3v6M14 13v-3l2 2 2-2v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )},
  { name: 'REST', icon: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M4 6h12M4 10h12M4 14h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="4" cy="6" r="1.5" fill="currentColor" fillOpacity="0.5"/>
      <circle cx="4" cy="10" r="1.5" fill="currentColor" fillOpacity="0.5"/>
      <circle cx="4" cy="14" r="1.5" fill="currentColor" fillOpacity="0.5"/>
    </svg>
  )},
]

export default function TechStackSection() {
  return (
    <section className="section tech-stack">
      <div className="container">
        <ScrollReveal>
          <h2 className="heading-ui tech-heading">
            Built on Infrastructure You Already Trust
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={1}>
          <div className="tech-row">
            {technologies.map((tech) => (
              <div key={tech.name} className="tech-badge glass-pill">
                <span className="tech-icon">{tech.icon}</span>
                <span className="tech-name">{tech.name}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
