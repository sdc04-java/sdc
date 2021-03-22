const Pool = require("pg").Pool;

const pool = new Pool ({
  user: 'postgres',
  password: 'MunguWangu98!',
  database: 'reviews_service',
  host: 'localhost',
  port: 5432
});

const getAllReviews = (cb) => {
  pool.query("SELECT * FROM reviewslist")
  .then((results) => {
    cb(results);
  })
  .catch((err) => {
    cb(err);
  })
};

module.exports = {
  getAllReviews
};