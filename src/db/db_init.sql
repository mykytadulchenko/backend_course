-- CREATE DATABASE db_b_e_course;

-- \connect db_b_e_course;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(32),
  username VARCHAR(16),
  email VARCHAR(32)
);

-- has 1-many relation with users
CREATE TABLE orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  total DECIMAL(6, 2),
  date DATE,
  user_id UUID,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- has many-many relation with orders using table below
CREATE TABLE products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255),
  price DECIMAL(6, 2)
);

CREATE TABLE order_details (
  order_id UUID,
  product_id UUID,
  qty INT,
  PRIMARY KEY (order_id, product_id),
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

INSERT INTO users (name, username, email) VALUES
  ('Leanne Graham', 'Bret74', 'Sincere@april.biz'),
  ('Ervin Howell', 'Antonette1', 'Shanna@melissa.tv'),
  ('Clementine Bauch', 'Samantha82', 'Nathan@yesenia.net'),
  ('Patricia Lebsack', 'Karianne_2', 'Julianne.OConner@kory.org'),
  ('Chelsey Dietrich', 'Kamren777', 'Lucio_Hettinger@annie.ca');

INSERT INTO products (title, price) VALUES
  ('Phone', 500.75),
  ('Laptop', 1000.50),
  ('Headphones', 50.00),
  ('Tablet', 300.00),
  ('Smartwatch', 200.00);

-- this sub-queries below are used just for receiving pre-generated data from other tables and filling test data into related tables 
INSERT INTO orders (total, date, user_id) VALUES
  (1050.50, '2024-05-11', (SELECT id FROM users WHERE username = 'Bret74')),
  (550.75, '2024-05-10', (SELECT id FROM users WHERE username = 'Karianne_2')),
  (200.00, '2024-05-09', (SELECT id FROM users WHERE username = 'Kamren777')),
  (500.75, '2024-05-08', (SELECT id FROM users WHERE username = 'Samantha82')),
  (300.00, '2024-05-07', (SELECT id FROM users WHERE username = 'Bret74'));

INSERT INTO order_details (order_id, product_id, qty) VALUES
  ((SELECT id FROM orders WHERE user_id = (SELECT id FROM users WHERE username = 'Bret74') AND date = '2024-05-11'), (SELECT id FROM products WHERE title = 'Laptop'), 1),
  ((SELECT id FROM orders WHERE user_id = (SELECT id FROM users WHERE username = 'Bret74') AND date = '2024-05-11'), (SELECT id FROM products WHERE title = 'Headphones'), 1),
  ((SELECT id FROM orders WHERE user_id = (SELECT id FROM users WHERE username = 'Karianne_2') AND date = '2024-05-10'), (SELECT id FROM products WHERE title = 'Phone'), 1),
  ((SELECT id FROM orders WHERE user_id = (SELECT id FROM users WHERE username = 'Karianne_2') AND date = '2024-05-10'), (SELECT id FROM products WHERE title = 'Headphones'), 1),
  ((SELECT id FROM orders WHERE user_id = (SELECT id FROM users WHERE username = 'Kamren777') AND date = '2024-05-09'), (SELECT id FROM products WHERE title = 'Smartwatch'), 1),
  ((SELECT id FROM orders WHERE user_id = (SELECT id FROM users WHERE username = 'Samantha82') AND date = '2024-05-08'), (SELECT id FROM products WHERE title = 'Phone'), 1),
  ((SELECT id FROM orders WHERE user_id = (SELECT id FROM users WHERE username = 'Bret74') AND date = '2024-05-07'), (SELECT id FROM products WHERE title = 'Tablet'), 1);

