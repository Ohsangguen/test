import React from 'react';
import './Header.css';

const Header = ({ toggleSidebar }) => {
    return (
        <header className="header">
            <button className="sidebar-toggle" onClick={toggleSidebar}>
                ☰
            </button>
            <h1 className="header-title">My App</h1>
        </header>
    );
};

export default Header;
