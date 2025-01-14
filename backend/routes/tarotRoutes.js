const express = require('express');
const { 
  getAllTarotCards, 
  createReading, 
  getReadingCards, 
  getSpecificTarotCard, 
  storeReadingCard,
  getCardsByThemeAndPosition,
} = require('../models/tarot');
const axios = require('axios');
require('dotenv').config();

const router = express.Router();
const { executeQuery } = require('../db'); // executeQuery 가져오기
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// 환경 변수 확인 로그
if (!GEMINI_API_KEY) {
  console.error('GEMINI_API_KEY is not defined. Check your .env file.');
}

const themeMapping = {
  one_general: 0,
  general: 1,
  money: 3,
  love: 2,
  couple:4,
};

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

router.post('/generate-multi-reading', async (req, res) => {
  const { userId, themeIds } = req.body;

  // 요청 데이터 검증
  if (!userId || typeof themeIds !== 'number') {
    return res.status(400).json({ message: 'Invalid input. User ID and a single theme ID are required.' });
  }

  // themeIds가 1인 경우 에러 반환
  if (![1, 2, 3].includes(themeIds)) {
    console.log(`Redirecting request for themeIds: ${themeIds} to /generate-couple-reading`);
    return res.redirect(307, '/api/generate-couple-reading'); // Temporary redirect with the same POST method
  }

  try {
    console.log('Step 1: Creating new reading...');
    const readingId = await createReading(userId, 4); // 각 테마마다 4장씩

    const positions = ['past', 'present', 'future', 'disturb'];
    const cardData = [];

    const themeName = Object.keys(themeMapping).find((key) => themeMapping[key] === themeIds);

    if (!themeName) {
      return res.status(400).json({ message: `Invalid theme ID: ${themeIds}` });
    }

    console.log(`Processing theme: ${themeName}`);
    for (const position of positions) {
      const card = await getCardsByThemeAndPosition(themeIds, position);

      if (card) {
        console.log(`Selected card for theme: ${themeName}, position: ${position}`, card);
        await storeReadingCard(readingId, card.id);
        cardData.push({ theme: themeName, position, card });
      } else {
        console.log(`No card found for theme: ${themeName}, position: ${position}`);
      }
    }

    console.log('Step 2: Preparing AI payload...');
    const aiPayload = cardData.map(({ theme, position, card }) => ({
      parts: [
        {
          text: `당신은 타로 전문가이자 전문 작가입니다. 다음 타로 카드 정보를 기반으로 테마 "${theme}"의 "${position}" 위치에 해당하는 메시지를 작성해주세요.
          - **카드 이름**: ${card.name}
          - **카드 의미**: ${card.upright_meaning}
          메시지는 따뜻하고 희망적인 어조로 작성되어야 하며, 어울리는 아이콘을 추가하세요.`,
        },
      ],
    }));

    console.log('Step 3: Sending AI requests...');
    const aiResponses = [];
    for (const payload of aiPayload) {
      try {
        const aiResponse = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
          { contents: [payload] },
          { headers: { 'Content-Type': 'application/json' } }
        );

        const geminiContent = aiResponse.data.candidates[0]?.content?.parts[0]?.text || 'Default analysis result';
        aiResponses.push(geminiContent);

        await executeQuery(
          `INSERT INTO ai_results_total (reading_id, result_text) VALUES (?, ?);`,
          [readingId, geminiContent]
        );
        const card = cardData[aiResponses.length - 1].card;
        await executeQuery(
          `INSERT INTO ai_card_results (reading_id, card_id, analysis_result) VALUES (?, ?, ?);`,
          [readingId, card.id, geminiContent]
        );
      } catch (error) {
        console.error('Error with AI request:', error.message);
      }
    }

    res.json({
      status: 'success',
      readingId,
      cards: cardData,
      aiResponses,
    });
  } catch (error) {
    console.error('General Error:', error.message);
    res.status(500).json({ message: 'Failed to generate multi-reading.' });
  }
});

