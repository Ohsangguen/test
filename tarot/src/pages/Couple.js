import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Couple.css';
import { cards, shuffleCards } from './card-shuffle.js'; 
import TAROT_logo from '../components/TAROT.png';
import coupleneob from '../components/커플 타로 넙죽이/커플 넙죽이(주파수).png';
import tarot_card_back from '../components/card_image2.png';
import CoupleLoading from './CoupleLoading';



const Couple = () => {
  // const [cards, setCards] = useState(shuffleCards());
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState(null);
  const [placedCards, setPlacedCards] = useState(Array(8).fill(null)); // 8개의 드롭존 상태 관리
  const [highlightedZones, setHighlightedZones] = useState(Array(8).fill(false)); // 드롭존 강조 상태 관리
  const [allCardsPlaced, setAllCardsPlaced] = useState(false); // 모든 카드가 드롭되었는지 상태 관리
  const [isGathering, setIsGathering] = useState(false); // 카드 모음 상태 관리
  const [startAnimation, setStartAnimation] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

  const cardCount = 78; // 카드 수
  const radius = 800;   // 원의 반지름
  // const cards = Array.from({ length: cardCount });

  const [cards] = useState(Array.from({ length: cardCount }, (_, index) => ({
    id: index,
    back: tarot_card_back,
  })));


    // useEffect(() => {
    //   // 모든 드롭존에 카드가 드롭되었는지 확인
    //   setAllCardsPlaced(placedCards.every(card => card !== null));
    // }, [placedCards]);

    useEffect(() => {
      // 모든 드롭존에 카드가 드롭되었는지 확인
      setAllCardsPlaced(placedCards.every(card => card !== null));
      if (placedCards.every(card => card !== null)) {
        // 모든 카드가 드롭되었을 때 드롭존의 카드 그림자 색을 빨간색으로 반짝이게 설정
        setHighlightedZones(Array(8).fill(true));
    }
  }, [placedCards]);

    useEffect(() => {
    // 컴포넌트가 마운트되면 애니메이션 시작 상태로 변경
    setStartAnimation(true);
  }, []);

    // 드래그 시작 이벤트
    const handleDragStart = (e, card) => {
      e.dataTransfer.setData('card', JSON.stringify(card));
    };

    // 드래그 오버 이벤트
    const handleDragOver = (e) => {
        e.preventDefault();
    };
  
    // 드롭 이벤트
    const handleDrop = (e, index) => {
        e.preventDefault();
        const cardData = e.dataTransfer.getData('card');
        if (cardData) {
            const card = JSON.parse(cardData);
            const updatedCards = [...placedCards];
            updatedCards[index] = { ...card, index }; // 카드와 인덱스를 함께 저장
            console.log(updatedCards);
            setPlacedCards(updatedCards);

            // 드롭 후 테두리 비활성화
            const updatedZones = [...highlightedZones];
            updatedZones[index] = false;
            setHighlightedZones(updatedZones);
        }
    };
  
    // 카드 확인 버튼 클릭
    const handleReveal = () => {
      if (!allCardsPlaced) {
        alert('모든 카드를 드롭 영역에 놓아야 합니다.');
      } else {
        setIsLoading(true); // 로딩 상태로 전환
        setTimeout(() => {
        navigate('/coupledetail', { state: { selectedCards: placedCards } });
        }, 10000); // 10초 후에 CoupleDetail 페이지로 이동
      }
    };

    const shuffleCards = () => {
      // 셔플 버튼 클릭 시: 먼저 모음 단계 시작
      setIsGathering(true);
      // 모음이 완료되면 펼침 상태로 전환
      setTimeout(() => {
        setIsGathering(false);
        setStartAnimation(true);
      }, 3000);
    };

    const handleTitleClick = () => {
      navigate('/');
    };

    return (
      <div>
      {isLoading ? (
        <CoupleLoading /> // 로딩 중일 때 Loading 컴포넌트 표시
      ) : (
      <div className="tarot-purple-couple">
        <div className="black-overlay-couple">
        <div className="header-options">
            <a href="tarotmeaning" className="option-text">타로란?</a>
            <a href="todayfortune" className="option-text">오늘의 운세</a>
            <a href="fourcard" className="option-text">포카드 타로</a>
          </div>
          <div className="main-title-left" onClick={handleTitleClick}>
            <img src={TAROT_logo} alt="TAROT Logo" className="main-title-text-left" />
          </div>

          

          <div className="container-couple">
              <div className="cards-spread-couple">
                {cards.map((card, index) => {
                  const angle = (100 / (cardCount - 1)) * index - 3; // 각 카드의 각도 계산
                  const x = radius * Math.cos((angle * Math.PI) / 180); // x 좌표 계산
                  const y = radius * Math.sin((angle * Math.PI) / 180); // y 좌표 계산
                  const delay = index * 0.02;

                  let wrapperStyle = {
                    position: 'absolute',
                    left: '45%',
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
                      className={`card-wrapper ${selectedCard === card ? 'selected' : ''}`}
                      onClick={() => setSelectedCard(card)}  // 클릭 이벤트 할당
                      draggable
                      onDragStart={(e) => handleDragStart(e, card)}
                    >
                      <img 
                        src={tarot_card_back  } 
                        alt={`Tarot card ${index + 1}`} 
                        className="tarot-card-couple"
                      />
                    </div>
                  );
                })}
              </div>


                {/* 드롭존 */}
                <div className="heart-drop-zone">
                {placedCards.map((card, index) => (
                  <div
                    key={index}
                    className={`heart-placeholder ${highlightedZones[index] ? 'highlighted' : ''} ${[2, 4, 6].includes(index) ? 'heart-placeholder-right' : ''}${[1, 3, 5].includes(index) ? 'heart-placeholder-left' : ''}`}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, index)}
                  >
                    {card ? (
                      <div className="card-drop" style={{ backgroundImage: `url(${tarot_card_back})`, backgroundColor: allCardsPlaced ? 'rgba(255, 240, 240, 0.54)' : '#ccc' }} />
                    ) : (
                      <div className="drop-placeholder">카드가져오기</div>
                    )}
                  </div>
                ))}
                </div>

                {/* 버튼 */}
                {allCardsPlaced && (
                    <button
                        id="reveal-button-couple"
                        className="reveal-btn-couple"
                        onClick={handleReveal}
                    >
                        카드 확인하기
                    </button>
                )}
          </div>
        </div>
      </div>
       )}
    </div>
    );
};

export default Couple;
