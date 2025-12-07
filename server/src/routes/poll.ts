import express from "express";
import { protect } from "../middleware/auth";
import { validate, schemas } from "../middleware/validate";
import {
  createPoll,
  getAllPolls,
  getPoll,
  vote,
  deletePoll,
  getUserPolls,
} from "../controllers/pollController";

const router = express.Router();

// Публичные маршруты
router.get("/", getAllPolls);
router.get("/:id", getPoll);

// Защищенные маршруты
router.use(protect);

router.post("/", createPoll);
router.post("/:id/vote", validate(schemas.vote), vote);
router.delete("/:id", deletePoll);
router.get("/user/my", getUserPolls);

export default router;
