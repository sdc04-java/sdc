SET search_path = sdc;
COPY sdc.questions FROM '/home/ubuntu/sdc/QAService/db/db-scripts/csv/questions.csv' WITH (FORMAT csv, header);
COPY sdc.answers FROM '/home/ubuntu/sdc/QAService/db/db-scripts/csv/answers.csv' WITH (FORMAT csv, header);
COPY sdc.photos FROM '/home/ubuntu/sdc/QAService/db/db-scripts/csv/answers_photos.csv' WITH (FORMAT csv, header);

