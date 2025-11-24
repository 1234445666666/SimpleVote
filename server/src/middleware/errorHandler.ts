import { NextFunction, Request, Response } from "express";

// src/middleware/errorHandler.ts
/**
 * Глобальный обработчик ошибок
 * Ловит ВСЕ ошибки из try/catch, throw, next(err)
 */

// Кастомный интерфейс для ошибок с возможностью указания статуса
interface AppError extends Error {
  status?: number;
  statusCode?: number;
}

export const errorHandler = (
  err: AppError, // ← используем наш кастомный интерфейс вместо Error
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Логируем в консоль (для разработчика)
  console.error("Ошибка сервера:", err);

  // Определяем статус (проверяем оба возможных свойства)
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Внутренняя ошибка сервера";

  // Возвращаем JSON
  res.status(status).json({
    error: message,
    // В продакшене: убрать stack!
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
