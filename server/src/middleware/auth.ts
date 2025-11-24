// // src/middleware/auth.js
// import { verifyToken } from "../utils/jwt";
// import { NextFunction, Request, Response } from "express";

// /**
//  * Middleware: Защищает маршруты
//  * Проверяет JWT-токен в заголовке Authorization
//  * Добавляет req.user = { id: 1 }
//  */
// export const protect = (req: Request, res: Response, next: NextFunction) => {
//   // 1. Получаем заголовок
//   const authHeader = req.headers.authorization;

//   // 2. Проверяем формат: Bearer <token>
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({
//       error: "Доступ запрещён: токен не предоставлен",
//     });
//   }

//   // 3. Извлекаем токен
//   const token = authHeader.split(" ")[1];

//   // 4. Проверяем подпись и срок
//   const payload = verifyToken(token);

//   if (!payload) {
//     return res.status(401).json({
//       error: "Неверный или просроченный токен",
//     });
//   }

//   // 5. Сохраняем пользователя в запрос
//   (req as any).user = payload; // { id: 1 }

//   // 6. Передаём управление
//   next();
// };

import { verifyToken } from "../utils/jwt";
import { Request, Response, NextFunction } from "express";
import { IJWTPayload } from "../utils/jwt";

// Расширяем Request тип
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

  req.user = payload;
  next();
};
