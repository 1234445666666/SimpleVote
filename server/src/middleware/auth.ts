import { verifyToken } from "../utils/jwt";
import { Request, Response, NextFunction } from "express";
import { IJWTPayload } from "../utils/jwt";
import db from "../config/db";

declare global {
  namespace Express {
    interface Request {
      user?: IJWTPayload;
    }
  }
}

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "Доступ запрещён: токен не предоставлен",
    });
  }

  const token = authHeader.split(" ")[1];
  const payload = verifyToken(token);

  if (!payload) {
    return res.status(401).json({
      error: "Неверный или просроченный токен",
    });
  }

  db.get(
    "SELECT id, email, name FROM users WHERE id = ?",
    [payload.id],
    (err, user: { id: number; email: string; name: string }) => {
      if (err) {
        console.error("Database error in protect:", err);
        return res.status(500).json({ error: "Ошибка базы данных" });
      }

      if (!user) {
        return res.status(401).json({
          error: "Пользователь не найден",
        });
      }

      req.user = {
        id: user.id,
        email: user.email,
        name: user.name,
      };

      next();
    }
  );
};
