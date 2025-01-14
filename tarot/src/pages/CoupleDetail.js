import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import cardImage from '../components/card_image.png'; // 카드 이미지 import
import './CoupleDetail.css';

const CoupleDetail = () => {

    const location = useLocation();
    // const { selectedCards } = location.state || { selectedCards: [] };
    const selectedCards = location.state?.selectedCards || []; // 기본값 설정

    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
    

    const handleCardClick = (index) => {
        setSelectedCardIndex(index);
    };

    return (
        <div className="tarot-purple">
          <div className="black-overlay">
            <div className="container-coupledetail">
              {/* <h1>카드 해석 결과</h1> */}
              
    
              {/* 해석 텍스트 박스 */}
              <div className="interpretation-box-coupleleft">
                {selectedCardIndex !== null && (
                  <div className="interpretation-box-in">
                    <img
                      src={cardImage}
                      alt={`Selected Tarot card ${selectedCardIndex + 1}`}
                      className="tarot-card-coupledetail"
                    />
                    <p>이 카드의 해석은 ...</p>
                  </div>
                )}
              </div>

              <div className="heart-zone">
                <div className="cards-spread-coupledetail">
                    {selectedCards.map((cardIndex, index) => (
                    <div 
                        key={index} 
                        className={`heart-placeholder ${[2, 4, 6].includes(index) ? 'heart-placeholder-right' : ''}${[1, 3, 5].includes(index) ? 'heart-placeholder-left' : ''}`}
                        style={{
                        zIndex: `${5 + index}`,
                        }}
                        onClick={() => handleCardClick(index)}
        
                    >
                        <img
                        src={cardImage}
                        alt={`Selected Tarot card ${index + 1}`}
                        className="tarot-card"
                        />
                    </div>
                    ))}
                </div>
            </div>

              <div className="interpretation-box-coupleright">
                {selectedCardIndex !== null && (
                  <div className="interpretation-box-in">
                    <img
                      src={cardImage}
                      alt={`Selected Tarot card ${selectedCardIndex + 1}`}
                      className="tarot-card-coupledetail"
                    />
                    <p>이 카드의 해석은 ...</p>
                  </div>
                )}
              </div>


            </div>
          </div>
        </div>
      );
    };


export default CoupleDetail;
