// src/services/todoService.ts
import db from "../config/db";

export const surveyService = {
  getAll: (userId, callback) => {
    db.all(
      "SELECT * FROM todos WHERE user_id = ? ORDER BY created_at DESC",
      [userId],
      callback
    );
  },

  create: (id, question_text, is_public) => {
    db.run(
      "INSERT INTO surveys (id, question_text, is_public,) VALUES (?, ?, ?)",
      [id, question_text, is_public]
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
