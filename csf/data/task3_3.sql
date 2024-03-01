-- TODO Task 3
DROP DATABASE IF EXISTS ecommerce;

CREATE DATABASE ecommerce;

USE ecommerce;

CREATE TABLE Orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    priority BOOLEAN NOT NULL,
    comments TEXT
);

CREATE TABLE LineItems (
    line_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    prodId VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id)
);

GRANT all privileges on ecommerce.* to fred@'%';
flush privileges;
