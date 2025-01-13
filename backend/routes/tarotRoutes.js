const express = require('express');
const { 
  getAllTarotCards, 
  createReading, 
  getReadingCards, 
  getSpecificTarotCard, 
  storeReadingCard 
} = require('../models/tarot');
const axios = require('axios');
require('dotenv').config();

const router = express.Router();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// 환경 변수 확인 로그
if (!GEMINI_API_KEY) {
  console.error('GEMINI_API_KEY is not defined. Check your .env file.');
}

// 모든 Tarot 카드 조회
router.get('/tarot-cards', async (req, res) => {
  try {
    const cards = await getAllTarotCards();
    res.json(cards);
  } catch (error) {
    console.error('Error fetching tarot cards:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch tarot cards',
      error: error.message
    });
  }
});

// 새로운 Tarot 리딩 생성
router.post('/create-reading', async (req, res) => {
  const { userId, cardCount } = req.body;

  if (!userId || !cardCount || typeof userId !== 'number' || typeof cardCount !== 'number') {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid input. Please provide valid userId and cardCount.'
    });
  }

  try {
    const readingId = await createReading(userId, cardCount);
    res.json({ readingId });
  } catch (error) {
    console.error('Error creating tarot reading:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create tarot reading',
      error: error.message
    });
  }
});

// 특정 리딩의 카드 정보 가져오기
router.get('/reading/:id/cards', async (req, res) => {
  const { id } = req.params;

  try {
    const cards = await getReadingCards(id);

    if (cards.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: `No cards found for reading ID: ${id}`
      });
    }

    res.json(cards);
  } catch (error) {
    console.error('Error fetching reading cards:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch reading cards',
      error: error.message
    });
  }
});

// 특정 조건의 카드 가져오기
router.get('/specific-card', async (req, res) => {
  try {
    const card = await getSpecificTarotCard();

    if (!card) {
      return res.status(404).json({
        status: 'error',
        message: 'No card found for the given criteria.',
      });
    }

    res.json({
      status: 'success',
      card,
    });
  } catch (error) {
    console.error('Error fetching specific card:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch specific card.',
      error: error.message,
    });
  }
});

// 새로운 리딩 생성 및 Gemini API 호출
router.post('/generate-reading', async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required.' });
  }

  try {
    console.log('Step 1: Fetching specific tarot card...');
    const card = await getSpecificTarotCard();

    // 디버깅 로그 추가
    console.log('Fetched Card:', card);

    if (!card) {
      console.log('Step 2: No card found matching the criteria.');
      return res.status(404).json({ message: 'No card found for the criteria.' });
    }

    console.log('Step 3: Creating a new reading...');
    const readingId = await createReading(userId, 1);

    console.log('Step 4: Storing the selected card...');
    await storeReadingCard(readingId, card.id);

    console.log('Step 5: Preparing Gemini API payload...');
    const geminiPayload = {
      contents: [
        {
          parts: [
            {
              text: `당신은 타로 전문가이자 전문 작가입니다. 다음 타로 카드 정보를 기반으로, 오늘의 운세 메시지를 한국어로 작성해주세요. 메시지는 따뜻하고 희망적인 어조로 작성되어야 하며, 아래 형식으로 제공되어야 합니다.
    
    - **제목**: "오늘의 운세 카드: [카드 이름]"
    - **의미**: 카드의 주요 의미를 간결하고 긍정적으로 요약.
    - **메시지**: 오늘의 운세와 관련된 격려 메시지.
    
    [카드 정보]
    카드 이름: ${card.name}
    카드 의미: ${card.upright_meaning}
    
    이제 이 정보를 바탕으로 운세 메시지를 작성해주세요. 마지막에 어울리는 아이콘도 하나 추가 줄바꾸지 말고 바로 옆에에!`
            }
          ]
        }
      ]
    };

    console.log('Step 6: Sending Gemini API request...');
    try {
      const geminiResponse = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        geminiPayload,
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log('Step 7: Gemini API Response:', geminiResponse.data);

      res.json({
        status: 'success',
        readingId,
        card,
        geminiResponse: geminiResponse.data,
      });
    } catch (geminiError) {
      console.error('Step 6 Error: Gemini API Error:', geminiError.response?.data || geminiError.message);
      res.status(500).json({
        status: 'error',
        message: 'Gemini API call failed.',
        error: geminiError.message,
      });
    }
  } catch (error) {
    console.error('General Error:', error.message);
    res.status(500).json({ message: 'Failed to generate reading.' });
  }
});

module.exports = router;
