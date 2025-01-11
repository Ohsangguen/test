// src/pages/Sidebar/Sidebar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const location = useLocation();

  return (
    <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
      <div className="sidebar-content">
        <ul>
          <li className={location.pathname === '/main' ? 'active' : ''}>
            <Link to="/main" onClick={toggleSidebar}>Main</Link>
          </li>
          <li className={location.pathname === '/login' ? 'active' : ''}>
            <Link to="/login" onClick={toggleSidebar}>Login</Link>
          </li>
          <li className={location.pathname === '/mypage' ? 'active' : ''}>
            <Link to="/mypage" onClick={toggleSidebar}>Mypage</Link>
          </li>
          <li className={location.pathname === '/tarotmeaning' ? 'active' : ''}>
            <Link to="/tarotmeaning" onClick={toggleSidebar}>Tarotmeaning</Link>
          </li>
          <li className={location.pathname === '/todayfortune' ? 'active' : ''}>
            <Link to="/todayfortune" onClick={toggleSidebar}>Todayfortune</Link>
          </li>
          <li className={location.pathname === '/fourcard' ? 'active' : ''}>
            <Link to="/fourcard" onClick={toggleSidebar}>Fourcard</Link>
          </li>
          <li className={location.pathname === '/couple' ? 'active' : ''}>
            <Link to="/couple" onClick={toggleSidebar}>Couple</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;