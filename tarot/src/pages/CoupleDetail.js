import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import cardImage from '../components/card_image.png'; // 카드 이미지 import
import './CoupleDetail.css';
import axios from 'axios';
import TAROT_logo from '../components/TAROT.png';

const CoupleDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedCards } = location.state || { selectedCards: [] };
  const [aiResultsTotal, setAiResultsTotal] = useState([]); // 최근 8개의 AI 결과
  const [cardUrls, setCardUrls] = useState([]); // 최근 8개의 카드 URL
  const [selectedCardIndex, setSelectedCardIndex] = useState(null); // 현재 선택된 카드 인덱스

  // 최근 AI 결과와 카드 URL 가져오기
  useEffect(() => {
    const fetchAiResultsAndCardUrls = async () => {
      try {
        const response = await axios.get('http://${process.env.REACT_APP_API_BASE_URL}/api/latest-couple-ai-results');
        console.log('Fetched AI results and card URLs:', response.data);
        setAiResultsTotal(response.data.aiResults.reverse() || []); // 결과를 역순으로 저장
      } catch (error) {
        console.error('Error fetching AI results and card URLs:', error);
      }
    };
    fetchAiResultsAndCardUrls();
  }, []);
  const handleCardClick = (index) => {
    setSelectedCardIndex(index);
  };

  const handleTitleClick = () => {
    navigate('/');
  };

  return (
    <div className="tarot-purple">
      <div className="black-overlay">
        <div className="main-title-left-general" onClick={handleTitleClick}>
          <img src={TAROT_logo} alt="TAROT Logo" className="main-title-text-left-general" />
        </div>

        <div className="header-options">
          <a href="tarotmeaning" className="option-text">타로란?</a>
          <a href="todayfortune" className="option-text">오늘의 운세</a>
          <a href="couple" className="option-text">커플 타로</a>
        </div>
        <div className="container-coupledetail">
          {/* 왼쪽 해석 텍스트 박스 */}
          <div className="interpretation-box-coupleleft">
            {selectedCardIndex !== null && (
              <div className="interpretation-box-in-couple">
                <img
                  src={selectedCards[selectedCardIndex]?.card.image_url || 'https://via.placeholder.com/150'}
                  alt={`Selected Tarot card ${selectedCardIndex + 1}`}
                  className="tarot-card-coupledetail"
                />
                <p style={{ fontSize: '11px' }}>
                  <strong>카드 의미:</strong> {aiResultsTotal[selectedCardIndex] || 'AI 결과 없음'}
                </p>
              </div>
            )}
          </div>

          {/* 중앙 카드 배열 */}
          <div className="heart-zone">
            <div className="cards-spread-coupledetail">
              {selectedCards.map((card, index) => (
                <div 
                  key={index} 
                  className={`heart-placeholder ${
                    [2, 4, 6].includes(index) ? 'heart-placeholder-right' : 
                    [1, 3, 5].includes(index) ? 'heart-placeholder-left' : 
                    [0, 7].includes(index) ? 'heart-placeholder-center' : ''
                  }`}
                  style={{ zIndex: `${5 + index}` }}
                  onClick={() => handleCardClick(index)}
                >
                  <img
                    src={card.card.image_url || 'https://via.placeholder.com/150'}
                    alt={`Selected Tarot card ${index + 1}`}
                    className="tarot-card"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 오른쪽 해석 텍스트 박스 */}
          <div className="interpretation-box-coupleright">
            {selectedCardIndex !== null && (
              <div className="interpretation-box-in-couple">
                <img
                  src={selectedCards[selectedCardIndex]?.card.image_url || 'https://via.placeholder.com/150'}
                  alt={`Selected Tarot card ${selectedCardIndex + 1}`}
                  className="tarot-card-coupledetail"
                />
                <p style={{ fontSize: '11px' }}>
                  <strong>카드 의미:</strong> {aiResultsTotal[selectedCardIndex] || 'AI 결과 없음'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoupleDetail;