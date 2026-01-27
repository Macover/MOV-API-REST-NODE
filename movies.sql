DROP DATABASE IF EXISTS movies_db;

CREATE DATABASE movies_db;
USE movies_db;

CREATE TABLE movies (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    title VARCHAR(255) NOT NULL,
    director VARCHAR(255),
    release_year INT,
    genre VARCHAR(100),
    rating DECIMAL(2, 1)
);

CREATE TABLE genders (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE movie_genders (
    movie_id VARCHAR(36),
    gender_id VARCHAR(36),
    PRIMARY KEY (movie_id, gender_id),
    FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
    FOREIGN KEY (gender_id) REFERENCES genders  (id) ON DELETE CASCADE
);

INSERT INTO movies (title, director, release_year, genre, rating) VALUES
('Inception', 'Christopher Nolan', 2010, 'Science Fiction', 8.8),
('The Godfather', 'Francis Ford Coppola', 1972, 'Crime', 9.2),
('Pulp Fiction', 'Quentin Tarantino', 1994, 'Crime', 8.9);

INSERT INTO genders (name) VALUES
('Action'),
('Drama'),
('Comedy'),
('Science Fiction'),
('Horror'),
('Romance'),
('Crime');

INSERT INTO movie_genders (movie_id, gender_id) VALUES
(
    (SELECT id FROM movies WHERE title = 'Inception'),
    (SELECT id FROM genders WHERE name = 'Science Fiction')
),
(
    (SELECT id FROM movies WHERE title = 'The Godfather'),
    (SELECT id FROM genders WHERE name = 'Crime')
),
(
    (SELECT id FROM movies WHERE title = 'Pulp Fiction'),
    (SELECT id FROM genders WHERE name = 'Crime')
);

select * from movies;