const execSync = require('child_process').execSync;

const psql = execSync(
  `psql sdc
  && SET search_path = sdc`,
  { encoding: 'utf-8' }
);

const copy = execSync(
  `COPY sdc.questions FROM "/Users/Mikl/Dropbox/HR/sdc04-java/questions.csv" WITH (FORMAT csv, header)
  && COPY sdc.answers FROM "/Users/Mikl/Dropbox/HR/sdc04-java/answers.csv" WITH (FORMAT csv, header)
  && COPY sdc.photos FROM "/Users/Mikl/Dropbox/HR/sdc04-java/answers_photos.csv" WITH (FORMAT csv, header)`,
  { encoding: 'utf-8' }
);

console.log ('COPY OUTPUT', psql, copy);