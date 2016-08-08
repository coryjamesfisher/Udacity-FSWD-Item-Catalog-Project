/*
Note must be run with:
sudo -u postgres psql -f schema/init.sql
*/

DROP DATABASE IF EXISTS main;

CREATE DATABASE main;

\connect main

CREATE EXTENSION IF NOT EXISTS citext;

CREATE TABLE users
(
	id SERIAL PRIMARY KEY,
	email citext UNIQUE NOT NULL,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	google_id VARCHAR(100) UNIQUE NULL,
	facebook_id VARCHAR(100) UNIQUE NULL
);


CREATE TABLE categories
(
	id SERIAL PRIMARY KEY,
	code VARCHAR(10) NOT NULL,
	name TEXT NOT NULL,
	created_by INT NOT NULL REFERENCES users(id),
	created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE items
(
	id SERIAL PRIMARY KEY,
	code VARCHAR(50) NOT NULL,
	name TEXT NOT NULL,
	price MONEY NOT NULL,
	created_by INT NOT NULL REFERENCES users(id),
	created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE item_categories
(
	item_id INT NOT NULL REFERENCES items(id) ON DELETE CASCADE,
	category_id INT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
	PRIMARY KEY (item_id, category_id)
);

GRANT ALL PRIVILEGES ON DATABASE main TO serviceuser;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO serviceuser;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO serviceuser;
