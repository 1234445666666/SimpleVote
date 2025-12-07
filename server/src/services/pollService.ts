// src/services/pollService.ts
import db from "../config/db";

export const pollService = {
  // Создать опрос
  create: async (pollData: any, userId: number): Promise<number> => {
    return new Promise((resolve, reject) => {
      const { title, description = "", options } = pollData;

      db.run(
        "INSERT INTO polls (title, description, user_id) VALUES (?, ?, ?)",
        [title, description, userId],
        function (err) {
          if (err) {
            reject(err);
            return;
          }

          const pollId = this.lastID;
          const placeholders = options.map(() => "(?, ?)").join(", ");
          const values = options.flatMap((option: string) => [pollId, option]);

          db.run(
            `INSERT INTO poll_options (poll_id, text) VALUES ${placeholders}`,
            values,
            function (err) {
              if (err) {
                reject(err);
                return;
              }

              resolve(pollId);
            }
          );
        }
      );
    });
  },

  // Получить все опросы
  getAll: async (): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      db.all(
        `
        SELECT p.*, u.username as author 
        FROM polls p 
        LEFT JOIN users u ON p.user_id = u.id 
        ORDER BY p.created_at DESC
      `,
        [],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  },

  // Получить опрос по ID
  getById: async (pollId: number): Promise<any> => {
    return new Promise((resolve, reject) => {
      db.get(
        `
        SELECT p.*, u.username as author 
        FROM polls p 
        LEFT JOIN users u ON p.user_id = u.id 
        WHERE p.id = ?
      `,
        [pollId],
        (err, poll) => {
          if (err || !poll) {
            reject(new Error("Опрос не найден"));
            return;
          }

          db.all(
            "SELECT * FROM poll_options WHERE poll_id = ?",
            [pollId],
            (err, options) => {
              if (err) {
                reject(err);
                return;
              }

              (poll as any).options = options;
              resolve(poll);
            }
          );
        }
      );
    });
  },

  // Проголосовать
  vote: async (
    pollId: number,
    optionId: number,
    userId: number
  ): Promise<any> => {
    return new Promise((resolve, reject) => {
      // Проверяем, голосовал ли уже пользователь
      db.get(
        "SELECT * FROM votes WHERE user_id = ? AND poll_id = ?",
        [userId, pollId],
        (err, existingVote) => {
          if (err) {
            reject(err);
            return;
          }

          if (existingVote) {
            reject(new Error("Вы уже голосовали в этом опросе"));
            return;
          }

          // Начинаем транзакцию
          db.serialize(() => {
            db.run("BEGIN TRANSACTION");

            // Добавляем голос
            db.run(
              "INSERT INTO votes (user_id, poll_id, option_id) VALUES (?, ?, ?)",
              [userId, pollId, optionId],
              (err) => {
                if (err) {
                  db.run("ROLLBACK");
                  reject(err);
                  return;
                }

                // Увеличиваем счетчик голосов
                db.run(
                  "UPDATE poll_options SET votes = votes + 1 WHERE id = ?",
                  [optionId],
                  (err) => {
                    if (err) {
                      db.run("ROLLBACK");
                      reject(err);
                      return;
                    }

                    db.run("COMMIT", (err) => {
                      if (err) {
                        reject(err);
                        return;
                      }

                      // Возвращаем обновленный опрос
                      pollService.getById(pollId).then(resolve).catch(reject);
                    });
                  }
                );
              }
            );
          });
        }
      );
    });
  },

  // Получить голоса для опроса
  getVotes: async (pollId: number): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      db.all(
        "SELECT id, text, votes FROM poll_options WHERE poll_id = ? ORDER BY id",
        [pollId],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  },

  // Удалить опрос
  delete: async (pollId: number, userId: number): Promise<number> => {
    return new Promise((resolve, reject) => {
      db.run(
        "DELETE FROM polls WHERE id = ? AND user_id = ?",
        [pollId, userId],
        function (err) {
          if (err) reject(err);
          else resolve(this.changes);
        }
      );
    });
  },

  // Получить опросы пользователя
  getByUser: async (userId: number): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      db.all(
        "SELECT * FROM polls WHERE user_id = ? ORDER BY created_at DESC",
        [userId],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  },
};
