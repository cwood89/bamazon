DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products
(
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30) NULL,
    department_name VARCHAR(30) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY(id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Air Pods", "Electronics", 129.99, 75),
("HP Laptop", "Electronics", 899.99, 40),
("Beats Headphones", "Electronics", 99.99, 35),
("Eloquent Javascript", "Books", 23.99, 100),
("Harry Potter", "Books", 15.99, 30),
("The Transall Saga", "Books", 7.99, 20),
("Jordan XII", "Shoes", 200.00, 5),
("Vans Classic", "Shoes", 70.00, 120),
("Crocs", "Shoes", 2.99, 700),
("Red Dead Redemption", "Video Games", 59.99, 60),
("Call of Duty", "Video Games", 39.99, 40),
("Need for Speed", "Video Games", 59.99, 25);

SELECT * FROM bamazon.products;