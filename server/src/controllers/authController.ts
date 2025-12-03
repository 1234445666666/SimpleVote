import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { IJWTPayload } from "../utils/jwt";
import { signToken } from "../utils/jwt";
import db from "../config/db";

interface User {
  id: number;
  email: string;
  password: string;
  name: string;
}

export const register = (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  db.run(
    "INSERT INTO users (email, password, name) VALUES (?, ?, ?)",
    [email, hashedPassword, name],
    function (err) {
      if (err) {
        if (err.message.includes("UNIQUE constraint failed")) {
          return res.status(400).json({ error: "Email уже используется" });
        }
        return res.status(500).json({ error: "Ошибка базы данных" });
      }

      const token = signToken({
        id: this.lastID,
        email,
        name,
      });

      res.status(201).json({
        token,
        user: { id: this.lastID, email, name },
      });
    }
  );
};

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;

  db.get(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, user: User | undefined) => {
      if (err) return res.status(500).json({ error: "Ошибка базы данных" });

      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ error: "Неверный email или пароль" });
      }

      const token = signToken({
        id: user.id,
        email: user.email,
        name: user.name,
      });

      res.json({
        token,
        user: { id: user.id, email: user.email, name: user.name },
      });
    }
  );
};

export const getMe = (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: "Не авторизован" });
  }

  db.get(
    "SELECT id, email, name  FROM users WHERE id = ?",
    [req.user.id],
    (err, user: any) => {
      if (err) {
        console.error("Database error in getMe:", err);
        return res.status(500).json({ error: "Ошибка базы данных" });
      }

      if (!user) {
        return res.status(404).json({ error: "Пользователь не найден" });
      }

      res.json({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      });
    }
  );
};
