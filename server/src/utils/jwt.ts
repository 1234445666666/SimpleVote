import jwt from "jsonwebtoken";
import { env } from "../config/env";

// Экспортируй интерфейс
export interface IJWTPayload {
  id: number;
  email: string;
  name: string;
}

export const signToken = (payload: IJWTPayload): string => {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
};

export const verifyToken = (token: string): IJWTPayload | null => {
  try {
    return jwt.verify(token, env.JWT_SECRET) as IJWTPayload;
  } catch (error) {
    return null;
  }
};
