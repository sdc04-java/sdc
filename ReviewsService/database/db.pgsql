Create DATABASE reviews_service;

\c reviews_service;

Create TABLE ReviewsList (
  review_id SERIAL PRIMARY KEY,
  product_id int NOT NULL,
  rating int NOT NULL,
  date date NOT NULL,
  summary varchar(255),
  body varchar(1000) NOT NULL,
  recommend boolean NOT NULL,
  reported boolean,
  reviewer_name varchar(255) NOT NULL,
  reviewer_email varchar(255) NOT NULL,
  response varchar(1000),
  helpfulness int NOT NULL
);

COPY ReviewsList(review_id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness)
FROM '/home/dakinglee/hackreactor/sdc/ReviewsService/database/reviews.csv'
DELIMITER ','
CSV HEADER;