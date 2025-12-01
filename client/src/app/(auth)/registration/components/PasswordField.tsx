import { IForm } from "@/types/auth";
import { UseFormRegister } from "react-hook-form";

interface IPasswordFieldProps {
  register: UseFormRegister<IForm>;
  password: string;
  confirmPassword: string;
}
export default function PasswordField({
  register,
  password,
  confirmPassword,
}: IPasswordFieldProps) {
  return (
    <div className="form-row">
      <div className="form-group">
        <label className="form-label">Пароль</label>
        <input
          type="password"
          placeholder="Минимум 6 символов"
          className="form-input"
          required
          {...register("password", {
            required: "Пароль обязателен",
            minLength: {
              value: 6,
              message: "Пароль должен содержать минимум 6 символов",
            },
            pattern: {
              value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
              message:
                "Пароль должен содержать заглавную букву, цифру и спецсимвол",
            },
          })}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Подтвердите пароль</label>
        <input
          type="password"
          placeholder="Повторите пароль"
          className="form-input"
          required
          {...register("confirmPassword", {
            required: "Подтверждение пароля обязательно",
            validate: (value) => value === password || "Пароли не совпадают",
          })}
        />
      </div>
    </div>
  );
}
