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
('Pulp Fiction', 'Quentin Tarantino', 1994, 'Crime', 8.9),
('The Dark Knight', 'Christopher Nolan', 2008, 'Action', 9.0),
('Forrest Gump', 'Robert Zemeckis', 1994, 'Drama', 8.8),
('The Matrix', 'The Wachowskis', 1999, 'Science Fiction', 8.7),
('Titanic', 'James Cameron', 1997, 'Romance', 7.8),
('The Shining', 'Stanley Kubrick', 1980, 'Horror', 8.4),
('The Hangover', 'Todd Phillips', 2009, 'Comedy', 7.7),
('Gladiator', 'Ridley Scott', 2000, 'Action', 8.5),
('The Silence of the Lambs', 'Jonathan Demme', 1991, 'Horror', 8.6),
('La La Land', 'Damien Chazelle', 2016, 'Romance', 8.0);


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