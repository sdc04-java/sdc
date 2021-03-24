const execSync = require('child_process').execSync;

const psql = execSync(
  `psql sdc
  && \\i ../db/schema.sql`,
  { encoding: 'utf-8' }
);

console.log ('COPY OUTPUT', psql);