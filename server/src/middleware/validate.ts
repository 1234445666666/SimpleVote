import Joi from "joi";
import { NextFunction, Request, Response } from "express";

// Middleware для проверки тела запроса на соответствие схеме Joi
export const validate =
  (schema: Joi.ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: error.details.map((d) => d.message),
      });
    }
    next();
  };

// Исправленные схемы валидации для новой структуры БД
export const schemas = {
  // Регистрация пользователя
  register: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(2).required(),
  }),

  // Вход пользователя
  login: Joi.object({
    email: Joi.string().email().optional(),
    name: Joi.string().min(2).optional(),
    password: Joi.string().required(),
  }).xor("email", "name"), // Должен быть указан email ИЛИ name

  // Создание опроса (теперь без таблицы questions)
  poll: Joi.object({
    title: Joi.string().min(3).max(200).required(),
    description: Joi.string().max(1000).optional().allow(""),
    question_text: Joi.string().min(3).max(500).required(),
    is_public: Joi.boolean().default(true),
    // Теперь options идут сразу в опросе
    options: Joi.array()
      .items(
        Joi.object({
          option_text: Joi.string().min(1).max(200).required(),
        })
      )
      .min(2) // Минимум 2 варианта ответа
      .max(20) // Максимум 20 вариантов
      .required(),
  }),

  // Обновление опроса
  pollUpdate: Joi.object({
    title: Joi.string().min(3).max(200),
    description: Joi.string().max(1000).allow(""),
    question_text: Joi.string().min(3).max(500),
    is_public: Joi.boolean(),
  }),

  // Добавление варианта ответа (теперь ссылается на poll_id вместо question_id)
  option: Joi.object({
    poll_id: Joi.number().integer().min(1).required(),
    option_text: Joi.string().min(1).max(200).required(),
  }),

  // Обновление варианта ответа
  optionUpdate: Joi.object({
    option_text: Joi.string().min(1).max(200),
  }),

  // Голосование
  vote: Joi.object({
    option_id: Joi.number().integer().min(1).required(),
    // user_id будет браться из токена/сессии
  }),

  // Создание опроса (упрощенная версия для быстрого тестирования)
  quickSurvey: Joi.object({
    title: Joi.string().min(3).max(200).required(),
    question_text: Joi.string().min(3).max(500).required(),
    // Массив строк для вариантов ответа
    options: Joi.array()
      .items(Joi.string().min(1).max(200))
      .min(2)
      .max(10)
      .required(),
  }),

  // Комментарий к опросу (если нужно будет добавить)
  comment: Joi.object({
    survey_id: Joi.number().integer().min(1).required(),
    text: Joi.string().min(1).max(1000).required(),
  }),

  // Поиск опросов
  search: Joi.object({
    query: Joi.string().min(1).max(100),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(20),
  }),
};
