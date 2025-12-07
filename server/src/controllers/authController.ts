import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import db from "../config/db";
import { signToken, verifyToken } from "../utils/jwt";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, username } = req.body;

    // Валидация
    if (!email || !password || !username) {
      res.status(400).json({ error: "Все поля обязательны" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Проверяем, есть ли пользователь
    db.get(
      "SELECT * FROM users WHERE email = ?",
      [email],
      (err: any, user: any) => {
        if (err) {
          console.error("DB Error:", err);
          res.status(500).json({ error: "Ошибка базы данных" });
          return;
        }

        if (user) {
          res.status(400).json({ error: "Email уже существует" });
          return;
        }

        // Создаём пользователя
        db.run(
          "INSERT INTO users (email, password, username) VALUES (?, ?, ?)",
          [email, hashedPassword, username],
          function (err: any) {
            if (err) {
              console.error("DB Error:", err);
              res.status(500).json({ error: "Ошибка базы данных" });
              return;
            }

            const token = signToken({
              id: this.lastID,
              username: username,
            });

            res.status(201).json({
              token,
              user: {
                id: this.lastID,
                email,
                username,
                name: username, // добавляем поле name для совместимости
              },
            });
          }
        );
      }
    );
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Валидация
    if (!email || !password) {
      res.status(400).json({ error: "Email и пароль обязательны" });
      return;
    }

    db.get(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err: any, user: any) => {
        if (err) {
          console.error("DB Error:", err);
          res.status(500).json({ error: "Ошибка базы данных" });
          return;
        }

        if (!user) {
          res.status(401).json({ error: "Неверные учетные данные" });
          return;
        }

        // Проверяем пароль
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          res.status(401).json({ error: "Неверные учетные данные" });
          return;
        }

        const token = signToken({
          id: user.id,
          username: user.username,
        });

        res.json({
          token,
          user: {
            id: user.id,
            email: user.email,
            username: user.username,
            name: user.username, // добавляем поле name
          },
        });
      }
    );
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }
};

export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Не авторизован" });
      return;
    }

    // Ищем пользователя в БД для получения актуальных данных
    db.get(
      "SELECT * FROM users WHERE id = ?",
      [req.user.id],
      (err: any, user: any) => {
        if (err) {
          console.error("DB Error:", err);
          res.status(500).json({ error: "Ошибка базы данных" });
          return;
        }

        if (!user) {
          res.status(404).json({ error: "Пользователь не найден" });
          return;
        }

        res.json({
          user: {
            id: user.id,
            email: user.email,
            username: user.username,
            name: user.username, // поле name для фронтенда
          },
        });
      }
    );
  } catch (error) {
    console.error("GetMe error:", error);
    res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }
};
