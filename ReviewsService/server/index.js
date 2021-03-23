const express = require("express");
const db = require("../database/db");

const app = express();
const port = 3030;

app.use(express.json());

app.get('/', (req, res) => {
  db.getAllReviews(12, (results) => {
    console.log(results)
    res.send(results);
  })
});

app.listen(port, ()=> {
  console.log(`Server is doing the thing on ${port}`)
})
