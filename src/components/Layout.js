import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home';
import Calendar from './Calendar';
import Progress from './Progress';
import Diet from './Diet';
import Wellness from './Wellness';
import Settings from './Settings';
import './Layout.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCalendarAlt, faChartLine, faUtensils, faHeart, faCog, faMoon } from '@fortawesome/free-solid-svg-icons';

const Layout = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const storedMode = localStorage.getItem('darkMode');
    return storedMode === 'enabled';
  });

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode ? 'enabled' : 'disabled');

    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="content-area">
          <Header />
          <MainContent />
          <Footer />
        </div>
        <div className="dark-mode-switch" onClick={toggleDarkMode}>
          <FontAwesomeIcon icon={faMoon} />
        </div>
      </div>
    </Router>
  );
};

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/"><FontAwesomeIcon icon={faHome} /> Home</Link>
      <Link to="/calendar"><FontAwesomeIcon icon={faCalendarAlt} /> Calendar</Link>
      <Link to="/progress"><FontAwesomeIcon icon={faChartLine} /> Progress</Link>
      <Link to="/diet"><FontAwesomeIcon icon={faUtensils} /> Diet</Link>
      <Link to="/wellness"><FontAwesomeIcon icon={faHeart} /> Wellness</Link>
      <Link to="/settings"><FontAwesomeIcon icon={faCog} /> Settings</Link>
    </div>
  );
};

const Header = () => {
  return (
    <header>
      <button className="logo">FitMate</button>
      <DaySelector />
    </header>
  );
};

const DaySelector = () => {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  return (
    <div className="day-selector">
      {days.map((day, index) => (
        <div className="day" key={index}>{day}</div>
      ))}
    </div>
  );
};

const MainContent = () => {
  return (
    <main>
      <div className="content-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/diet" element={<Diet />} />
          <Route path="/wellness" element={<Wellness />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </main>
  );
};

const Footer = () => {
  return (
    <footer>
      <div className="nav-icons">
        <Link to="/"><FontAwesomeIcon icon={faHome} /></Link>
        <Link to="/progress"><FontAwesomeIcon icon={faChartLine} /></Link>
        <Link to="/diet"><FontAwesomeIcon icon={faUtensils} /></Link>
        <Link to="/wellness"><FontAwesomeIcon icon={faHeart} /></Link>
        <Link to="/settings"><FontAwesomeIcon icon={faCog} /></Link>
      </div>
    </footer>
  );
};

export default Layout;