// // src/controllers/authController.js
// import bcrypt from "bcryptjs";
// import db from "../config/db";
// import { signToken } from "../utils/jwt";
// import { Request, Response } from "express";

// export const register = (req: Request, res: Response) => {
//   const { email, password, name } = req.body;

//   // Хешируем пароль
//   const hashed = bcrypt.hashSync(password, 10);

//   // Проверяем, есть ли пользователь
//   db.get("SELECT * FROM users WHERE email = ?", [email], (err, user) => {
//     if (err) return res.status(500).json({ error: "DB Error" });
//     if (user) return res.status(400).json({ error: "Email already exists" });

//     // Создаём пользователя
//     db.run(
//       "INSERT INTO users (email, password, name) VALUES (?, ?, ?)",
//       [email, hashed, name],
//       function (err) {
//         if (err) return res.status(500).json({ error: "DB Error" });

//         const token = signToken({ id: this.lastID });
//         res.status(201).json({
//           token,
//           user: { id: this.lastID, email, name },
//         });
//       }
//     );
//   });
// };

// export const login = (req: Request, res: Response) => {
//   const { email, password } = req.body;

//   db.get("SELECT * FROM users WHERE email = ?", [email], (err, user) => {
//     if (err) return res.status(500).json({ error: "DB Error" });
//     if (!user || !bcrypt.compareSync(password, user.password))
//       return res.status(401).json({ error: "Invalid credentials" });

//     const token = signToken({ id: user.id });
//     res.json({
//       token,
//       user: { id: user.id, email: user.email, name: user.name },
//     });
//   });
// };

// // === ПОЛУЧЕНИЕ ТЕКУЩЕГО ПОЛЬЗОВАТЕЛЯ ===
// export const getMe = (req: Request, res: Response) => {
//   // req.user — из middleware/auth.js (protect)
//   res.json({ user: req.user });
// };

import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { IJWTPayload } from "../utils/jwt";
import { signToken } from "../utils/jwt";
import db from "../config/db";

interface User {
  id: number;
  email: string;
  password: string;
  name: string;
}

export const register = (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  // Хешируем пароль
  const hashedPassword = bcrypt.hashSync(password, 10);

  db.run(
    "INSERT INTO users (email, password, name) VALUES (?, ?, ?)",
    [email, hashedPassword, name],
    function (err) {
      if (err) {
        if (err.message.includes("UNIQUE constraint failed")) {
          return res.status(400).json({ error: "Email уже используется" });
        }
        return res.status(500).json({ error: "Ошибка базы данных" });
      }

      const token = signToken({
        id: this.lastID, // ← теперь id: number
        email,
        name,
      });

      res.status(201).json({
        token,
        user: { id: this.lastID, email, name },
      });
    }
  );
};

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;

  db.get(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, user: User | undefined) => {
      // ← добавил типизацию
      if (err) return res.status(500).json({ error: "Ошибка базы данных" });

      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ error: "Неверный email или пароль" });
      }

      const token = signToken({
        id: user.id,
        email: user.email,
        name: user.name,
      });

      res.json({
        token,
        user: { id: user.id, email: user.email, name: user.name },
      });
    }
  );
};

export const getMe = (req: Request, res: Response) => {
  // Добавь типизацию для req.user в middleware auth.ts
  res.json({ user: (req as any).user }); // ← временное решение
};
