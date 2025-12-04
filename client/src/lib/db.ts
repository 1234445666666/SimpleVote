import sqlite3 from "sqlite3";
import { open, Database } from "sqlite3";

let db: Database | null = null;

export async function connectToDatabase() {
  if (!db) {
    db = await open({
      filename: "./mydatabase.db", // путь к вашей базе данных
      driver: sqlite3.Database,
    });
  }
  return db;
}
