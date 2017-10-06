CREATE DATABASE IF NOT EXISTS nodejs_crud_db;
USE nodejs_crud_db;

CREATE TABLE IF NOT EXISTS users (
  username VARCHAR(50) NOT NULL PRIMARY KEY,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT
);

CREATE TABLE IF NOT EXISTS product_images (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  product_id int,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS categories (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  image TEXT
);

CREATE TABLE IF NOT EXISTS product_category (
  product_id int NOT NULL,
  category_id int NOT NULL,
  CONSTRAINT product_category_pk PRIMARY KEY (product_id, category_id),
  CONSTRAINT FK_product FOREIGN KEY (product_id) REFERENCES products (id),
  CONSTRAINT FK_category FOREIGN KEY (category_id) REFERENCES categories (id)
);
