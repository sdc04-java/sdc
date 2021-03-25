const Pool = require("pg").Pool;

const pool = new Pool ({
  user: 'postgres',
  password: 'MunguWangu98',
  database: 'reviews_service',
  host: 'localhost',
  port: 5432
});

const getAllReviews = ({page, count, sort, product_id}, cb) => {
  let dbSorter;
  switch(sort) {
    case 'newest':
      dbSorter = 'date';
      break;
    case 'helpful':
    case 'relevant':
      dbSorter = 'helpfulness';
      break;
    default:
      dbSorter = 'helpfulness';
  }
  pool.query(`SELECT reviewslist.review_id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness, review_photos.id, url FROM reviewslist LEFT JOIN review_photos ON reviewslist.review_id = review_photos.review_id WHERE product_id = ${product_id} ORDER BY ${dbSorter} DESC`)
  .then((results) => {
    cb(results.rows.slice(0, count));
  })
  .catch((err) => {
    cb(err);
  })
};

const characteristicsGetter = (id, cb) => {

  pool.query(`SELECT characteristics1.char_id, product_id, char_name, characteristics2.characteristic_id, char_value  from characteristics1 LEFT JOIN characteristics2 on characteristics1.char_id = characteristics2.characteristic_id WHERE product_id = ${id}`)
    .then((results) => {
      cb(results);
    })
};

module.exports = {
  getAllReviews,
  characteristicsGetter
};