import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './TodayDetail.css';
import axios from 'axios';

const TodayDetail = () => {
  const location = useLocation();
  const { selectedCard } = location.state || {}; // Navigate로 전달된 상태 받기

  const [cardUrl, setCardUrl] = useState(''); // 카드 이미지 URL
  const [interpretation, setInterpretation] = useState(''); // 카드 해석 텍스트
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태

  useEffect(() => {
    // API를 통해 카드 정보 가져오기
    const fetchCardDetails = async () => {
      try {
        console.log('Fetching card details from API...');
        const response = await axios.get(`http://localhost:5000/api/latest-today-ai-results`);
        console.log('API Response:', response.data);

        // 서버에서 반환된 데이터 확인 및 상태 업데이트
        if (response.data && response.data.cardUrls && response.data.aiResults) {
          setCardUrl(response.data.cardUrls[0] || '');
          setInterpretation(response.data.aiResults[0] || '해석을 가져올 수 없습니다.');
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

  const convertGoogleDriveUrl = (url) => {
    if (!url) return 'default_card_image_url'; // 기본 이미지 URL

    const fileIdMatch = url.match(/(?:file\/d\/|id=)([-\w]{25,})/);
    const fileId = fileIdMatch ? fileIdMatch[1] : null;

    return fileId
      ? `https://drive.google.com/uc?export=view&id=${fileId}`
      : 'default_card_image_url';
  };

  return (
    <div className="tarot-purple-todaydetail">
      <div className="black-overlay">
        <div className="container-todaydetail">
          {isLoading ? (
            <p>Loading card details...</p>
          ) : (
            <>
              {/* 카드 */}
              <div className="card-todaydetail" onClick={handleCardClick}>
                <img
                  src={convertGoogleDriveUrl(cardUrl)}
                  alt="Selected Tarot card"
                  className="tarot-card-todaydetail"
                />
              </div>

              {/* 해석 텍스트 박스 */}
              <div className="interpretation-box">
                <div className="interpretation-box-in">
                  <img
                    src={convertGoogleDriveUrl(cardUrl)}
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

