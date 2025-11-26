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

// Примеры схем валидации
export const schemas = {
  register: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(2).required(),
  }),
  login: Joi.object({
    email: Joi.string().email().optional(),
    name: Joi.string().min(2).optional(),
    password: Joi.string().required(),
  }).xor("email", "name"),
  poll: Joi.object({
    name_poll: Joi.string().min(3).required(),
    is_public: Joi.boolean().default(true),
    questions: Joi.array()
      .items(
        Joi.object({
          question_text: Joi.string().min(1).required(),
          question_type: Joi.string()
            .valid("single", "multiple")
            .default("single"),
          options: Joi.array()
            .items(
              Joi.object({
                option_text: Joi.string().min(1).required(),
              })
            )
            .min(2)
            .required(),
        })
      )
      .min(1)
      .required(),
  }),
  question: Joi.object({
    poll_id: Joi.number().integer().required(),
    question_text: Joi.string().min(1).required(),
    question_type: Joi.string().valid("single", "multiple").default("single"),
  }),
  option: Joi.object({
    question_id: Joi.number().integer().required(),
    option_text: Joi.string().min(1).required(),
  }),
  vote: Joi.object({
    option_id: Joi.number().integer().required(),
    user_id: Joi.number().integer().allow(null),
  }),
};
