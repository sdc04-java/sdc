const Router = require('express-promise-router');
const db = require('../db/index.js');

const router = new Router();

module.exports = router;

router.get('/', async (req, res) => {
  try {
    const { product_id, page, count } = req.query;
    const first = page * count - count;
    const last = page * count;
    const results = await db.listQuestions(product_id);
    const pageCount = results.slice(first, last);
    // const results = await db.getDate();
    res.status(200).send(pageCount);
  } catch (error) {
    res.status(404).send(error);
  }
});
