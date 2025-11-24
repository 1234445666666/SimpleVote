// === Библиотеки ===
import WebSocket from "ws";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import "./config/db";

// === Конфигурация ===
import { env } from "./config/env";

// === Маршруты ===
import authRoutes from "./routes/auth";
import pollRoutes from "./routes/poll";

// === Middleware ===
import { notFound } from "./middleware/notFound";
import { errorHandler } from "./middleware/errorHandler";

// === Создание приложения ===
const app = express();

// === Глобальные middleware ===
app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://redundantly-agile-redfish.cloudpub.ru/",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// === Маршруты ===
app.use("/api/auth", authRoutes);
app.use("/api/polls", pollRoutes);

// === 404 обработка (ДОЛЖНА БЫТЬ ПОСЛЕ ВСЕХ РОУТОВ) ===
app.use(notFound); // ← УБРАЛ дублирование

// === Обработка ошибок (ДОЛЖНА БЫТЬ ПОСЛЕДНЕЙ) ===
app.use(errorHandler);

// === Запуск сервера ===
app.listen(env.Port, () => {
  console.log(`Сервер запущен на порту ${env.Port}`);
  console.log(`API: http://localhost:${env.Port}/api`);
});
// const wss = new WebSocket.Server({ port: 8080 });

// wss.on("connection", (ws) => {
//   console.log("Новый клиент подключился");

//   ws.on("message", (message) => {
//     console.log("Получено сообщение:", message.toString());
//     wss.clients.forEach((client) => {
//       if (client.readyState === WebSocket.OPEN) {
//         client.send(message.toString());
//       }
//     });
//   });
// });
