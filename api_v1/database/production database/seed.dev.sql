-- Seed data for database

\c poke_connect;

INSERT INTO users (username, first_name, email, hashed_password) 
VALUES ('test user1', 'test', 'test1@test.com', 'testpassword');

INSERT INTO users (username, first_name, email, hashed_password) 
VALUES ('test user2', 'test', 'test2@test.com', 'testpassword');

INSERT INTO users (username, first_name, email, hashed_password) 
VALUES ('test user3', 'test', 'test3@test.com', 'testpassword');

