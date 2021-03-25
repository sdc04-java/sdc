const Router = require('express-promise-router');
const db = require('../db/index.js');
const helper = require('./helper.js');

const router = new Router();

module.exports = router;

router.route('/')
  // .get(async (req, res) => {
    // try {
    //   const { product_id, page, count } = req.query;
    //   const first = page * count - count;
    //   const last = page * count;
    //   // const results = await db.listAll(product_id);
    //   const results = await db.listQuestions(product_id);
    //   console.log(product_id);
    //   const pageCount = results.slice(first, last);
    //   const hasAnswers = await helper.questionAnswers(pageCount);
    //   const allData = await helper.questionPhotos(hasAnswers);
    //   const final = await helper.questionShaper(allData, product_id);

    //   res.status(200).send(final);
    // } catch (error) {
    //   console.error(error);
    //   res.status(404).send(error);
    // }
  // })
  .get((req,res) => {
    res.status(200).send({hey: 'hey'});
    })
  .post(async (req, res) => {
    try {
      const {
        body, name, email, product_id,
      } = req.body;
      const date = await db.getDate();
      const dateString = JSON.stringify(date[0].now).replace(/"/g, '\'');
      const results = await db.addQuestion(product_id, body, dateString, name, email);
      res.status(200).send(results);
    } catch (error) {
      console.error(error);
      res.status(404).send({hey: 'error'});
    }
  });

router.put('/:question_id/helpful', async (req, res) => {
  try {
    const { question_id } = req.params;
    const results = await db.markQuestionHelpful(question_id);
    res.status(200).send(results);
  } catch (error) {
    console.error(error);
    res.status(404).send(error);
  }
});

router.put('/:question_id/report', async (req, res) => {
  try {
    const { question_id } = req.params;
    const results = await db.reportQuestion(question_id);
    res.status(200).send(results);
  } catch (error) {
    console.error(error);
    res.status(404).send(error);
  }
});
