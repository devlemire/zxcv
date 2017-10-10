-- Database
CREATE DATABASE zxcv;

-- Connect to the DATABASE: \c zxcv;

-- Email Table
CREATE TABLE emails (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE
);