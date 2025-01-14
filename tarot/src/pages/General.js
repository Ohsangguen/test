// OneCardTarot.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './General.css';
import cardImage from '../components/card_image2.png';  // 카드 이미지 import
import TAROT_logo from '../components/TAROT.png';


const General = () => {

  const cardCount = 78; // 카드 수
  const radius = 800;   // 원의 반지름
  const cards = Array.from({ length: cardCount });

  const [startAnimation, setStartAnimation] = useState(false);
  const [isGathering, setIsGathering] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]); // 선택된 카드 상태 관리
  const navigate = useNavigate();

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
  
  const handleCardClick = (card) => {
    if (selectedCards.length < 4 && !selectedCards.includes(card)) {
      setSelectedCards([...selectedCards, card]);
    }
  };

  const handleRevealClick = () => {
    if (selectedCards.length === 4) {
      navigate('/generaldetail', { state: { selectedCards } });
    } else {
      console.warn('4장의 카드를 선택해주세요.');
    }
  };

  const handleTitleClick = () => {
    navigate('/');
  };

  return (
    <div id="tarot-screen" className="tarot-purple-general">
      <div className="black-overlay-general">
        <div className="main-title-left" onClick={handleTitleClick}>
          <img src={TAROT_logo} alt="TAROT Logo" className="main-title-text-left" />
        </div>

        <div className="header-options">
            <a href="tarotmeaning" className="option-text">타로란?</a>
            <a href="todayfortune" className="option-text">오늘의 운세</a>
            <a href="couple" className="option-text">커플 타로</a>
          </div>

        <div className="container-general">

          <div className="cards-container-general">

            <div className="cards-spread">
              {cards.map((_, index) => {
                const angle = (100 / cardCount) * index;
                // 각 카드에 대해 지연 시간을 계산
                const delay = index * 0.02;

                let wrapperStyle = {
                  position: 'absolute',
                  top: '120%',
                  left: '47%',
                  transition: 'transform 1s ease-out',
                  transitionDelay: `${delay}s`,
                  width: '120px',   // 카드 크기와 동일하게 설정
                  height: 'auto',
                  transform: 'translate(-50%, -50%)', // 기본 transform
                };

                if (isGathering) {
                  const gatherDelay = (cardCount - index) * 0.02;
                  wrapperStyle.transitionDelay = `${gatherDelay}s`;
                  wrapperStyle.transform = 'translate(-50%, -50%)';

                } else if (startAnimation) {
                  wrapperStyle.transform = `
                    rotate(${angle + 223}deg) 
                    translate(${radius}px)
                    rotate(90deg)
                  `;

                } else {
                  wrapperStyle.transform = 'translate(-50%, -50%)';
                }

                return (
                  <div 
                  key={index} 
                  style={wrapperStyle} 
                  className={`card-wrapper ${selectedCards.includes(index) ? 'selected' : ''}`}
                  onClick={() => handleCardClick(index)}  // 클릭 이벤트 할당
                >
                  <img 
                    src={cardImage} 
                    alt={`Tarot card ${index + 1}`} 
                    className="tarot-card-general"
                  />
                </div>
              );
            })}
          </div>

          <div className="selected-cards-container">
            {selectedCards.map((card, index) => (
              <div key={index} className="selected-card-general">
                <img 
                  src={cardImage} 
                  alt={`Selected Tarot card ${index + 1}`} 
                  className="tarot-card-general"
                />
              </div>
            ))}
          </div>

        {selectedCards.length === 4 && (
            <button
              className="reveal-btn-general"
              onClick={handleRevealClick}
            >
              카드 확인하기
            </button>
          )}
          </div>
          
        </div>
        </div>
        </div>
  );
};

export default General;
