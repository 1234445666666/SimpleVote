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
  // Таблица пользователей
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      username TEXT NOT NULL
    )
  `);

  // Таблица опросов
  db.run(`
    CREATE TABLE IF NOT EXISTS polls (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      user_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    )
  `);

  // Таблица вариантов ответов
  db.run(`
    CREATE TABLE IF NOT EXISTS poll_options (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      poll_id INTEGER NOT NULL,
      text TEXT NOT NULL,
      votes INTEGER DEFAULT 0,
      FOREIGN KEY (poll_id) REFERENCES polls (id) ON DELETE CASCADE
    )
  `);

  // Таблица голосов (чтобы пользователь мог голосовать только 1 раз)
  db.run(`
    CREATE TABLE IF NOT EXISTS votes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      poll_id INTEGER NOT NULL,
      option_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id),
      FOREIGN KEY (poll_id) REFERENCES polls (id),
      FOREIGN KEY (option_id) REFERENCES poll_options (id),
      UNIQUE(user_id, poll_id)
    )
  `);
});

export default db;
