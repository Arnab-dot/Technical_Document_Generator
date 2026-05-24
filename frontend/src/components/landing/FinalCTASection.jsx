import { Link } from 'react-router-dom'
import ScrollReveal from '../shared/ScrollReveal'
import './FinalCTASection.css'

export default function FinalCTASection() {
  return (
    <section className="section final-cta">
      {/* Intense background blobs */}
      <div className="cta-blob cta-blob-teal" />
      <div className="cta-blob cta-blob-blue" />

      <div className="container">
        <ScrollReveal>
          <div className="cta-card">
            <div className="cta-card-inner glass-panel">
              <h2 className="heading-display cta-headline">
                Stop Writing Docs.
                <br />
                Start Shipping.
              </h2>
              <p className="body-text cta-subtext">
                Your engineers' time is worth more than copy-pasting comments into Confluence.
              </p>
              <div className="cta-buttons">
                <Link to="/app" className="btn btn-primary btn-large">
                  Start Generating — It's Free
                </Link>
                <a href="#how-it-works" className="btn btn-ghost">
                  Read the Docs
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
