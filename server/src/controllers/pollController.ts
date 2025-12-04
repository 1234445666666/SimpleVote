// src/controllers/pollController.js
import { pollService } from "../services/pollService";
import db from "../config/db";

// getPolls нужен для получения всех опросов пользователей
export const getPolls = (req, res) => {
  const userId = req.user.id;

  pollService.getAll(userId, (err, todos) => {
    if (err) return res.status(500).json({ error: "DB Error" });
    res.json(todos);
  });
};

// createPoll нужен для создания нового опроса
export const createPoll = (req, res) => {
  const { task } = req.body;
  const userId = req.user.id;

  pollService.create(task, userId, function (err) {
    if (err) return res.status(500).json({ error: "DB Error" });

    // Возвращаем новую задачу с ID
    // surveyService.getAll(userId, (err, todos) => {
    //   const newTodo = todos.find((t) => t.task === task);
    //   res.status(201).json(newTodo);
    // });
  });
};

// deletePoll нужен для удаления задачи
export const deletePoll = (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  pollService.delete(id, userId, function (err) {
    if (err) return res.status(500).json({ error: "DB Error" });
    if (this.changes === 0)
      // Проверка успеха удаления
      return res.status(404).json({ error: "Not found or not yours" });
    res.json({ message: "Deleted" });
  });
};
