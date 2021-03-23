const express = require('express');
const cors = require('cors');
const mountRoutes = require('./routes');

const port = process.env.PORT || 3000;

const app = express();

app.use(
  cors({
    origin: '*',
    methods: 'GET, POST, PUT',
    allowedHeaders: '*',
    exposedHeaders: '*',
  }),
);
app.use(express.json());

mountRoutes(app);

app.listen(port, () => {
  console.log('Express server is listening on port', port);
});
