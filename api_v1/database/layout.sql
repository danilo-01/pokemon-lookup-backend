DROP DATABASE IF EXISTS poke_connect;

CREATE DATABASE poke_connect;

\c poke_connect;

CREATE TABLE users (
    user_id int PRIMARY KEY,
    first_name varchar(20) NOT NULL,
    username varchar(15) UNIQUE,
    email varchar(255) UNIQUE,
    hashed_password varchar(255) NOT NULL
);

CREATE TABLE pokemon (
    pokemon_id int PRIMARY KEY,
    name varchar(255) UNIQUE,
    api_id int UNIQUE
);

CREATE TABLE user_pokemon (
    user_id int,
    pokemon_id int,
    FOREIGN KEY (user_id) REFERENCES  users(user_id),
    FOREIGN KEY (pokemon_id) REFERENCES pokemon(pokemon_id)
);