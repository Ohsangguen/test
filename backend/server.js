const express = require('express');
const cors = require('cors');
const tarotRoutes = require('./routes/tarotRoutes');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();
const { executeQuery } = require('./db');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

const app = express();
const PORT = process.env.PORT || 5000;

// 환경 변수 로드 확인
console.log('Environment Variables:', process.env);
// Swagger UI 설정
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// 기본 경로 라우트 추가
app.get('/', (req, res) => {
  res.send('Welcome to the API! Visit <a href="/api-docs">/api-docs</a> to view the API documentation.');
});

// 라우트 등록
app.use('/api', tarotRoutes);
app.use('/api', userRoutes);
app.use('/api', tarotRoutes); 

// 테스트용 유저 데이터 검색 엔드포인트
app.get('/users', async (req, res) => {
  try {
    const email = req.query.email;
    const query = 'SELECT * FROM users WHERE email = ?';
    const result = await executeQuery(query, [email]);
    res.json(result);
  } catch (err) {
    res.status(500).send('Database query failed');
  }
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});


// 서버 실행
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Swagger API Docs available at http://localhost:${PORT}/api-docs`);
});
app._router.stack.forEach((middleware) => {
  if (middleware.route) {
    console.log(middleware.route.path); // 등록된 경로 출력
  }
});
console.log('Server setup complete');