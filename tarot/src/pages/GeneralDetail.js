import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './GeneralDetail.css';
import axios from 'axios';
import TAROT_logo from '../components/TAROT.png';

const GeneralDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedCards = location.state?.selectedCards || []; // 기본값 설정

  // 수정된 부분!
  const [aiResultsTotal, setAiResultsTotal] = useState([]); // 최근 4개의 AI 결과
  const [cardUrls, setCardUrls] = useState([]); // 최근 4개의 카드 URL
  const [selectedCardIndex, setSelectedCardIndex] = useState(null); // 현재 선택된 카드 인덱스
  const [isDataReady, setIsDataReady] = useState(false); // 데이터 준비 상태 추가

  useEffect(() => {
    console.log('selectedCards:', selectedCards);
    selectedCards.forEach((card, index) => {
      console.log(`Card ${index}:`, card);
    });
  }, [selectedCards]);

  const convertGoogleDriveUrl = (url) => {
    try {
      console.log('Original URL:', url);
      if (url.includes('https://drive.google.com/uc?export=view&id=')) {
        console.log('Already converted URL:', url);
        return url;
      }
      const match = url.match(/\/file\/d\/([^/]+)\//);
      if (match && match[1]) {
        const convertedUrl = `https://drive.google.com/uc?export=view&id=${match[1]}`;
        console.log('Converted URL:', convertedUrl);
        return convertedUrl;
      }
      console.error('잘못된 Google Drive URL:', url);
      return url; 
    } catch (error) {
      console.error('Google Drive URL 변환 중 오류:', error);
      return url;
    }
  };

  useEffect(() => {
    console.log('cardUrls:', cardUrls);
  }, [cardUrls]);

  const handleCardClick = (index) => {
    console.log(`Clicked card index: ${index}`);
    setSelectedCardIndex(index);
  };

  const handleTitleClick = () => {
    navigate('/');
  };

  useEffect(() => {
    const fetchAiResultsAndCardUrls = async () => {
      try {
        let attempts = 0;
        const maxAttempts = 5;
        let response;

        while (attempts < maxAttempts) {
          response = await axios.get('http://${process.env.REACT_APP_API_BASE_URL}/api/latest-ai-results');
          console.log('Fetched AI results and card URLs:', response.data);

          if (response.data.aiResults.length >= 4 && response.data.cardUrls.length >= 4) {
            break;
          }

          console.log(`Attempt ${attempts + 1}: 데이터 부족 -> 재시도 중...`);
          await new Promise(resolve => setTimeout(resolve, 1000));
          attempts++;
        }

        setAiResultsTotal(response.data.aiResults.reverse() || []);
        const convertedUrls = response.data.cardUrls.reverse().map(url => convertGoogleDriveUrl(url));
        setCardUrls(convertedUrls);
        setIsDataReady(true);
      } catch (error) {
        console.error('Error fetching AI results and card URLs:', error);
        setIsDataReady(true);
      }
    };

    fetchAiResultsAndCardUrls();
  }, []);

  return (
    <div className="tarot-purple">
      <div className="black-overlay">
        <div className="main-title-left-general" onClick={handleTitleClick}>
          <img src={TAROT_logo} alt="TAROT Logo" className="main-title-text-left-general" />
        </div>

        {isDataReady ? (
          <div className="container-generaldetail">
            <div className="cards-spread-generaldetail">
              {selectedCards.map((card, index) => (
                <div
                  key={index}
                  className={`selected-card-generaldetail ${selectedCardIndex === index ? 'active' : ''}`}
                  style={{
                    zIndex: `${5 + index}`,
                  }}
                  onClick={() => handleCardClick(index)}
                >
                  <img
                    src={cardUrls[index]}
                    alt={`Selected Tarot card ${index + 1}`}
                    className="tarot-card"
                  />
                </div>
              ))}
            </div>

            <div className="interpretation-box-general">
              {selectedCardIndex !== null && (
                <div className="interpretation-box-in-general">
                  <img
                    src={cardUrls[selectedCardIndex]}
                    alt={`Selected Tarot card ${selectedCardIndex + 1}`}
                    className="tarot-card-generaldetail"
                  />
                  <p style={{ fontSize: '17px' }}>
                    <strong></strong> {selectedCards[selectedCardIndex]?.name}
                  </p>
                  <p style={{ fontSize: '17px' }}>
                    <strong>카드 의미:</strong> {aiResultsTotal[selectedCardIndex] || 'AI 결과 없음'}
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="loading-indicator">데이터를 불러오는 중입니다...</div>
        )}
      </div>
    </div>
  );
};

export default GeneralDetail;
