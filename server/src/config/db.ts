// src/config/db.js
import sqlite3 from "sqlite3";
import path from "path";
import fs from "fs";
import { env } from "./env";

// Извлекает директорию из пути.
const dbDir = path.dirname(env.DB_PATH);

// Создать каталог базы данных, если он не существует.
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Инициализация и подключение к базе данных SQLite
// Создаёт файл, если его нет
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
      name TEXT NOT NULL
    )
  `);

  // Таблица опросов
  db.run(`
    CREATE TABLE IF NOT EXISTS polls (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name_poll TEXT NOT NULL,
      user_id INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      is_public BOOLEAN DEFAULT 1, -- публичный или приватный опрос
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `);

  // Таблица вопросов в опросе
  db.run(`
    CREATE TABLE IF NOT EXISTS questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      poll_id INTEGER,
      question_text TEXT NOT NULL,
      question_type TEXT DEFAULT 'single', -- single/multiple (один или несколько вариантов)
      question_order INTEGER DEFAULT 0, -- порядок вопросов
      FOREIGN KEY (poll_id) REFERENCES polls (id) ON DELETE CASCADE
    )
  `);

  // Таблица вариантов ответов
  db.run(`
    CREATE TABLE IF NOT EXISTS options (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      question_id INTEGER,
      option_text TEXT NOT NULL,
      option_order INTEGER DEFAULT 0,
      FOREIGN KEY (question_id) REFERENCES questions (id) ON DELETE CASCADE
    )
  `);

  // Таблица голосов
  db.run(`
    CREATE TABLE IF NOT EXISTS votes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      option_id INTEGER,
      user_id INTEGER, -- NULL если анонимное голосование
      voted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      session_id TEXT, -- для анонимных пользователей
      FOREIGN KEY (option_id) REFERENCES options (id),
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `);
});

export default db;
