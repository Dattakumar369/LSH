import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Menu, X, ChevronDown, Plus, User, LogOut, BookOpen } from 'lucide-react';
import { courseStructure, getAllTopics } from '../data';
import { useAuth } from '../context/AuthContext';
import { useContributions } from '../context/ContributionContext';
import LoginModal from './LoginModal';
import ContributeModal from './ContributeModal';
import ConsentBanner from './ConsentBanner';
import AdSense from './AdSense';
import { ADSENSE_CONFIG } from '../config/adsense';
import { trackSearch, trackCourseSelect, trackButtonClick } from '../config/analytics';
import logoImage from '../assets/LSH.png';

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeCourse, setActiveCourse] = useState('corejava');
  const [searchQuery, setSearchQuery] = useState('');
  const [showContributeModal, setShowContributeModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [filteredTopics, setFilteredTopics] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const { user, isLoggedIn, openLoginModal, logout } = useAuth();
  const { getAllContributions } = useContributions();

  // Auto-detect active course based on current topic
  useEffect(() => {
    const currentPath = location.pathname;
    const allTopics = getAllTopics();
    const currentTopic = allTopics.find(t => currentPath.includes(t.id));
    
    if (currentTopic) {
      setActiveCourse(currentTopic.courseKey);
    }
  }, [location.pathname]);

  // Filter topics based on search
  useEffect(() => {
    if (searchQuery.trim()) {
      const allTopics = getAllTopics();
      const filtered = allTopics.filter(topic => 
        topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTopics(filtered);
      
      // Track search in Google Analytics (debounced)
      const timeoutId = setTimeout(() => {
        if (searchQuery.trim().length >= 3) {
          trackSearch(searchQuery.trim());
        }
      }, 1000);
      
      return () => clearTimeout(timeoutId);
    } else {
      setFilteredTopics([]);
    }
  }, [searchQuery]);

  const isTopicActive = (topicId) => {
    return location.pathname.includes(topicId);
  };

  const handleAddClick = () => {
    if (isLoggedIn()) {
      setShowContributeModal(true);
      trackButtonClick('add_tutorial', 'header');
    } else {
      openLoginModal();
      trackButtonClick('add_tutorial_login_required', 'header');
    }
  };

  const handleCourseSelect = (courseKey) => {
    setActiveCourse(courseKey);
    setSearchQuery('');
    
    // Navigate to the first topic of the selected course
    const course = courseStructure[courseKey];
    if (course) {
      const firstSection = Object.values(course.sections)[0];
      if (firstSection && firstSection.topics.length > 0) {
        const firstTopic = firstSection.topics[0];
        navigate(`/tutorial/${firstTopic.id}`);
      }
    }
  };

  // Get user contributions
  const userContributions = getAllContributions();

  // Get the active course data
  const currentCourse = courseStructure[activeCourse];

  // Get all topics for current course (flat list like W3Schools)
  const getCurrentCourseTopics = () => {
    if (!currentCourse) return [];
    const topics = [];
    Object.entries(currentCourse.sections).forEach(([sectionKey, section]) => {
      // Add section header
      topics.push({ type: 'section', title: section.title, key: sectionKey });
      // Add topics
      section.topics.forEach(topic => {
        topics.push({ type: 'topic', ...topic });
      });
    });
    return topics;
  };

  const courseTopics = getCurrentCourseTopics();

  return (
    <div className="app-layout">
      {/* Header */}
      <header className="header" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}>
        <div className="header-left">
          <button 
            className="mobile-menu-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          <Link to="/" className="logo">
            <img src={logoImage} alt="LearnStackHub Logo" className="logo-image" />
            <span>LearnStackHub</span>
          </Link>
        </div>

        <div className="header-right">
          <div className="header-search">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search tutorials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {/* Search Results Dropdown */}
            {filteredTopics.length > 0 && (
              <div className="search-results">
                {filteredTopics.slice(0, 8).map(topic => (
                  <Link
                    key={topic.id}
                    to={`/tutorial/${topic.id}`}
                    className="search-result-item"
                    onClick={() => setSearchQuery('')}
                  >
                    <BookOpen size={14} />
                    <div>
                      <span className="search-result-title">{topic.title}</span>
                      <span className="search-result-course">{topic.courseTitle}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <button 
            className="nav-add-btn" 
            onClick={handleAddClick}
          >
            <Plus size={16} />
            <span>Add Tutorial</span>
          </button>

          {/* User Menu */}
          {isLoggedIn() ? (
            <div className="user-menu-container">
              <button 
                className="user-menu-btn"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <div className="user-avatar">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <span className="user-name">{user?.name}</span>
                <ChevronDown size={14} />
              </button>

              {showUserMenu && (
                <div className="user-dropdown">
                  <div className="user-dropdown-header">
                    <strong>{user?.name}</strong>
                    <span>{user?.email}</span>
                  </div>
                  <div className="user-dropdown-divider" />
                  <button onClick={handleAddClick}>
                    <Plus size={16} />
                    Add Tutorial
                  </button>
                  <button onClick={() => { logout(); setShowUserMenu(false); }}>
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className="login-btn" onClick={openLoginModal}>
              <User size={18} />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Topics Navigation Bar - Shows main courses */}
      <nav className="main-topics-nav-bar">
        <div className="main-topics-container">
          {Object.entries(courseStructure).map(([courseKey, course]) => {
            const firstTopic = Object.values(course.sections)[0]?.topics[0];
            return (
              <Link
                key={courseKey}
                to={firstTopic ? `/tutorial/${firstTopic.id}` : '/'}
                className={`main-topic-link ${activeCourse === courseKey ? 'active' : ''}`}
                onClick={() => {
                  setActiveCourse(courseKey);
                  setSidebarOpen(false);
                }}
              >
                <span className="main-topic-icon">{course.icon}</span>
                <span className="main-topic-name">{course.title}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Sidebar - Toggleable on mobile */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        {/* Course Title Header */}
        <div className="sidebar-header" style={{ '--course-color': currentCourse?.color }}>
          <span className="sidebar-header-icon">{currentCourse?.icon}</span>
          <span className="sidebar-header-title">{currentCourse?.title} Tutorial</span>
        </div>

        {/* Topics List - Flat like W3Schools */}
        <nav className="sidebar-nav">
          {courseTopics.map((item, index) => (
            item.type === 'section' ? (
              <div key={item.key} className="sidebar-section-title">
                {item.title}
              </div>
            ) : (
              <Link
                key={item.id}
                to={`/tutorial/${item.id}`}
                className={`sidebar-link ${isTopicActive(item.id) ? 'active' : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                {item.title}
              </Link>
            )
          ))}
        </nav>

        {/* User Contributions */}
        {userContributions.length > 0 && (
          <div className="sidebar-contributions">
            <div className="sidebar-section-title">My Contributions</div>
            {userContributions.map(contrib => (
              <Link
                key={contrib.id}
                to={`/tutorial/${contrib.id}`}
                className={`sidebar-link ${isTopicActive(contrib.id) ? 'active' : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                {contrib.title}
                <span className="contrib-badge">
                  {contrib.type === 'added' ? 'New' : 'Edit'}
                </span>
              </Link>
            ))}
          </div>
        )}

        {/* Sidebar Ad */}
        <div className="sidebar-ad">
          <AdSense 
            adSlot={ADSENSE_CONFIG.adSlots.sidebar}
            adFormat="rectangle"
            className="sidebar-ad-unit"
            style={{ margin: '1rem' }}
          />
        </div>
      </aside>

      {/* Top Banner Ad */}
      <div className="top-banner-ad">
        <AdSense 
          adSlot={ADSENSE_CONFIG.adSlots.topBanner}
          adFormat="horizontal"
          className="banner-ad-unit"
          style={{ margin: '1rem auto', maxWidth: '728px' }}
        />
      </div>

      {/* Main Content */}
      <main className="main-content">
        <Outlet />
      </main>

      {/* Bottom Banner Ad */}
      <div className="bottom-banner-ad">
        <AdSense 
          adSlot={ADSENSE_CONFIG.adSlots.bottomBanner}
          adFormat="horizontal"
          className="banner-ad-unit"
          style={{ margin: '1rem auto', maxWidth: '728px' }}
        />
      </div>


      {/* Click outside to close user menu */}
      {showUserMenu && (
        <div 
          className="menu-overlay"
          onClick={() => setShowUserMenu(false)}
        />
      )}

      {/* Click outside to close search */}
      {filteredTopics.length > 0 && (
        <div 
          className="search-overlay"
          onClick={() => setSearchQuery('')}
        />
      )}

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-section footer-brand">
            <h3>LearnStackHub</h3>
            <p>Your complete journey from Core Java to Cloud-Ready Full-Stack Development</p>
          </div>
          
          <div className="footer-section footer-learn">
            <h4>Learn</h4>
            <div className="footer-topics-grid">
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/tutorial/html-introduction">HTML</Link></li>
                <li><Link to="/tutorial/css-introduction">CSS</Link></li>
                <li><Link to="/tutorial/java-introduction">Core Java</Link></li>
                <li><Link to="/tutorial/mysql-introduction">MySQL</Link></li>
                <li><Link to="/tutorial/jdbc-introduction">JDBC</Link></li>
              </ul>
              <ul>
                <li><Link to="/tutorial/servlet-introduction">Servlets</Link></li>
                <li><Link to="/tutorial/jsp-introduction">JSP</Link></li>
                <li><Link to="/tutorial/hibernate-introduction">Hibernate</Link></li>
                <li><Link to="/tutorial/git-introduction">Git & GitHub</Link></li>
                <li><Link to="/tutorial/maven-introduction">Maven</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} LearnStackHub. All rights reserved.</p>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Made with ☁️ for developers worldwide
          </p>
        </div>
      </footer>

      {/* Modals */}
      <LoginModal />
      <ContributeModal 
        isOpen={showContributeModal}
        onClose={() => setShowContributeModal(false)}
        mode="add"
      />
      
      {/* Consent Banner */}
      <ConsentBanner />
    </div>
  );
}

export default Layout;
