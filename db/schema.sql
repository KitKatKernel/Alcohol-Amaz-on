-- Create User table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    age INTEGER CHECK (age >= 0),
    saved_recipes TEXT,
    submitted_reviews TEXT
);

-- Create Ingredient table
CREATE TABLE ingredients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Create Beverage table
CREATE TABLE beverages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    ingredient_ids INTEGER[] REFERENCES ingredients(id)
);

-- Create Review table
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    beverage_id INTEGER REFERENCES beverages(id) ON DELETE CASCADE,
    review TEXT
);

-- Create List table
CREATE TABLE lists (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    beverage_id INTEGER REFERENCES beverages(id) ON DELETE CASCADE,
    prices NUMERIC[]
);
