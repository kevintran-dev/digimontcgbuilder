CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(25) UNIQUE,
  password TEXT NOT NULL
);

CREATE TABLE decks (
  id SERIAL PRIMARY KEY,
  deckname TEXT,
  deck TEXT NOT NULL,
  username TEXT,
  FOREIGN KEY (username) REFERENCES users(username)
);

-- CREATE TABLE userdecks(
--     id SERIAL PRIMARY KEY,
--     username TEXT,
--     FOREIGN KEY (username) REFERENCES users(username),
--     deckid INTEGER,
--     FOREIGN KEY (deckid) REFERENCES decks(id)
-- )
