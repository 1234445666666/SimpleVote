// src/routes/auth.js
import express from "express";
import { register, login, getMe } from "../controllers/authController";
import { validate, schemas } from "../middleware/validate";
import { protect } from "../middleware/auth";

/**
 * Маршруты аутентификации
 * /api/auth/register
 * /api/auth/login
 */
const router = express.Router();

// POST /api/auth/register
// Валидация → Контроллер
router.post(
  "/register",
  validate(schemas.register), // ← Проверка email, password, name
  register // ← Создание пользователя + JWT
);

// POST /api/auth/login
router.post(
  "/login",
  validate(schemas.login), // ← Проверка email, password
  login // ← Поиск + JWT
);

router.get("/me", protect, getMe); // ← защищённый маршрут!

export default router;
