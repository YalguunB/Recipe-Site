CREATE DATABASE IF NOT EXISTS recipe_db;
USE recipe_db;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    password_hash VARCHAR(255),
    username VARCHAR(100)
);

CREATE TABLE recipes (
    recipe_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    name VARCHAR(255),
    type VARCHAR(100),
    time INT,
    portion VARCHAR(50),
    calories INT,
    image_url VARCHAR(500)
);

INSERT INTO users (email, password_hash, username) VALUES
('test@gmail.com', '$2b$10$K3qO8rP9mN4lH6tY2wX5S.eF7gD8cJ9bA3mK6nL2pQ5rT4vW8xY1a', 'Test');

INSERT INTO recipes (user_id, name, type, time, portion, calories, image_url) VALUES
(1, 'Пицца', 'Итали хоол', 20, '2-3', 300, 'images/pizza.jpg');