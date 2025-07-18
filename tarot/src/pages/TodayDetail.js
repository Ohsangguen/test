import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './TodayDetail.css';
import axios from 'axios';
import TAROT_logo from '../components/TAROT.png';
import sampleCardImage from '../components/card_image.png'; // 임의의 이미지 import

const TodayDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedCard } = location.state || {}; // Navigate로 전달된 상태 받기

  const [cardUrl, setCardUrl] = useState(''); // 카드 이미지 URL
  const [interpretation, setInterpretation] = useState(''); // 카드 해석 텍스트
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태

  useEffect(() => {
    // API를 통해 카드 정보 가져오기
    const fetchCardDetails = async () => {
      try {
        console.log('Fetching card details from API...');
        const response = await axios.get(`http://${process.env.REACT_APP_API_BASE_URL}/api/latest-today-ai-results`);
        console.log('API Response:', response.data);

        // 서버에서 반환된 데이터 확인 및 상태 업데이트
        if (response.data && response.data.status === 'success') {
          console.log('Response Data:', response.data);
          const cardUrl = response.data.cardUrls[0];
          const interpretation = response.data.aiResults[0];
          setCardUrl(cardUrl);
          setInterpretation(interpretation);
        } else {
          console.error('Invalid response structure:', response.data);
        }
      } catch (error) {
        console.error('Error fetching card details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    console.log('Selected card from location.state:', selectedCard);
    fetchCardDetails();
  }, [selectedCard]);

  const handleCardClick = () => {
    console.log('Card clicked, showing interpretation.');
  };

  const handleTitleClick = () => {
    navigate('/');
  };

  return (
    <div className="tarot-purple-todaydetail">
      <div className="black-overlay">

         <div className="main-title-left-general" onClick={handleTitleClick}>
            <img src={TAROT_logo} alt="TAROT Logo" className="main-title-text-left-general" />
          </div>
  
          <div className="header-options">
            <a href="tarotmeaning" className="option-text">타로란?</a>
            <a href="todayfortune" className="option-text">오늘의 운세</a>
            <a href="couple" className="option-text">커플 타로</a>
          </div>
        <div className="container-todaydetail">
          {isLoading ? (
            <p>Loading card details...</p>
          ) : (
            <>
              {/* 카드 */}
              <div className="card-todaydetail" onClick={handleCardClick}>
                <img
                  src={cardUrl}
                  alt="Selected Tarot card"
                  className="tarot-card-todaydetail"
                />
              </div>

              {/* 해석 텍스트 박스 */}
              <div className="interpretation-box-today">
                <div className="interpretation-box-in-today">
                  <img
                    src={cardUrl}
                    alt="Selected Tarot card"
                    className="tarot-card-todaydetail"
                  />
                  <p style={{ fontSize: '17px' }}>
                    {interpretation || '해석을 가져올 수 없습니다.'}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodayDetail;