// src/models/Trait.js
const pool = require('../config/db');

const Trait = {
  getAll: async () => {
    try {
      const [rows] = await pool.query('SELECT * FROM traits');
      return rows;
    } catch (error) {
      console.error('Error fetching data from database:', error);  // DB 쿼리 오류 로그
      throw error;  // 오류를 다시 던져서 컨트롤러에서 처리
    }
  },
};

module.exports = Trait;
