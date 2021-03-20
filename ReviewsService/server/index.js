const express = require("express");

const app = express();
const port = 3030;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('nice');
});

app.listen(port, ()=> {
  console.log(`Server is doing the thing on ${port}`)
})
