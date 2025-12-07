import { Request, Response } from "express";
import { pollService } from "../services/pollService";
import { sendPollUpdate } from "../server";

export const vote = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Не авторизован" });
      return;
    }

    const { id } = req.params;
    const { optionId } = req.body;
    const userId = req.user.id;

    const poll = await pollService.vote(parseInt(id), optionId, userId);

    // Получаем обновленные голоса
    const votes = await pollService.getVotes(parseInt(id));

    // Отправляем обновление через WebSocket
    sendPollUpdate(parseInt(id), votes);

    res.json(poll);
  } catch (error: any) {
    if (error.message === "Вы уже голосовали в этом опросе") {
      res.status(400).json({ error: error.message });
    } else if (error.message === "Опрос не найден") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Ошибка сервера" });
    }
  }
};

// Остальные функции остаются без изменений
export const createPoll = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Не авторизован" });
      return;
    }

    const pollData = req.body;
    const userId = req.user.id;

    const pollId = await pollService.create(pollData, userId);
    const poll = await pollService.getById(pollId);

    res.status(201).json(poll);
  } catch (error: any) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

export const getAllPolls = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const polls = await pollService.getAll();
    res.json(polls);
  } catch (error: any) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

export const getPoll = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const poll = await pollService.getById(parseInt(id));
    res.json(poll);
  } catch (error: any) {
    res.status(404).json({ error: "Опрос не найден" });
  }
};

export const deletePoll = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Не авторизован" });
      return;
    }

    const { id } = req.params;
    const userId = req.user.id;

    const changes = await pollService.delete(parseInt(id), userId);

    if (changes === 0) {
      res.status(404).json({ error: "Опрос не найден или нет прав" });
      return;
    }

    res.json({ message: "Опрос удален" });
  } catch (error: any) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

export const getUserPolls = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Не авторизован" });
      return;
    }

    const userId = req.user.id;
    const polls = await pollService.getByUser(userId);

    res.json(polls);
  } catch (error: any) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
};
