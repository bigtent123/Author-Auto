import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Dashboard } from './pages/Dashboard';
import { SinglePrompt } from './pages/SinglePrompt';
import { GuidedWriting } from './pages/GuidedWriting';
import { Settings } from './pages/Settings';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/single-prompt" element={<SinglePrompt />} />
            <Route path="/guided-writing" element={<GuidedWriting />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}