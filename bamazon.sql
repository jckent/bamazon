DROP DATABASE IF EXISTS bamazon;

CREATE database bamazon;

USE bamazon;

CREATE TABLE products(
	item_id INT(4) NOT NULL,
	product_name VARCHAR(100) NOT NULL,
	department_name VARCHAR(100) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INT(20) NOT NULL,
	PRIMARY KEY (item_id)
);

Select * FROM products;

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) 
VALUES (1, "bed_sheets", "home", 29.74, 20),
	   (2, "long_sleeve_shirts", "clothes", 9.59, 10),
	   (3, "bluetooth_earbuds", "electronics", 29.76, 5),
	   (4, "tunic_sweater", "clothes", 17.84, 12),
	   (5, "hdtv_antenna", "electronics", 19.54, 15),
	   (6, "foam_pillow", "home", 18.69, 9),
	   (7, "rubber_floormat", "home", 30.55, 10),
       (8, "portable_charger", "electronics", 25.45, 5),
       (9, "hand_mixer", "home", 32.23, 3),
       (10, "fuzzy_blanket", "home", 29.98, 22)