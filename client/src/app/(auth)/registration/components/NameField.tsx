import { IForm } from "@/types/auth";
import { UseFormRegister } from "react-hook-form";

interface INameFieldProps {
  register: UseFormRegister<IForm>;
  errorName: string | undefined;
}
export default function NameField({ register, errorName }: INameFieldProps) {
  return (
    <div className="form-group">
      <label className="form-label">Имя пользователя</label>
      <input
        type="text"
        placeholder="Придумайте логин"
        className="form-input"
        required
        {...register("name", {
          required: "Необходимо заполнить поле",
          minLength: {
            value: 3,
            message: "Имя пользователя должно содержать минимум 3 символа",
          },
        })}
      />
      {errorName && <p className="error-message">{errorName}</p>}
    </div>
  );
}
