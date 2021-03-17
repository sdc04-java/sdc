DROP DATABASE IF EXISTS sdcproducts;

CREATE DATABASE sdcproducts;

USE sdcproducts;

DROP TABLE IF EXISTS productItem;

CREATE TABLE productItem (
   id INTEGER NULL DEFAULT NULL,
   name VARCHAR (65) NOT NULL,
   slogan VARCHAR (600),
   description VARCHAR (1200),
   category VARCHAR (200),
   sale_price INTEGER,
   default_price INTEGER NULL DEFAULT NULL,
   PRIMARY KEY (id)
);

DROP TABLE IF EXISTS productFeatures;

CREATE TABLE productFeatures (
   style_id INTEGER NULL DEFAULT NULL,
   product_id INTEGER NULL DEFAULT NULL,
   feature VARCHAR (100),
   value VARCHAR (200),
   PRIMARY KEY (style_id),
   FOREIGN KEY (id) REFERENCES productItem (id)
);

DROP TABLE IF EXISTS styleResults;

CREATE TABLE styleResults (
   style_id INTEGER NULL DEFAULT NULL,
   product_id INTEGER NULL DEFAULT NULL,
   name VARCHAR (200),
   original_price VARCHAR (10),
   sale_price VARCHAR (10),
   default_style BOOLEAN,
   PRIMARY KEY (style_id)
);

DROP TABLE IF EXISTS stylePhotos;

CREATE TABLE stylePhotos (
   id INTEGER NULL DEFAULT NULL,
   photos_id INTEGER NULL DEFAULT NULL,
   style_id INTEGER NULL DEFAULT NULL,
   thumbnail_url VARCHAR (1000),
   url VARCHAR (1000),
   PRIMARY KEY (id),
   FOREIGN KEY (style_id) REFERENCES styleResults (style_id)
);

DROP TABLE IF EXISTS styleSkus;

CREATE TABLE styleSkus (
   sku_id INTEGER NULL DEFAULT NULL,
   style_id INTEGER NULL DEFAULT NULL,
   quantity INTEGER,
   size VARCHAR (10),
   PRIMARY KEY (sku_id),
   FOREIGN KEY (style_id) REFERENCES styleResults (style_id)
);
