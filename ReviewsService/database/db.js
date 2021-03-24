const Pool = require("pg").Pool;

const pool = new Pool ({
  user: 'postgres',
  password: 'MunguWangu98',
  database: 'reviews_service',
  host: 'localhost',
  port: 5432
});

const getAllReviews = (obj, cb) => {
  pool.query(`SELECT reviewslist.review_id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness, review_photos.id, url FROM reviewslist LEFT JOIN review_photos ON reviewslist.review_id = review_photos.review_id WHERE product_id = ${obj.product_id}`)
  .then((results) => {
    cb(results.rows.slice(0, obj.count));
  })
  .catch((err) => {
    cb(err);
  })
};

module.exports = {
  getAllReviews
};