import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './pages/Header';
import Sidebar from './pages/Sidebar';
import Login from './pages/Login';
import Mypage from './pages/Mypage';

import Main from './pages/Main';
import TarotMeaning from './pages/TarotMeaning';
import Todayfortune from './pages/Todayfortune';
import Fourcard from './pages/Fourcard';
import Couple from './pages/Couple';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // 사이드바 상태 관리

  // 사이드바 열기/닫기 함수
  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
    console.log("bar click");
  };

  return (
    <Router>
      <div className="app">
        {/* Header */}
        <Header toggleSidebar={toggleSidebar} />

        <div className="mainBody">
          {/* Sidebar */}
          <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <div
            className={`overlay ${isSidebarOpen ? "open" : ""}`}
            onClick={toggleSidebar}
          ></div>

          <div className="main-content">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/mypage" element={<Mypage />} />
              <Route path="/main" element={<Main />} />
              <Route path="/todayfortune" element={<Todayfortune />} />
              <Route path="/tarotmeaning" element={<TarotMeaning />} />
              <Route path="/fourcard" element={<Fourcard />} />
              <Route path="/couple" element={<Couple />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;