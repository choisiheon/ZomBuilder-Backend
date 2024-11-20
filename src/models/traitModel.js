const pool = require('../config/db');

const Trait = {
  getAll: async () => {
    try {
      const [rows] = await pool.query('SELECT * FROM traits');
      return rows;
    } catch (error) {
      console.error('Error fetching data from database:', error);
      throw error;
    }
  },
  findFromVanilla: async (group) => {
    try {
      if (!group) {
        throw new Error('Group condition is required');
      }

      if (!group) {
        throw new Error("Invalid group value. Use 'positive' or 'negative'.");
      }

      // mode는 항상 'X'로 고정
      const query = `
        SELECT * 
        FROM traits 
        WHERE \`mode\` = 'X' AND \`group\` = ?
      `;
      
      const [rows] = await pool.query(query, [group]);
      return rows;
    } catch (error) {
      console.error('Error fetching data from database:', error);
      throw error;
    }
  },
  findFromMode: async (group) => {
    try {
      if (!group) {
        throw new Error('Group condition is required');
      }

      if (!group) {
        throw new Error("Invalid group value. Use 'positive' or 'negative'.");
      }

      // mode는 항상 'X'로 고정
      const query = `
        SELECT * 
        FROM traits 
        WHERE \`mode\` = 'O' AND \`group\` = ?
      `;
      
      const [rows] = await pool.query(query, [group]);
      return rows;
    } catch (error) {
      console.error('Error fetching data from database:', error);
      throw error;
    }
  },
};

module.exports = Trait;
