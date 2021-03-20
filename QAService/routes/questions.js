const Router = require('express-promise-router');
const db = require('../db/index.js');
const helper = require('./helper.js');

const router = new Router();

module.exports = router;

router.get('/', async (req, res) => {
  try {
    const { product_id, page, count } = req.query;
    const first = page * count - count;
    const last = page * count;
    // const results = await db.listAll(product_id);
    const results = await db.listQuestions(product_id);
    const pageCount = results.slice(first, last);
    const hasAnswers = await helper.questionAnswers(pageCount);
    const allData = await helper.questionPhotos(hasAnswers);
    const final = await helper.questionShaper(allData, product_id);
    res.status(200).send(final);
  } catch (error) {
    console.error(error);
    res.status(404).send(error);
  }
});
