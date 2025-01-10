import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; 
import "./App.css";

import Main from './pages/Main';
import Tarot_meaning from './pages/Tarot_meaning';
import Todayfortune from './pages/Todayfortune';
import Fourcard from './pages/Fourcard';
import Couple from './pages/Couple';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/main">Main</Link>
          </li>
          <li>
            <Link to="/tarotmeaning">Tarot_meaning</Link>
          </li>
          <li>
            <Link to="/todayfortune">Todayfortune</Link>
          </li>
          <li>
            <Link to="/fourcard">Fourcard</Link>
          </li>
          <li>
            <Link to="/couple">Couple</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        
        <Route path="/main" element={<Main />} />
        <Route path="/tarotmeaning" element={<Tarot_meaning />} />
        <Route path="/todayfortune" element={<Todayfortune />} />
        <Route path="/fourcard" element={<Fourcard />} />
        <Route path="/couple" element={<Couple />} />
      </Routes>
    </Router>
  );
}

export default App;