router.post('/generate-reading', async (req, res) => {
  const { userId, themeIds } = req.body;
  console.log('Request received with body:', req.body);
  // themeIds 체크
  if (themeIds === undefined || typeof themeIds !== 'number') {
    console.error('Invalid input:', { userId, themeIds });
    return res.status(400).json({ message: 'Invalid input. User ID and themeIds are required.' });
  }

  if (themeIds !== 0) {
    console.log(`Redirecting request for themeIds: ${themeIds} to /generate-multi-reading`);
    return res.redirect(307, '/api/generate-multi-reading'); // Temporary redirect with the same POST method
  }

  try {
    console.log('Step 1: Fetching specific tarot card...');
    const card = await getSpecificTarotCard();

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
              text: `당신은 타로 전문가이자 전문 작가입니다. 다음 타로 카드 정보를 기반으로, 오늘의 운세 메시지를 한국어로 작성해주세요.아래 형식으로 제공해주세요
                   오늘의 운세 카드: [카드 이름(이거는 그냥 영어로)]
     카드의 주요 의미를 간결하고 긍정적으로 요약.
     오늘의 운세와 관련된 메시지.
    
    [카드 정보]
    카드 이름: ${card.name}
    카드 의미: ${card.upright_meaning}
              이제 이 정보를 바탕으로 카드 이름과 카드의 의미 운세 메시지를 작성해주세요.(3개를 이제 줄 바꿈으로 구분하고) 마지막에 카드에 엄청 어울리는 아이콘도 하나 줄바꾸지 말고 바로 옆에 넣어주고 시작할때 카드 이름 옆에도 하나 있었으면 해요!`,
            },
          ],
        },
      ],
    };

    console.log('Step 6: Sending Gemini API request...');
    const geminiResponse = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      geminiPayload,
      { headers: { 'Content-Type': 'application/json' } }
    );

    const geminiContent = geminiResponse.data.candidates[0]?.content?.parts[0]?.text || 'Default analysis result';

    console.log('Gemini Content:', geminiContent);
    console.log('Step 7: Saving results...');

    const insertRequestQuery = `
      INSERT INTO ai_requests (reading_id, request_payload)
      VALUES (?, ?);
    `;
    await executeQuery(insertRequestQuery, [readingId, JSON.stringify(geminiPayload)]);
    console.log('Inserted into ai_requests successfully');

    const insertResultTotalQuery = `
      INSERT INTO ai_results_total (reading_id, result_text)
      VALUES (?, ?);
    `;
    await executeQuery(insertResultTotalQuery, [readingId, geminiContent]);
    console.log('Inserted into ai_results_total successfully');

    const insertCardResultQuery = `
      INSERT INTO ai_card_results (reading_id, card_id, analysis_result)
      VALUES (?, ?, ?);
    `;
    await executeQuery(insertCardResultQuery, [readingId, card.id, geminiContent]);
    console.log('Inserted into ai_card_results successfully');

    res.json({
      status: 'success',
      readingId,
      card,
      geminiResponse: geminiResponse.data,
    });
  } catch (error) {
    console.error('General Error:', error.message);
    res.status(500).json({ message: 'Failed to generate reading.' });
  }
});
router.post('/generate-couple-reading', async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required.' });
  }

  try {
    console.log('Step 1: Creating new reading...');
    const readingId = await createReading(userId, 8); // 각 테마마다 8장씩

    const positions = [
      'conflict', 
      'endeavor', 'endeavor', 
      'attractiveness', 'attractiveness', 
      'love_view', 'love_view', 
      'compatibility'
    ];
    const cardData = [];

    console.log(`Processing theme: couple`);
    for (const position of positions) {
      const card = await getCardsByThemeAndPosition('couple', position);

      if (card) {
        console.log(`Selected card for theme: couple, position: ${position}`, card);
        await storeReadingCard(readingId, card.id);
        cardData.push({ theme: 'couple', position, card });
      } else {
        console.log(`No card found for theme: couple, position: ${position}`);
      }
    }

    if (cardData.length === 0) {
      return res.status(404).json({ message: 'No cards found for the given themes and positions.' });
    }

    console.log('Step 2: Preparing AI payload...');
    const aiPayload = cardData.map(({ theme, position, card }) => ({
      parts: [
        {
          text: `당신은 타로 전문가이자 전문 작가입니다. 손님이 타로를보러 왔어요 다음 타로 카드 정보를 기반으로 테마 "${theme}"의 "${position}" 위치에 해당하는 카드 이름과 그 해당 메시지를를 작성해주세요.
          카드 이름: ${card.name}
          카드 의미: ${card.upright_meaning}
          카드 중에서 position이 겹치는 것(endeavor, attractiveness,love_view)은 하나는 남자 하나는 여자이기 떄문입니다. 이를 구분할 수 있게 표시해 주고 나머지는 남녀 두명에게 이야기할 conflict와 compatibility입니다. 추가적으로 각각의 명칭은 '갈등과 해결방법' '노력' '매력' '연애관' '궁합'이니까 번역할때 필요하다면 이 용어 사용해줘여여`,
        },
      ],
    }));

    console.log('Step 3: Sending AI requests...');
    const aiResponses = [];
    for (const payload of aiPayload) {
      try {
        const aiResponse = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
          { contents: [payload] },
          { headers: { 'Content-Type': 'application/json' } }
        );

        const geminiContent = aiResponse.data.candidates[0]?.content?.parts[0]?.text || 'Default analysis result';
        aiResponses.push(geminiContent);

        await executeQuery(
          `INSERT INTO ai_results_total (reading_id, result_text) VALUES (?, ?);`,
          [readingId, geminiContent]
        );

        // 각 카드에 대해 한 번만 분석 결과를 삽입
        const card = cardData[aiResponses.length - 1].card;
        await executeQuery(
          `INSERT INTO ai_card_results (reading_id, card_id, analysis_result) VALUES (?, ?, ?);`,
          [readingId, card.id, geminiContent]
        );
      } catch (error) {
        console.error('Error with AI request:', error.message);
      }
    }

    res.json({
      status: 'success',
      readingId,
      cards: cardData,
      aiResponses,
    });
  } catch (error) {
    console.error('General Error:', error.message);
    res.status(500).json({ message: 'Failed to generate couple reading.' });
  }
});
module.exports = router;
