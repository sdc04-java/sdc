SET search_path = sdc;
COPY sdc.questions FROM '/questions.csv' WITH (FORMAT csv, header);
COPY sdc.answers FROM '/answers.csv' WITH (FORMAT csv, header);
COPY sdc.photos FROM '/answers_photos.csv' WITH (FORMAT csv, header);

