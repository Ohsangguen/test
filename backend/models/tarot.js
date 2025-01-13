const db = require('../db');

// 모든 Tarot 카드 가져오기
const getAllTarotCards = async () => {
  try {
    const rows = await db.executeQuery('SELECT * FROM tarot_cards');
    return rows;
  } catch (error) {
    console.error('Error fetching tarot cards:', error);
    throw new Error('Database error while fetching tarot cards');
  }
};

// 특정 리딩 생성
const createReading = async (userId, cardCount) => {
  try {
    const query = 'INSERT INTO tarot_readings (user_id, card_count) VALUES (?, ?)';
    const result = await db.executeQuery(query, [userId, cardCount]);
    console.log('Create Reading Result:', result);
    return result.insertId;
  } catch (error) {
    console.error('Error creating tarot reading:', error);
    throw new Error('Database error while creating tarot reading');
  }
};

// Tarot Reading의 카드 정보 가져오기
const getReadingCards = async (readingId) => {
  try {
    const rows = await db.executeQuery(
      `SELECT trc.*, tc.name, tc.image_url, tc.upright_meaning
       FROM tarot_reading_cards trc
       JOIN tarot_cards tc ON trc.card_id = tc.id
       WHERE trc.reading_id = ?`,
      [readingId]
    );
    return rows;
  } catch (error) {
    console.error('Error fetching reading cards:', error);
    throw new Error('Database error while fetching reading cards');
  }
};

const getSpecificTarotCard = async () => {
  const query = `
    SELECT * FROM tarot_cards
    WHERE theme = 'general' AND position = 'present'
    ORDER BY RAND()
    LIMIT 1;
  `;
  try {
    const rows = await db.executeQuery(query);

    // 디버깅 로그 추가
    console.log('Query Result:', rows);

    // 배열이 비어 있는 경우 처리
    if (!rows || rows.length === 0) {
      console.log('No rows returned from the database.');
      return null; // 빈 결과 처리
    }

    return rows[0]; // 첫 번째 결과 반환
  } catch (error) {
    console.error('Error fetching tarot card:', error.message);
    throw new Error('Database query failed while fetching tarot card.');
  }
};

const storeReadingCard = async (readingId, cardId) => {
  try {
    const query = 'INSERT INTO tarot_reading_cards (reading_id, card_id) VALUES (?, ?)';
    const result = await db.executeQuery(query, [readingId, cardId]);
    console.log('Store Reading Card Result:', result);
  } catch (error) {
    console.error('Error storing reading card:', error);
    throw new Error('Database error while storing reading card');
  }
};

module.exports = { getAllTarotCards, createReading, getReadingCards, getSpecificTarotCard, storeReadingCard };
