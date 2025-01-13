import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Couple.css';
import { cards, shuffleCards } from './card-shuffle.js'; 
import TAROT_logo from '../components/TAROT.png';
import coupleneob from '../components/커플 타로 넙죽이/커플 넙죽이(주파수).png';


const Couple = () => {
  const [cards, setCards] = useState(shuffleCards());
  const [selectedCard, setSelectedCard] = useState(null);
  const [placedCards, setPlacedCards] = useState(Array(8).fill(null)); // 8개의 드롭존 상태 관리
  const [highlightedZones, setHighlightedZones] = useState(Array(8).fill(false)); // 드롭존 강조 상태 관리
  const [allCardsPlaced, setAllCardsPlaced] = useState(false); // 모든 카드가 드롭되었는지 상태 관리
  const navigate = useNavigate();


    useEffect(() => {
      // 모든 드롭존에 카드가 드롭되었는지 확인
      setAllCardsPlaced(placedCards.every(card => card !== null));
    }, [placedCards]);

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
        navigate('/coupledetail', { state: { selectedCards: placedCards } });
      }
    };

    return (
      <div className="tarot-purple-couple">
        <div className="black-overlay">
          <div className="container-couple">
            <h2 className="instruction-text">카드를 비어있는 공간에 가져오세요.</h2>

                {/* 카드 78장을 상단에 한 줄로 겹쳐서 배치 */}
                <div className="cards-spread-container">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="card spread-card"
                        style={{
                            backgroundImage: `url(${card.back})`,
                            left: `${index * 10}px`,  // 카드 겹침 효과
                        }}
                        draggable
                        onDragStart={(e) => handleDragStart(e, card)}                        
                    />
                ))}
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
                                    <div className="card-drop" style={{ backgroundImage: `url(${card.image})`, backgroundColor: allCardsPlaced ? 'rgb(249, 133, 133)' : '#ccc' }} />

                                    // <div className="card-drop" style={{ backgroundImage: `url(${card.image})` }} />
                                ) : (
                                    <div className="drop-placeholder">카드가져오기</div>
                                )}
                            </div>
                        ))}
                    </div>

                {/* 버튼 */}
                {allCardsPlaced && (
                    <button
                        id="reveal-button"
                        className="reveal-btn-couple"
                        onClick={handleReveal}
                    >
                        카드 확인하기
                    </button>
                )}

                {/* 하단 링크들 */}
                <a href="/tarotmeaning" className="circle tarot-meaning">
                <img src="https://ifh.cc/g/bgXtqd.png" alt="타로란" />
                </a>
                <a href="/todayfortune" className="circle today-fortune">
                <img src="https://ifh.cc/g/TqQC50.png" alt="오늘의-운세" />
                </a>
                <a href="/couple" className="circle couple-tarot">
                <img src="https://ifh.cc/g/NPR31l.png" alt="커플-궁합-타로" />
                </a>
          </div>
        </div>
      </div>
    );
};

export default Couple;
