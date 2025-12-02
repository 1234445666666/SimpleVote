import detenv from "dotenv";
detenv.config();

interface IEnv {
  Port: number | string;
  DB_PATH: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
}

export const env: IEnv = {
  Port: process.env.PORT || 6700,
  DB_PATH: process.env.DB_PATH || "./database/survey.db",
  JWT_SECRET: process.env.JWT_SECRET || "supersecretkey123",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
};
