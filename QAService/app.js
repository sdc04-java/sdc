const express = require('express');
const cors = require('cors');
const mountRoutes = require('./routes');

const port = process.env.PORT || 3000;

const app = express();
mountRoutes(app);

app.use(
  cors({
    origin: '*',
    methods: 'GET, POST',
    allowedHeaders: '*',
    exposedHeaders: '*',
  }),
);

app.use(express.json());

app.listen(port, () => {
  console.log('Express server is listening on port', port);
});
