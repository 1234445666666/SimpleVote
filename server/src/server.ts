// === Библиотеки ===
import express from "express";
import { createServer } from "http";
import { WebSocketServer, WebSocket } from "ws";
import cors from "cors";
import helmet from "helmet";

// === Конфигурация ===
import { env } from "./config/env";

// === Маршруты ===
import authRoutes from "./routes/auth";
import pollRoutes from "./routes/poll";

// === Middleware ===
import { notFound } from "./middleware/notFound";
import { errorHandler } from "./middleware/errorHandler";

// === Создание Express приложения ===
const app = express();

// === Создание HTTP сервера (для WebSocket) ===
const server = createServer(app);

// === Создание WebSocket сервера ===
const wss = new WebSocketServer({ server });

// === Хранилище клиентов по опросам ===
// pollId -> Set клиентов
const pollClients = new Map<number, Set<WebSocket>>();

// === Глобальные middleware ===
// Helmet для защиты
app.use(helmet());

// CORS для разрешенных доменов
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:8080",
      "https://redundantly-agile-redfish.cloudpub.ru",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Парсинг JSON
app.use(express.json());

// === API маршруты ===
app.use("/api/auth", authRoutes); // → /api/auth/register, /api/auth/login
app.use("/api/polls", pollRoutes); // → /api/polls, /api/polls/:id, /api/polls/:id/vote

// === WebSocket обработка ===
wss.on("connection", (ws: WebSocket) => {
  console.log("🌐 Новый клиент подключился");

  // Приветственное сообщение
  ws.send(
    JSON.stringify({
      type: "welcome",
      message: "Подключение установлено",
    })
  );

  // Обработка сообщений от клиента
  ws.on("message", (message: Buffer) => {
    try {
      const data = JSON.parse(message.toString());

      // Подписка на опрос
      if (data.type === "subscribe" && data.pollId) {
        const pollId = data.pollId;

        // Создаем Set для опроса, если его нет
        if (!pollClients.has(pollId)) {
          pollClients.set(pollId, new Set());
        }

        // Добавляем клиента в Set опроса
        pollClients.get(pollId)!.add(ws);

        // Сохраняем pollId в клиенте
        (ws as any).pollId = pollId;

        console.log(`📊 Клиент подписался на опрос ${pollId}`);

        // Отправляем подтверждение
        ws.send(
          JSON.stringify({
            type: "subscribed",
            pollId: pollId,
            message: `Вы подписаны на обновления опроса ${pollId}`,
          })
        );
      }

      // Отписка от опроса
      if (data.type === "unsubscribe" && data.pollId) {
        const pollId = data.pollId;

        if (pollClients.has(pollId)) {
          pollClients.get(pollId)!.delete(ws);
          console.log(`📊 Клиент отписался от опроса ${pollId}`);
        }
      }
    } catch (error) {
      console.error("❌ Ошибка обработки сообщения:", error);
    }
  });

  // Обработка отключения клиента
  ws.on("close", () => {
    console.log("🔌 Клиент отключился");

    // Удаляем клиента из всех опросов
    const pollId = (ws as any).pollId;
    if (pollId && pollClients.has(pollId)) {
      pollClients.get(pollId)!.delete(ws);
    }
  });

  // Обработка ошибок
  ws.on("error", (error) => {
    console.error("❌ WebSocket ошибка:", error);
  });
});

// === Функция для отправки обновлений ===
// Отправляет обновления голосов всем подписанным клиентам
export const sendPollUpdate = (pollId: number, votes: any) => {
  if (pollClients.has(pollId)) {
    const message = JSON.stringify({
      type: "votes_update",
      pollId: pollId,
      votes: votes,
      timestamp: new Date().toISOString(),
    });

    // Отправляем всем подписанным клиентам
    pollClients.get(pollId)!.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });

    console.log(`📤 Отправлено обновление для опроса ${pollId}`);
  }
};

// === 404 обработка ===
app.use(notFound);

// === Обработка ошибок ===
app.use(errorHandler);

// === Запуск сервера ===
server.listen(env.Port, () => {
  console.log(`🚀 Сервер запущен на порту ${env.Port}`);
  console.log(`🌐 HTTP: http://localhost:${env.Port}`);
  console.log(`🔌 WebSocket: ws://localhost:${env.Port}`);
});
