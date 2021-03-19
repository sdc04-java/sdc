const { Pool } = require('pg');

const pool = new Pool({
  // user: 'dbuser',
  // host: 'database.server.com',
  // database: 'sdc',
  // password: 'secretpassword',
  // port: 4000,
  connectionString: process.env.DATABASE_URL,
});

const getDate = async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    return res;
  } catch (error) {
    return error;
  }
};

const listQuestions = async (product_id) => {
  try {
    const res = await pool.query(
      `SELECT * FROM sdc.questions
      WHERE product_id = ${product_id}`,
    );
    return res.rows;
  } catch (error) {
    return error;
  }
};

const listAnswers = async () => {
  try {
    const res = await pool.query('');
    return res;
  } catch (error) {
    return error;
  }
};

const addQuestion = async () => {
  try {
    const res = await pool.query('');
    return res;
  } catch (error) {
    return error;
  }
};

const addAnswer = async () => {
  try {
    const res = await pool.query('');
    return res;
  } catch (error) {
    return error;
  }
};

const markQuestionHelpful = async () => {
  try {
    const res = await pool.query('');
    return res;
  } catch (error) {
    return error;
  }
};

const reportQuestion = async () => {
  try {
    const res = await pool.query('');
    return res;
  } catch (error) {
    return error;
  }
};

const markAnswerHelpful = async () => {
  try {
    const res = await pool.query('');
    return res;
  } catch (error) {
    return error;
  }
};

const reportAnswer = async () => {
  try {
    const res = await pool.query('');
    return res;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getDate,
  listQuestions,
  listAnswers,
  addQuestion,
  addAnswer,
  markQuestionHelpful,
  reportQuestion,
  markAnswerHelpful,
  reportAnswer,
};
