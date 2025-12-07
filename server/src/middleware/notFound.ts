import { Request, Response } from "express";

export const notFound = (req: Request, res: Response): void => {
  res.status(404).json({
    error: "Маршрут не найден",
    method: req.method,
    path: req.originalUrl,
  });
};
