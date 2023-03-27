CREATE TABLE users(
   id SERIAL PRIMARY KEY,
   name VARCHAR(255),
   password VARCHAR(255),
   createdAt DATE DEFAULT current_date
);