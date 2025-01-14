import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './pages/Header';
import Sidebar from './pages/Sidebar';
import Login from './pages/Login';
import Mypage from './pages/Mypage';
import Loding from './pages/Loding';

import Main from './pages/Main';
import TarotMeaning from './pages/TarotMeaning';
import TarotCards from './pages/TarotCards';

import Todayfortune from './pages/Todayfortune';
import TodayDetail from './pages/TodayDetail';

import Fourcard from './pages/Fourcard';
import General from './pages/General';
import Love from './pages/Love';
import Money from './pages/Money';
import GeneralDetail from './pages/GeneralDetail';

import Couple from './pages/Couple';
import CoupleDetail from './pages/CoupleDetail';

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
              {/* 기본 경로 */}
              <Route path="/" element={<Main />} />

              {/* 로그인 및 마이페이지 */}
              <Route path="/login" element={<Login />} />
              <Route path="/mypage" element={<Mypage />} />
              <Route path="/loding" element={<Loding />} />
              
              {/* 타로 관련 경로 */}
              <Route path="/tarotmeaning" element={<TarotMeaning />} />
              <Route path="/tarotcards" element={<TarotCards />} />

              {/* 오늘의 운세 */}
              <Route path="/todayfortune" element={<Todayfortune />} />
              <Route path="/todaydetail" element={<TodayDetail />} />

              {/* 포카드 타로 */}
              <Route path="/fourcard" element={<Fourcard />} />
              <Route path="/general" element={<General />} />
              <Route path="/love" element={<Love />} />
              <Route path="/money" element={<Money />} />
              <Route path="/generaldetail" element={<GeneralDetail />} />

              {/* 커플 타로 */}
              <Route path="/couple" element={<Couple />} />
              <Route path="/coupledetail" element={<CoupleDetail />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}
export default App;