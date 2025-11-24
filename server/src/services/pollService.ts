// src/services/todoService.ts
import db from "../config/db";

export const pollService = {
  getAll: (userId, callback) => {
    db.all(
      "SELECT * FROM todos WHERE user_id = ? ORDER BY created_at DESC",
      [userId],
      callback
    );
  },

  create: (task, userId, callback) => {
    db.run(
      "INSERT INTO todos (task, user_id) VALUES (?, ?)",
      [task, userId],
      callback
    );
  },

  delete: (id, userId, callback) => {
    db.run(
      "DELETE FROM todos WHERE id = ? AND user_id = ?",
      [id, userId],
      callback
    );
  },
};
