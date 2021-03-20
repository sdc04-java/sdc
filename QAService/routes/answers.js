const Router = require('express-promise-router');
const db = require('../db/index.js');
const helper = require('./helper.js');

const router = new Router({ mergeParams: true });

module.exports = router;

router.get('/', async (req, res) => {
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
});
