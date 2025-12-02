import { IForm } from "@/types/auth";
import { UseFormRegister } from "react-hook-form";

interface ICheckboxGroupProps {
  register: UseFormRegister<IForm>;
  errorTerms: string | undefined;
}
export default function CheckboxGroup({
  register,
  errorTerms,
}: ICheckboxGroupProps) {
  return (
    <div className="form-section">
      <div className="checkbox-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            className="checkbox-input"
            {...register("terms", {
              required: "Необходимо принять условия",
            })}
          />
          <span className="checkbox-custom"></span>
          <span className="checkbox-text">
            Я принимаю{" "}
            <a href="#" className="link-inline">
              условия использования
            </a>{" "}
            и{" "}
            <a href="#" className="link-inline">
              политику конфиденциальности
            </a>{" "}
            *
          </span>
        </label>
      </div>
      {errorTerms && <p className="error-message">{errorTerms}</p>}
    </div>
  );
}
