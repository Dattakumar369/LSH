import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { ContributionProvider } from './context/ContributionContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Tutorial from './pages/Tutorial';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import Contact from './pages/Contact';
import About from './pages/About';
import Sitemap from './pages/Sitemap';
import { initGA } from './config/analytics';
import { usePageTracking } from './hooks/usePageTracking';
import './App.css';

// URL redirects mapping for old incorrect URLs to correct ones
const urlRedirects = {
  'servlet-architecture': 'servlet-introduction',
  'servlet-filter': 'filters-listeners',
  'servlet-listener': 'filters-listeners',
  'jdbc-architecture': 'jdbc-introduction'
};

// Component to initialize GA and track routes
function AppWithTracking() {
  // Initialize Google Analytics on mount
  useEffect(() => {
    initGA();
  }, []);

  // Handle redirects from 404.html
  useEffect(() => {
    // Check if we have a redirect path stored from 404.html
    if (typeof sessionStorage !== 'undefined') {
      const redirectPath = sessionStorage.getItem('redirectPath');
      if (redirectPath) {
        sessionStorage.removeItem('redirectPath');
        // Navigate to the stored path
        window.history.replaceState(null, null, redirectPath);
      }
    }
  }, []);

  // Track page views on route changes
  usePageTracking();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        {/* Redirect old incorrect URLs to correct ones */}
        <Route 
          path="tutorial/servlet-architecture" 
          element={<Navigate to="/tutorial/servlet-introduction" replace />} 
        />
        <Route 
          path="tutorial/servlet-filter" 
          element={<Navigate to="/tutorial/filters-listeners" replace />} 
        />
        <Route 
          path="tutorial/servlet-listener" 
          element={<Navigate to="/tutorial/filters-listeners" replace />} 
        />
        <Route 
          path="tutorial/jdbc-architecture" 
          element={<Navigate to="/tutorial/jdbc-introduction" replace />} 
        />
        <Route path="tutorial/:topicId" element={<Tutorial />} />
        <Route path="privacy" element={<PrivacyPolicy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<About />} />
        <Route path="sitemap.xml" element={<Sitemap />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <ContributionProvider>
        <Router basename="/">
          <AppWithTracking />
        </Router>
      </ContributionProvider>
    </AuthProvider>
  );
}

export default App;
