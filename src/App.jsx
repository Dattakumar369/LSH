import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ContributionProvider } from './context/ContributionContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Tutorial from './pages/Tutorial';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import Contact from './pages/Contact';
import About from './pages/About';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <ContributionProvider>
        <Router basename="/coretocloud">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="tutorial/:topicId" element={<Tutorial />} />
              <Route path="privacy" element={<PrivacyPolicy />} />
              <Route path="terms" element={<Terms />} />
              <Route path="contact" element={<Contact />} />
              <Route path="about" element={<About />} />
            </Route>
          </Routes>
        </Router>
      </ContributionProvider>
    </AuthProvider>
  );
}

export default App;
