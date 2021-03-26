const Pool = require("pg").Pool;

const pool = new Pool({
	user: "postgres",
	password: "MunguWangu98",
	database: "reviews_service",
	host: "localhost",
	port: 5432,
});

const getAllReviews = ({ page, count, sort, product_id }, cb) => {
	let dbSorter;
	switch (sort) {
		case "newest":
			dbSorter = "date";
			break;
		case "helpful":
		case "relevant":
			dbSorter = "helpfulness";
			break;
		default:
			dbSorter = "helpfulness";
	}
	pool
		.query(
			`SELECT reviewslist.review_id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness, review_photos.id, url FROM reviewslist LEFT JOIN review_photos ON reviewslist.review_id = review_photos.review_id WHERE product_id = ${product_id} AND reported = false ORDER BY ${dbSorter} DESC`
		)
		.then((results) => {
			cb(results.rows.slice(0, count));
		})
		.catch((err) => {
			cb(err);
		});
};

const metaGetter = (product_id, cb) => {
	let globalObj = {
    product_id
  };
	pool.query(`SELECT rating, recommend FROM reviewslist WHERE product_id = ${product_id} AND reported = false`)
		.then((results) => {
			globalObj.ratings = {
				1: 0,
				2: 0,
				3: 0,
				4: 0,
				5: 0,
			};

      globalObj.recommended = {
        'true': 0,
        'false': 0
      };

			for (let i = 0; i < results.rows.length; i++) {
				globalObj.ratings[results.rows[i].rating]++;
        globalObj.recommended[results.rows[i].recommend]++;
			}

			return pool.query(`SELECT characteristics1.char_id, product_id, char_name, characteristics2.characteristic_id, char_value  from characteristics1 LEFT JOIN characteristics2 on characteristics1.char_id = characteristics2.characteristic_id WHERE product_id = ${product_id}`);
		})
		.then((results) => {
      let tempArr = results.rows;
			let charObj = {};
			for (let i = 0; i < tempArr.length; i++) {
        if (charObj[tempArr[i].char_name]) {
          charObj[tempArr[i].char_name].counter++;
					charObj[tempArr[i].char_name].value += tempArr[i].char_value;
					charObj[tempArr[i].char_name].value /=
          charObj[tempArr[i].char_name].counter;
				} else {
          charObj[tempArr[i].char_name] = {
            counter: 1,
						id: tempArr[i].char_id,
						value: tempArr[i].char_value,
					};
				}
			}
			for (let key in charObj) {
        delete charObj[key].counter;
			}
      globalObj.characteristics = charObj;
			cb(globalObj);
		});
};

const ratingsGetter = (id, cb) => {};

module.exports = {
	getAllReviews,
	metaGetter,
};
