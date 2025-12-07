import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error("Ошибка:", err);

  res.status(500).json({
    error: "Внутренняя ошибка сервера",
    message: err.message,
  });
};
