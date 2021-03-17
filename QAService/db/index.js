const { Pool } = require('pg');

const pool = new Pool({
  // user: 'dbuser',
  // host: 'database.server.com',
  database: 'sdc',
  // password: 'secretpassword',
  // port: 4000,
});

const getDate = async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    return res;
  } catch (error) {
    return console.error(error);
  }
};

module.exports = {
  getDate,
};
