// src/config/db.js
const mysql = require('mysql2/promise');
require('dotenv').config();

// DB 연결 풀 설정
const pool = mysql.createPool({
  host: process.env.DB_HOST, // 환경변수로 DB 호스트 지정
  user: process.env.DB_USER, // 환경변수로 DB 사용자 지정
  password: process.env.DB_PASSWORD, // 환경변수로 DB 비밀번호 지정
  database: process.env.DB_NAME, // 환경변수로 DB 이름 지정
  port: process.env.DB_PORT || 3306, // 환경변수로 포트 지정, 기본값은 3306

});

module.exports = pool;
