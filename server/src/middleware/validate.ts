import Joi from "joi";
import { Request, Response, NextFunction } from "express";

export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      res.status(400).json({
        error: "Validation error",
        details: error.details.map((d) => ({
          message: d.message,
          path: d.path,
        })),
      });
      return;
    }

    next();
  };
};

export const schemas = {
  register: Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Email должен быть валидным",
      "any.required": "Email обязателен",
    }),
    password: Joi.string().min(6).required().messages({
      "string.min": "Пароль должен быть не менее 6 символов",
      "any.required": "Пароль обязателен",
    }),
    username: Joi.string().min(2).required().messages({
      "string.min": "Имя пользователя должно быть не менее 2 символов",
      "any.required": "Имя пользователя обязательно",
    }),
  }),

  login: Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Email должен быть валидным",
      "any.required": "Email обязателен",
    }),
    password: Joi.string().required().messages({
      "any.required": "Пароль обязателен",
    }),
  }),

  createPoll: Joi.object({
    title: Joi.string().min(3).required().messages({
      "string.min": "Название должно быть не менее 3 символов",
      "any.required": "Название обязательно",
    }),
    description: Joi.string().allow("").optional(),
    options: Joi.array().items(Joi.string().min(1)).min(2).required().messages({
      "array.min": "Должно быть не менее 2 вариантов ответа",
      "any.required": "Варианты ответа обязательны",
    }),
  }),

  vote: Joi.object({
    optionId: Joi.number().integer().positive().required().messages({
      "number.base": "ID варианта должен быть числом",
      "number.positive": "ID варианта должен быть положительным",
      "any.required": "ID варианта обязателен",
    }),
  }),
};
