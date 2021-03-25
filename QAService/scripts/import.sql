SET search_path = sdc;
COPY sdc.questions FROM '/csv/questions.csv' WITH (FORMAT csv, header);
COPY sdc.answers FROM '/csv/answers.csv' WITH (FORMAT csv, header);
COPY sdc.photos FROM '/csv/answers_photos.csv' WITH (FORMAT csv, header);

