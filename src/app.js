const express = require('express');
const traitRoutes = require('./routes/traitRoutes');
require('dotenv').config();

const app = express();

// 미들웨어 설정
app.use(express.json());
app.use('/api/traits', traitRoutes); // 특성 라우트 등록

module.exports = app;
