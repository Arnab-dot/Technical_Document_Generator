import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import LandingPage from './components/landing/LandingPage'
import AppPage from './components/app/AppPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function Particles() {
  return (
    <div className="particles">
      {[1, 2, 3, 4, 5, 6].map(i => (
        <div key={i} className="particle" />
      ))}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="atmosphere" />
      <Particles />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<AppPage />} />
      </Routes>
    </BrowserRouter>
  )
}
