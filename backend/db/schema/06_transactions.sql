DROP TABLE IF EXISTS transactions CASCADE;

CREATE TABLE transactions (
  id SERIAL PRIMARY KEY NOT NULL,
  portfolio_coins_id INTEGER REFERENCES portfolio_coins(id) ON DELETE CASCADE,
  price_per_coin REAL NOT NULL,
  quantity INTEGER,
  total_spent REAL NOT NULL,
  date TIMESTAMP DEFAULT Now(),
  fee REAL,
  note TEXT
);