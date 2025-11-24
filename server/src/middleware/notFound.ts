import { Request, Response } from "express";
// src/middleware/notFound.ts
/**
 * Middleware: 404 для несуществующих маршрутов
 * Должен быть ПОСЛЕДНИМ в app.use()
 */
export const notFound = (req: Request, res: Response): void => {
  res.status(404).json({
    error: "Маршрут не найден",
    method: req.method,
    path: req.originalUrl,
  });
};
