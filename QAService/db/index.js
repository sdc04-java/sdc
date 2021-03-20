const { Pool } = require('pg');

let pool;

if (process.env.DATABASE_URL) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
} else {
  pool = new Pool({
    database: 'sdc',
    // host: 'localhost',
    // user: '$POSTGRES_USER',
    // password: 'password',
    // port: 5432,
  });
}

pool.on('error', (error, client) => {
  console.error('Unexpected error on idle client', error);
  process.exit(-1);
});

const getDate = async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    return res.rows;
  } catch (error) {
    return error;
  }
};

const listQuestions = async (product_id) => {
  try {
    const res = await pool.query(
      `SELECT question_id, question_body, question_date, asker_name, question_helpfulness, question_reported FROM sdc.questions
      WHERE product_id = ${product_id}`,
    );
    return res.rows;
  } catch (error) {
    return error;
  }
};

const listAnswers = async (question_id) => {
  try {
    const res = await pool.query(
      `SELECT answer_id, answer_body, answer_date, answerer_name, answer_helpfulness, answer_reported FROM sdc.answers
      WHERE question_id = ${question_id}`,
    );
    return res.rows;
  } catch (error) {
    return error;
  }
};

const listPhotos = async (answer_id) => {
  try {
    const res = await pool.query(
      `SELECT photo_id, photo_url FROM sdc.photos
      WHERE answer_id = ${answer_id}`,
    );
    return res.rows;
  } catch (error) {
    return error;
  }
};

const listAll = async (product_id) => {
  try {
    const res = await pool.query(
      `SELECT question_id, question_body, question_date, asker_name, question_helpfulness, question_reported  FROM sdc.questions
      INNER JOIN sdc.answers
      ON sdc.questions.question_id = sdc.answers.question_id
      INNER JOIN sdc.photos
      ON sdc.answers.answer_id = sdc.photos.answer_id
      WHERE product_id = ${product_id}`,
    );
    return res.rows;
  } catch (error) {
    return error;
  }
};

const addQuestion = async () => {
  try {
    const res = await pool.query('');
    return res.rows;
  } catch (error) {
    return error;
  }
};

const addAnswer = async () => {
  try {
    const res = await pool.query('');
    return res.rows;
  } catch (error) {
    return error;
  }
};

const markQuestionHelpful = async () => {
  try {
    const res = await pool.query('');
    return res.rows;
  } catch (error) {
    return error;
  }
};

const reportQuestion = async () => {
  try {
    const res = await pool.query('');
    return res.rows;
  } catch (error) {
    return error;
  }
};

const markAnswerHelpful = async () => {
  try {
    const res = await pool.query('');
    return res.rows;
  } catch (error) {
    return error;
  }
};

const reportAnswer = async () => {
  try {
    const res = await pool.query('');
    return res.rows;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getDate,
  listQuestions,
  listAnswers,
  listPhotos,
  listAll,
  addQuestion,
  addAnswer,
  markQuestionHelpful,
  reportQuestion,
  markAnswerHelpful,
  reportAnswer,
};
