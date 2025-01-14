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
  
  const handleCardClick = (index) => {
    console.log(`카드 ${index + 1} 클릭됨`);

    if (selectedCards.length < 4) {
      const randomCard = cards[Math.floor(Math.random() * cardCount)];
      setSelectedCards([...selectedCards, randomCard]);
    }
  };

  const handleRevealClick = () => {
    if (selectedCards.length === 4) {
      navigate('/generaldetail', { state: { selectedCards } });
    } else {
      console.warn('4장의 카드를 선택해주세요.');
    }
  };

  return (
    <div id="tarot-screen" className="tarot-purple">
      <div className="black-overlay">
        <div className="container-general">
          

          {/* <h2 className="instruction-text">카드를 골라주세요.</h2> */}

          <div className="cards-container-general"></div>

            <button id="reveal-button" className="selection-btn reveal-btn" onClick={handleRevealClick}>
              카드 확인하기
            </button>

            <button onClick={shuffleCards} className="selection-btn shuffle-btn">
              셔플
            </button>

            <a href="tarotmeaning" className="circle tarot-meaning">
              <img src="https://ifh.cc/g/bgXtqd.png" alt="타로란" />
            </a>
            <a href="todayfortune" className="circle today-fortune">
              <img src="https://ifh.cc/g/TqQC50.png" alt="오늘의 운세" />
            </a>
            <a href="couple" className="circle couple-tarot">
              <img src="https://ifh.cc/g/NPR31l.png" alt="커플 궁합 타로" />
            </a>

            {/* <div className="rightline-img">
              <img
                src="https://ifh.cc/g/2aTXPo.png"
                alt="Right line"
                className="line-img"
              />
            </div>
            <div className="leftline-img">
              <img
                src="https://ifh.cc/g/2aTXPo.png"
                alt="left line"
                className="line-img"
              />
            </div> */}


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
          
        </div>
        </div>
        </div>
  );
};

export default General;
