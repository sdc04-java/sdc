const Pool = require("pg").Pool;

const pool = new Pool ({
  user: 'postgres',
  password: 'MunguWangu98',
  database: 'reviews_service',
  host: 'localhost',
  port: 5432
});

const getAllReviews = (product_id, cb) => {
  pool.query("SELECT * FROM reviewslist LEFT JOIN review_photos ON reviewslist.review_id = review_photos.review_id WHERE product_id = 12")
  .then((results) => {
    cb(results.rows);
  })
  .catch((err) => {
    cb(err);
  })
};

module.exports = {
  getAllReviews
};