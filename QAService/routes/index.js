const questions = require('./questions.js');
const answers = require('./answers.js');

module.exports = (app) => {
  app.use('/qa/questions', questions);
  app.use('/qa/questions/:question_id/answers', answers);
  app.use('/qa/answers/:answer_id', answers);
};
