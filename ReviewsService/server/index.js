const express = require("express");
const db = require("../database/db");

const app = express();
const port = 3030;

app.use(express.json());

app.get("/", (req, res) => {
	let getObj = req.body;
	db.getAllReviews(getObj, (results) => {
		let finalReviewsListObj = getObj;
		finalReviewsListObj.results = results;
		res.status(200).send(finalReviewsListObj);
	});
});

app.get("/reviews/meta", (req, res) => {
	let product_id = req.body.product_id;
	let unshapedChars = db.characteristicsGetter(product_id, (results) => {
		res
			.status(200)
			.send(results);
	});
});

app.post("/reviews", (req, res) => {
	let reviewObj = req.body;
	res.status(201).send(reviewObj);
});

app.put("/reviews/:review_id/helpful", (req, res) => {
	let id = req.params;
	res.status(200).send(req.params);
});

app.put("/reviews/:review_id/report", (req, res) => {
	res.status(200).send(req.params);
});

app.listen(port, () => {
	console.log(`Server is doing the thing on ${port}`);
});
