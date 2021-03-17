DROP SCHEMA IF EXISTS sdc CASCADE;
CREATE SCHEMA sdc;

CREATE TABLE sdc.questions (
  question_id INT PRIMARY KEY,
  product_id INT NOT NULL,
  question_body TEXT,
  question_date DATE,
  asker_name VARCHAR(100) NOT NULL,
  asker_email VARCHAR(100) NOT NULL,
  question_reported INT,
  question_helpfulness INT
);

CREATE TABLE sdc.answers (
  answer_id INT PRIMARY KEY,
  question_id INT REFERENCES sdc.questions(question_id),
  answer_body TEXT,
  answer_date DATE,
  answerer_name VARCHAR(100) NOT NULL,
  answerer_email VARCHAR(100) NOT NULL,
  answer_reported INT,
  answer_helpfulness INT
);

CREATE TABLE sdc.photos (
  photo_id INT PRIMARY KEY,
  answer_id INT REFERENCES sdc.answers(answer_id),
  photo_url text
);