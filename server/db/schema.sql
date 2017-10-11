-- Database
CREATE DATABASE zxcv;

-- Connect to the DATABASE: \c zxcv;

-- Submissions Table
CREATE TABLE submissions (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  web SMALLINT,
  ios SMALLINT,
  uiux SMALLINT,
  qa SMALLINT,
  salesforce SMALLINT
);