// src/app.js
const express = require('express');
const dotenv = require('dotenv');
const traitRoutes = require('./routes/traitRoutes.js');  
const postRoutes = require('./routes/postRoutes.js');  

// 환경 변수 로드
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// CORS 설정
const corsOptions = {
  origin: ['http://localhost:3000', 'https://zombuilder.com'], // 허용할 도메인 목록
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // 허용할 HTTP 메서드
  allowedHeaders: ['Content-Type', 'Authorization'], // 허용할 헤더
  credentials: true, // 쿠키 및 인증 정보를 허용하려면 true로 설정
};

// 미들웨어 설정
app.use(express.json());

// 라우트 설정
app.use('/api', traitRoutes); // /api 경로 하위에 traitRoutes 추가
app.use('/post', postRoutes); // /post 경로 하위에 postRoutes 추가

// 서버 실행
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

