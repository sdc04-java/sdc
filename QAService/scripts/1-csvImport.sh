psql -v ON_ERROR_STOP=1 -h localhost --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<- EOPSQL
  SET search_path = sdc;
  COPY sdc.questions FROM '/var/lib/postgresql/data/csv/questions.csv' WITH (FORMAT csv, header);
  COPY sdc.answers FROM '/var/lib/postgresql/data/csv/answers.csv' WITH (FORMAT csv, header);
  COPY sdc.photos FROM '/var/lib/postgresql/data/csv/answers_photos.csv' WITH (FORMAT csv, header);
EOPSQL
