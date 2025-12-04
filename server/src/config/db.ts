import sqlite3 from "sqlite3";
import path from "path";
import fs from "fs";
import { env } from "./env";

const dbDir = path.dirname(env.DB_PATH);

if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new sqlite3.Database(env.DB_PATH, (err) => {
  if (err) console.error("DB Error:", err);
  else console.log("DB Connected:", env.DB_PATH);
});

db.serialize(() => {
  // Основные таблицы
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS polls (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      name_poll TEXT NOT NULL,          
      question_text TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      is_public BOOLEAN DEFAULT 1,
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS options (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      poll_id INTEGER NOT NULL,
      option_text TEXT NOT NULL,
      option_order INTEGER DEFAULT 0,
      vote_count INTEGER DEFAULT 0,
      FOREIGN KEY (poll_id) REFERENCES polls (id) ON DELETE CASCADE
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS votes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      option_id INTEGER NOT NULL,
      user_id INTEGER,
      voted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      session_id TEXT,
      FOREIGN KEY (option_id) REFERENCES options (id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE SET NULL,
      UNIQUE(user_id, option_id)
    )
  `);

  db.run(`CREATE INDEX IF NOT EXISTS idx_polls_user_id ON polls(user_id)`);
  db.run(`CREATE INDEX IF NOT EXISTS idx_options_poll_id ON options(poll_id)`);
  db.run(`CREATE INDEX IF NOT EXISTS idx_votes_option_id ON votes(option_id)`);
  db.run(`CREATE INDEX IF NOT EXISTS idx_votes_user_id ON votes(user_id)`);
});

export default db;
