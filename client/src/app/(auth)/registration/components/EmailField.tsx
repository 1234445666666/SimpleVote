import { IForm } from "@/types/auth";
import { UseFormRegister } from "react-hook-form";

interface IEmailFieldProps {
  register: UseFormRegister<IForm>;
  errorEmail: string | undefined;
}
export default function EmailField({ register, errorEmail }: IEmailFieldProps) {
  return (
    <div className="form-group">
      <label className="form-label">Электронная почта</label>
      <input
        type="email"
        placeholder="Введите электронную почту"
        className="form-input"
        required
        {...register("email", {
          required: "Необходимо заполнить поле",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Некорректный адрес электронной почты",
          },
        })}
      />
      {errorEmail && <p className="error-message">{errorEmail}</p>}
    </div>
  );
}
