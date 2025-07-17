import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Todayfortune.css';
import axios from 'axios';
import cardImage from '../components/card_image2.png';  // 카드 이미지 import
import cardReveal from '../components/card_reveal.png';  // 카드 이미지 import
import today_logo from '../components/오늘의운세_logo.png';  // 카드 이미지 import
import tarotmeaning_logo from '../components/타로란_logo.png';  // 카드 이미지 import
import TAROT_logo from '../components/TAROT.png';
import TodayLoading from './TodayLoading'; // Loading 컴포넌트 import



const Todayfortune = () => {
  const navigate = useNavigate();

  const cardCount = 78;
  const radius = 250;
  const cards = Array.from({ length: cardCount });

  const [startAnimation, setStartAnimation] = useState(false);
  const [isGathering, setIsGathering] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [selectedCards, setSelectedCards] = useState([]); // 추가된 상태
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

  useEffect(() => {
    setStartAnimation(true);
  }, []);

  const fetchReading = async () => {
    try {
      console.log('Sending request to /api/generate-reading');
      const response = await axios.post('http://${process.env.REACT_APP_API_BASE_URL}/api/generate-reading', {
        userId: 1,
        themeIds: 0,
      });
      console.log('Fetched reading response:', response.data);
      const { cards, aiResultsTotal } = response.data; // 응답 데이터에서 필요한 값 가져오기
      setSelectedCards(cards);
      navigate('/todaydetail', { state: { selectedCards: response.data.cards, aiResultsTotal: response.data.aiResultsTotal } });
    } catch (error) {
      console.error('Error fetching reading:', error);
    }
  };

  const shuffleCards = () => {
    setIsGathering(true);
    setTimeout(() => {
      setIsGathering(false);
      setStartAnimation(true);
    }, 3000);
  };

  const handleCardClick = (index) => {
    console.log(`카드 ${index + 1} 클릭됨`);
    setSelectedCardIndex(index);
    fetchReading();
    // 선택된 카드 관련 로직이 필요한 경우 여기에 추가
  };

  const handleRevealClick = () => {
    


    if (selectedCards.length === 0) {
      console.warn('카드를 선택해주세요.');
      return;
    }
    console.log('Revealing cards:', selectedCards);
    setIsLoading(true); // 로딩 상태로 전환
    setTimeout(() => {
      navigate('/todaydetail', { state: { selectedCard: { id: selectedCardIndex } } });
    }, 10000); // 10초 후에 TodayDetail 페이지로 이동
    // navigate('/todaydetail', { state: { selectedCard: selectedCards[0] } });
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
          <div className="main-title-left-today" onClick={handleTitleClick}>
            <img src={TAROT_logo} alt="TAROT Logo" className="main-title-text-left-today" />
          </div>

          <div className="header-options">
            <a href="tarotmeaning" className="option-text">타로란?</a>
            <a href="fourcard" className="option-text">포카드 타로</a>
            <a href="couple" className="option-text">커플 타로</a>
          </div>

          {selectedCardIndex !== null && (
            <div className="selected-card-center">
              {isLoading ? (
                <p>Loading card details...</p>
              ) : (
                <img
                  src={cardReveal}
                  alt={`Selected Tarot card ${selectedCardIndex + 1}`}
                  className="large-tarot-card"
                  onClick={handleRevealClick}
                />
              )}
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
              const delay = index * 0.02;

              let wrapperStyle = {
                position: 'absolute',
                top: '50%',
                left: '46%',
                transition: 'transform 1s ease-out',
                transitionDelay: `${delay}s`,
                width: '120px',
                height: 'auto',
                transform: 'translate(25%, -50%)',
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
                  onClick={() => handleCardClick(index)}
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
