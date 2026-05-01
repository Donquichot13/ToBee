import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Matrix from './pages/Matrix'
import Solutions from './pages/Solutions'
import Prevention from './pages/Prevention'
import Dashboard from './pages/Dashboard'
import Contact from './pages/Contact'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 relative z-[2]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/matrice" element={<Matrix />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/prevoyance" element={<Prevention />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
