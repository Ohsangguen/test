// OneCardTarot.jsx
import React from 'react';
import './Todayfortune.css';  // CSS 파일 import

const Todayfortune = () => {

  // const cardCount = 60; // 카드 수를 설정
  // const radius = 300; // 반지름 설정
  // const cards = Array.from({ length: cardCount });


  return (
    <div id="tarot-screen" className="tarot-purple-today">
      <div className="black-overlay-today">
        <div className="container-today">
          <a href="checkmain.html" className="header-today">
            <img src="https://ifh.cc/g/018lPq.png" alt="Tarot" />
          </a>

          <h2 className="instruction-text">카드를 골라주세요.</h2>

          <div className="cards-container-today"></div>

          <button id="reveal-button" className="selection-btn reveal-btn">
            카드 확인하기
          </button>

          <a href="tarot-meaning.html" className="circle tarot-meaning">
            <img src="https://ifh.cc/g/bgXtqd.png" alt="타로란" />
          </a>
          <a href="today-fortune.html" className="circle today-fortune">
            <img src="https://ifh.cc/g/TqQC50.png" alt="오늘의 운세" />
          </a>
          <a href="couple-tarot.html" className="circle couple-tarot">
            <img src="https://ifh.cc/g/NPR31l.png" alt="커플 궁합 타로" />
          </a>

          <div className="leftpattern-img">
            <img
              src="https://ifh.cc/g/n5Q1nw.png"
              alt="Left Pattern"
              className="pattern-img"
            />
          </div>

          <div className="rightpattern-img">
            <img
              src="https://ifh.cc/g/P23tkZ.png"
              alt="Right Pattern"
              className="pattern-img-r"
            />
          </div>

          <div className="rightline-img">
            <img
              src="https://ifh.cc/g/2aTXPo.png"
              alt="Right line"
              className="line-img"
            />
          </div>

          <div className="card-selection-container">
            <img
              src="카드-고르기.png"
              alt="카드 고르기"
              className="card-selection-img"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todayfortune;
