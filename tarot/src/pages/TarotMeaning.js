// TarotMeaning.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './TarotMeaning.css';
import today_logo from '../components/오늘의운세_logo.png';  
import tarotmeaning_logo from '../components/타로란_logo.png';  
import fourcard_logo from '../components/포카드_logo.png';  
import couple_logo from '../components/커플타로_logo.png';  
import TAROT_logo from '../components/TAROT.png';


const TarotMeaning = () => {

  const navigate = useNavigate();

  const handleTitleClick = () => {
    navigate('/');
  };

  
  return (
    <div className="tarot-purple-meaning ">
      <div className="black-overlay-meaning ">
        <div className="header-container-mean">
        <div className="main-title" onClick={handleTitleClick}>
            <img src={TAROT_logo} alt="TAROT Logo" className="main-title-text" />
          </div>
            <div className="header-options-mean">
                <a href="todayfortune" className="option-text-mean">오늘의 운세</a>
                <a href="fourcard" className="option-text-mean">포카드 타로</a>
                <a href="couple" className="option-text-mean">커플 타로</a>
            </div>
        </div>

        {/* Content Section */}
        <div className="content-container-cards">
            <div className="left-sidebar">
                <a href="tarotmeaning" className="sidebar-item active">타로란?</a>
                <a href="tarotcards" className="sidebar-item active">타로 카드 종류</a>
            </div>

          {/* Main Content */}
          <div className="main-content-mean">
            <h1>타로란?</h1>
            <p>
              타로(Tarot)는 <strong>78장의 카드</strong>로 이루어진 카드 세트로, 주로 점을 치거나 자기 성찰을 위한 도구로 사용됩니다.
            </p>
            <p>
              타로 카드는 크게 <strong>메이저 아르카나(Major Arcana)</strong>와 <strong>마이너 아르카나(Minor Arcana)</strong>로 나뉩니다.
            </p>
            <p>
              메이저 아르카나는 <em>중요한 인생의 사건과 주제</em>를 상징하고, 마이너 아르카나는 <em>일상적인 사건과 감정</em>을 나타냅니다.
            </p>

            <h1>타로의 역사</h1>
            <p>
              타로의 역사는 <strong>중세 유럽</strong>으로 거슬러 올라갑니다. 최초의 타로카드는 15세기 이탈리아에서 놀이 카드로 사용되었으며, 
              '타로키니(Tarocchini)' 혹은 '타로치(Tarocchi)'라는 이름으로 불렸습니다.
            </p>
            <p>
              이후 프랑스의 점성술사 장 밥티스트 알리에트(Jean-Baptiste Alliette)는 타로를 체계적으로 연구하고 해석하는 방식을 개발했습니다./n

            </p>

            <h2>Karost 제작자들</h2>
            <p>
              오상근, 김나혜, 윤성수, 서가은, 박지연, 황윤정
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};


export default TarotMeaning;
