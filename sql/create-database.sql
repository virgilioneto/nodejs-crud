CREATE DATABASE IF NOT EXISTS nodejs_crud_db;
USE nodejs_crud_db;

CREATE TABLE products (
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT
);
