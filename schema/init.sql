DROP DATABASE IF EXISTS main;

CREATE DATABASE main;

\connect main

CREATE TABLE categories
(
	id SERIAL PRIMARY KEY,
	code VARCHAR(10) NOT NULL,
	name TEXT NOT NULL
);

CREATE TABLE items
(
	id SERIAL PRIMARY KEY,
	code VARCHAR(50) NOT NULL,
	name TEXT NOT NULL,
	price MONEY NOT NULL,
	created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE item_categories
(
	item_id INT NOT NULL REFERENCES items(id),
	category_id INT NOT NULL REFERENCES categories(id),
	PRIMARY KEY (item_id, category_id)
)
