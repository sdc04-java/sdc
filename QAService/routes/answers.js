const Router = require('express-promise-router');
const db = require('../db/index.js');

const router = new Router();

module.exports = router;

router.get('/', async (req, res) => {
  const date = await db.getDate();
  res.send(date);
});
