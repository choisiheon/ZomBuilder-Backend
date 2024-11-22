const pool = require('../config/db');

const Trait = {
  getAll: async () => {
    const [rows] = await pool.query('SELECT * FROM traits');
    return rows;
  },
  getByQuery: async (mode, group) => {
    const [rows] = await pool.query('SELECT * FROM traits WHERE `mode` = ? AND `group` = ?', [mode, group]);
    return rows;
  },
};

module.exports = Trait;
