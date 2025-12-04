import express from "express";
import { protect } from "../middleware/auth";
import { validate, schemas } from "../middleware/validate";
import {
  getSurveys,
  createSurvey,
  deleteSurvey,
} from "../controllers/surveyController";

/**
 * Маршруты опросов
 * Все защищены JWT
 * /api/polls
 */
const router = express.Router();

// === ЗАЩИТА ВСЕХ МАРШРУТОВ ===
router.use(protect); // ← Проверяет токен

// GET /api/polls
// → Возвращает опросы пользователя
router.get("/", getSurveys);

// POST /api/polls
// → Создаёт опрос
router.post(
  "/surveys",
  validate(schemas.survey), // ← name_poll: min 3 символа
  createSurvey
);

// DELETE /api/polls/:id
// → Удаляет опрос
router.delete("/:id", deleteSurvey);

export default router;
