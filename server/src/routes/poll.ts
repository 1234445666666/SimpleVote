import express from "express";
import { protect } from "../middleware/auth";
import { validate, schemas } from "../middleware/validate";
import {
  getPolls,
  createPoll,
  deletePoll,
} from "../controllers/pollController";

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
router.get("/", getPolls);

// POST /api/polls
// → Создаёт опрос
router.post(
  "/",
  validate(schemas.poll), // ← name_poll: min 3 символа
  createPoll
);

// DELETE /api/polls/:id
// → Удаляет опрос
router.delete("/:id", deletePoll);

export default router;
