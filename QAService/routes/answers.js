const Router = require('express-promise-router');
const db = require('../db/index.js');
const helper = require('./helper.js');

const router = new Router({ mergeParams: true });

module.exports = router;

router.route('/')
  .get(async (req, res) => {
    try {
      const { page, count } = req.query;
      const { question_id } = req.params;
      const first = page * count - count;
      const last = page * count;
      const results = await db.listAnswers(question_id);
      const pageCount = results.slice(first, last);
      const allData = await helper.answerPhotos(pageCount);
      const final = await helper.answerShaper(allData, question_id, page, count);
      res.status(200).send(final);
    } catch (error) {
      console.error(error);
      res.status(404).send(error);
    }
  })
  .post(async (req, res) => {
    try {
      const {
        body, name, email, photos,
      } = req.body;
      const { question_id } = req.params;
      const date = await db.getDate();
      const dateString = JSON.stringify(date[0].now).replace(/"/g, '\'');
      const results = await db.addAnswer(question_id, body, dateString, name, email);
      const postPhotos = await helper.photoPoster(results, photos);
      res.status(200).send('Answer: Submitted');
    } catch (error) {
      console.error(error);
      res.status(404).send(error);
    }
  });

router.put('/helpful', async (req, res) => {
  try {
    const { answer_id } = req.params;
    const results = await db.markAnswerHelpful(answer_id);
    res.status(200).send(results);
  } catch (error) {
    console.error(error);
    res.status(404).send(error);
  }
});

router.put('/report', async (req, res) => {
  try {
    const { answer_id } = req.params;
    const results = await db.reportAnswer(answer_id);
    res.status(200).send(results);
  } catch (error) {
    console.error(error);
    res.status(404).send(error);
  }
});
