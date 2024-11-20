// src/app.js
const express = require('express');
const dotenv = require('dotenv');
const traitRoutes = require('./routes/traitRoutes.js');  

// 환경 변수 로드
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// 미들웨어 설정
app.use(express.json());

// 라우트 설정
app.use('/api', traitRoutes); // /api 경로 하위에 traitRoutes 추가

// 서버 실행
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
