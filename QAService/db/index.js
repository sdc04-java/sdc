const { Pool, types } = require('pg');

types.setTypeParser(1114, (stringValue) => stringValue);

// let pool;

const connectionString = 'postgresql://postgres:password@3.141.45.51:5432/sdc';

const pool = new Pool({
  connectionString,
});

// if (process.env.DATABASE_URL) {
//   pool = new Pool({
//     connectionString: process.env.DATABASE_URL,
//   });
// } else {
//   pool = new Pool({
//     database: 'sdc',
//     host: '3.141.45.51',
//     user: 'postgres',
//     password: 'password',
//     port: 5432,
//   });
// }

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
    const res = await pool.query(`
      SELECT question_id, question_body, question_date, asker_name, question_helpfulness, question_reported FROM sdc.questions
      WHERE product_id = ${product_id}
      AND question_reported = 0
    `);
    return res.rows;
  } catch (error) {
    return error;
  }
};

const listAnswers = async (question_id) => {
  try {
    const res = await pool.query(`
      SELECT answer_id, answer_body, answer_date, answerer_name, answer_helpfulness, answer_reported
      FROM sdc.answers
      WHERE question_id = ${question_id}
      AND answer_reported = 0
    `);
    return res.rows;
  } catch (error) {
    return error;
  }
};

const listPhotos = async (answer_id) => {
  try {
    const res = await pool.query(`
      SELECT photo_id, photo_url
      FROM sdc.photos
      WHERE answer_id = ${answer_id}
    `);
    return res.rows;
  } catch (error) {
    return error;
  }
};

const listAll = async (product_id) => {
  try {
    const res = await pool.query(`
      SELECT question_id, question_body, question_date, asker_name, question_helpfulness, question_reported  FROM sdc.questions
      INNER JOIN sdc.answers
      ON sdc.questions.question_id = sdc.answers.question_id
      INNER JOIN sdc.photos
      ON sdc.answers.answer_id = sdc.photos.answer_id
      WHERE product_id = ${product_id}
    `);
    return res.rows;
  } catch (error) {
    return error;
  }
};

const addQuestion = async (product_id, question_body, question_date, asker_name, asker_email) => {
  try {
    const max = await pool.query('SELECT MAX(sdc.questions.question_id) FROM sdc.questions');
    const res = await pool.query(`
    INSERT INTO sdc.questions
    VALUES (
      ${max.rows[0].max + 1},
      ${product_id},
      '${question_body}',
      ${question_date},
      '${asker_name}',
      '${asker_email}',
      0,
      0
    )
    `);
    return 'Question: Submitted';
  } catch (error) {
    return error;
  }
};

const addAnswer = async (question_id, answer_body, answer_date, answerer_name, answerer_email) => {
  try {
    const max = await pool.query('SELECT MAX(sdc.answers.answer_id) FROM sdc.answers');
    const answer_id = max.rows[0].max + 1;
    const res = await pool.query(`
    INSERT INTO sdc.answers
    VALUES (
      ${answer_id},
      ${question_id},
      '${answer_body}',
      ${answer_date},
      '${answerer_name}',
      '${answerer_email}',
      0,
      0
    )
    `);
    return answer_id;
  } catch (error) {
    return error;
  }
};

const addPhotos = async (answer_id, photo_url) => {
  try {
    const max = await pool.query('SELECT MAX(sdc.photos.photo_id) FROM sdc.photos');
    const res = await pool.query(`
    INSERT INTO sdc.photos
    VALUES (
      ${max.rows[0].max + 1},
      ${answer_id},
      '${photo_url}'
    )
    `);
    return 'Photos: Submitted';
  } catch (error) {
    return error;
  }
};

const markQuestionHelpful = async (question_id) => {
  try {
    const res = await pool.query(`
      UPDATE sdc.questions
      SET question_helpfulness = question_helpfulness + 1
      WHERE question_id = ${question_id}
    `);
    return 'Question: Marked as Helpful';
  } catch (error) {
    return error;
  }
};

const reportQuestion = async (question_id) => {
  try {
    const res = await pool.query(`
      UPDATE sdc.questions
      SET question_reported = 1
      WHERE question_id = ${question_id}
    `);
    return 'Question: Reported';
  } catch (error) {
    return error;
  }
};

const markAnswerHelpful = async (answer_id) => {
  try {
    const res = await pool.query(`
      UPDATE sdc.answers
      SET answer_helpfulness = answer_helpfulness + 1
      WHERE answer_id = ${answer_id}
    `);
    return 'Answer: Marked as Helpful';
  } catch (error) {
    return error;
  }
};

const reportAnswer = async (answer_id) => {
  try {
    const res = await pool.query(`
      UPDATE sdc.answers
      SET answer_reported = 1
      WHERE answer_id = ${answer_id}
    `);
    return 'Answer: Reported';
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
  addPhotos,
  markQuestionHelpful,
  reportQuestion,
  markAnswerHelpful,
  reportAnswer,
};
