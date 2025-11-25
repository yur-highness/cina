import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Home from './Home';
import MovieDetail from './MovieDetail';
import BookingPage from './Booking';
import Tickets from './Tickets';
import AIChat from './AIChat';
import News from './News';

const Index = () => {
  return (
    <div>
        <Router>
      <div className="min-h-screen bg-brand-900 font-sans text-white">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/booking/:id" element={<BookingPage />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/ai-chat" element={<AIChat />} />
            <Route path="/news" element={<News />} />
          </Routes>
        </main>
        <footer className="bg-brand-900 border-t border-brand-800 py-8 mt-12">
          <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Cina. All rights reserved.</p>
            <p className="mt-2">Demonstration Project.</p>
          </div>
        </footer>
      </div>
    </Router>
    </div>
  )
}

export default Index