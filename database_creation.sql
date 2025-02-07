CREATE DATABASE movies_scraping;

\c movies_scraping

CREATE TYPE country_status AS ENUM ('active', 'inactive');

CREATE TABLE country_table (
    country_id SERIAL PRIMARY KEY,
    country_name TEXT NOT NULL,
    country_image TEXT,
    country_code TEXT,
    status country_status DEFAULT 'active' NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITHOUT TIME ZONE
    -- FOREIGN KEY (zone_id) REFERENCES zone_table(zone_id)
);

CREATE TYPE user_role_status AS ENUM ('active', 'inactive');

CREATE TABLE user_role_table (
    role_id SERIAL PRIMARY KEY,
    role_name TEXT NOT NULL,
    role_code TEXT,
    status user_role_status DEFAULT 'active' NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITHOUT TIME ZONE
);

CREATE TYPE user_status AS ENUM ('active', 'inactive');

CREATE TABLE user_table (
    user_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    user_image TEXT,
    role_id INTEGER NOT NULL,
    email TEXT,
    password TEXT,
    status country_status DEFAULT 'active' NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITHOUT TIME ZONE,
    FOREIGN KEY (role_id) REFERENCES user_role_table(role_id)
);

CREATE TYPE theater_status AS ENUM ('active', 'inactive');

CREATE TABLE theater_table (
    theater_id SERIAL PRIMARY KEY,
    theater_name TEXT NOT NULL,
    theater_image TEXT,
    country_id INTEGER NOT NULL,
    address TEXT,
    lat TEXT,
    lng TEXT,
    status theater_status DEFAULT 'active' NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITHOUT TIME ZONE,
    FOREIGN KEY (country_id) REFERENCES country_table(country_id)
);

CREATE TYPE movie_status AS ENUM ('active', 'inactive');

CREATE TABLE movie_table (
    movie_id SERIAL PRIMARY KEY,
    movie_name TEXT NOT NULL,
    movie_image TEXT,
    theater_id INTEGER NOT NULL,
    country_id INTEGER,
    category TEXT,
    status theater_status DEFAULT 'active' NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITHOUT TIME ZONE,
    FOREIGN KEY (theater_id) REFERENCES theater_table(theater_id),
    FOREIGN KEY (country_id) REFERENCES country_table(country_id)
);

CREATE TYPE showtime_status AS ENUM ('active', 'inactive');

CREATE TABLE showtime_table (
    showtime_id SERIAL PRIMARY KEY,
    showtime_date DATE NOT NULL,
    showtime_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    movie_id INTEGER NOT NULL,
    booking_url TEXT,
    format TEXT,
    dubbed_language TEXT,
    subtitle_language TEXT,
    status theater_status DEFAULT 'active' NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITHOUT TIME ZONE,
    FOREIGN KEY (movie_id) REFERENCES movie_table(movie_id)
);

INSERT INTO country_table (country_name, country_code) VALUES ('Poland', 'PL');

ALTER TABLE showtime_table ADD COLUMN theater_id INTEGER REFERENCES theater_table (theater_id);