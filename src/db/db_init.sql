-- CREATE DATABASE db_b_e_course;

-- \connect db_b_e_course;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(32),
    username VARCHAR(16),
    email VARCHAR(32)
);

INSERT INTO users (name, username, email) VALUES
  ('Leanne Graham', 'Bret', 'Sincere@april.biz'),
  ('Ervin Howell', 'Antonette', 'Shanna@melissa.tv'),
  ('Clementine Bauch', 'Samantha', 'Nathan@yesenia.net'),
  ('Patricia Lebsack', 'Karianne', 'Julianne.OConner@kory.org'),
  ('Chelsey Dietrich', 'Kamren', 'Lucio_Hettinger@annie.ca');
