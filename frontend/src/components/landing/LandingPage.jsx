import Navbar from './Navbar'
import HeroSection from './HeroSection'
import HowItWorksSection from './HowItWorksSection'
import FeatureHighlightsSection from './FeatureHighlightsSection'
import LiveDemoSection from './LiveDemoSection'
import TechStackSection from './TechStackSection'
import FinalCTASection from './FinalCTASection'
import Footer from '../shared/Footer'

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <FeatureHighlightsSection />
        <LiveDemoSection />
        <TechStackSection />
        <FinalCTASection />
      </main>
      <Footer />
    </>
  )
}
