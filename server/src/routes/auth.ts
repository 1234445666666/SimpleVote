import express from "express";
import { register, login, getMe } from "../controllers/authController";
import { validate, schemas } from "../middleware/validate";
import { protect } from "../middleware/auth";

const router = express.Router();

router.post("/register", validate(schemas.register), register);
router.post("/login", validate(schemas.login), login);
router.get("/me", protect, getMe);

export default router;
