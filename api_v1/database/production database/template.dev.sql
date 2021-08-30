DROP DATABASE IF EXISTS poke_connect;

CREATE DATABASE poke_connect;

\c poke_connect;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    first_name varchar(50) NOT NULL,
    username varchar(15) UNIQUE,
    email varchar(50) UNIQUE,
    hashed_password varchar(255) NOT NULL,
    is_admin BOOLEAN NOT NULL
);

CREATE TABLE pokemon (
    pokemon_id SERIAL PRIMARY KEY,
    api_id int UNIQUE
);

CREATE TABLE user_pokemon (
    user_id int REFERENCES users (user_id) ON DELETE CASCADE,
    pokemon_id int REFERENCES pokemon (pokemon_id) ON DELETE CASCADE,
    UNIQUE (user_id, pokemon_id)
);