// OneCardTarot.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 가져오기
import './Todayfortune.css';
import cardImage from '../components/card_image2.png';  // 카드 이미지 import
import cardReveal from '../components/card_reveal.png';  // 카드 이미지 import
import today_logo from '../components/오늘의운세_logo.png';  // 카드 이미지 import
import tarotmeaning_logo from '../components/타로란_logo.png';  // 카드 이미지 import
import TAROT_logo from '../components/TAROT.png';
import TodayLoading from './TodayLoading'; // Loading 컴포넌트 import


const Todayfortune = () => {

  const navigate = useNavigate(); // useNavigate 훅 초기화

  const cardCount = 78; // 카드 수
  const radius = 250;   // 원의 반지름
  const cards = Array.from({ length: cardCount });

  const [startAnimation, setStartAnimation] = useState(false);
  const [isGathering, setIsGathering] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [showRevealButton, setShowRevealButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

  useEffect(() => {
    // 컴포넌트가 마운트되면 애니메이션 시작 상태로 변경
    setStartAnimation(true);
  }, []);

  const shuffleCards = () => {
    // 셔플 버튼 클릭 시: 먼저 모음 단계 시작
    setIsGathering(true);
    // 모음이 완료되면 펼침 상태로 전환
    setTimeout(() => {
      setIsGathering(false);
      setStartAnimation(true);
    }, 3000);
  };

  const handleCardClick = (index) => {
    console.log(`카드 ${index + 1} 클릭됨`);
    setSelectedCardIndex(index);
    setShowRevealButton(true);
  };

  const handleRevealClick = () => {
    setIsLoading(true); // 로딩 상태로 전환
    setTimeout(() => {
      navigate('/todaydetail', { state: { selectedCard: { id: selectedCardIndex } } });
    }, 10000); // 10초 후에 TodayDetail 페이지로 이동
  };



  const handleTitleClick = () => {
    navigate('/');
  };


  return (
    <div>
      {isLoading ? (
        <TodayLoading /> // 로딩 중일 때 Loading 컴포넌트 표시
      ) : (
    <div id="tarot-screen" className="tarot-purple-today">
      <div className="black-overlay-today">
        <div className="container-today">
          <div className="main-title-left" onClick={handleTitleClick}>
            <img src={TAROT_logo} alt="TAROT Logo" className="main-title-text-left" />
          </div>

          <div className="header-options">
            <a href="tarotmeaning" className="option-text">타로란?</a>
            <a href="fourcard" className="option-text">포카드 타로</a>
            <a href="couple" className="option-text">커플 타로</a>
          </div>
          {/* <a href="main" className="header-today">
            <img src="https://ifh.cc/g/018lPq.png" alt="Tarot" />
          </a> */}
          

          {selectedCardIndex !== null && (
            <div className="selected-card-center">

              {/* {showRevealButton && (
                <button 
                
                  id="reveal-button-today" 
                  src={cardReveal} 
                  className="selection-btn reveal-btn-today"
                  onClick={handleRevealClick}
                >
                  카드 확인하기
                </button>
              )} */}

              <img 
                src={cardReveal} 
                alt={`Selected Tarot card ${selectedCardIndex + 1}`} 
                className="large-tarot-card" 
                onClick={handleRevealClick}

              />
            </div>
          )}

          {/* <h2 className="instruction-text">카드를 골라주세요.</h2> */}

          <div className="cards-container-today"></div>

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

              <button onClick={shuffleCards} className="selection-btn shuffle-btn-today">
                셔플        
              </button>

            <div className="cards-spread-today">
              {cards.map((_, index) => {
                const angle = (280 / cardCount) * index;
                // 각 카드에 대해 지연 시간을 계산
                const delay = index * 0.02;

                let wrapperStyle = {
                  position: 'absolute',
                  top: '50%',
                  left: '46%',
                  transition: 'transform 1s ease-out',
                  transitionDelay: `${delay}s`,
                  width: '120px',   // 카드 크기와 동일하게 설정
                  height: 'auto',
                  transform: 'translate(25%, -50%)', // 기본 transform
                  cursor: 'pointer',
                };

                if (isGathering) {
                  const gatherDelay = (cardCount - index) * 0.02;
                  wrapperStyle.transitionDelay = `${gatherDelay}s`;
                  wrapperStyle.transform = 'translate(25%, -50%)';
                } else if (startAnimation) {
                  wrapperStyle.transform = `
                    rotate(${angle + 138}deg) 
                    translate(${radius}px)
                    rotate(80deg)
                  `;
                } else {
                  wrapperStyle.transform = 'translate(25%, -50%)';
                }

                return (
                  <div 
                    key={index} 
                    style={wrapperStyle} 
                    className="card-wrapper"
                    onClick={() => handleCardClick(index)}  // 클릭 이벤트 할당
                  >
                    <img 
                      src={cardImage} 
                      alt={`Tarot card ${index + 1}`} 
                      className="tarot-card"
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      </div>
      )}
    </div>
  );
};

export default Todayfortune;