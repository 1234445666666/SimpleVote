import { ISurvey } from "@/types/poll";
import { UseFormRegister } from "react-hook-form";

interface IPrivacyProps {
  register: UseFormRegister<ISurvey>;
}
export default function PrivacySettings({ register }: IPrivacyProps) {
  return (
    <div className="form-group">
      <label className="form-label">Настройки доступа</label>
      <div className="checkbox-group">
        <label className="checkbox-label">
          <input
            type="radio"
            value="public"
            className="checkbox-input"
            defaultChecked
            {...register("is_public")}
          />
          <span className="checkbox-custom"></span>
          <span className="checkbox-text">Публичный опрос</span>
        </label>
        <label className="checkbox-label">
          <input
            type="radio"
            value="private"
            className="checkbox-input"
            {...register("is_public")}
          />
          <span className="checkbox-custom"></span>
          <span className="checkbox-text">Приватный опрос</span>
        </label>
      </div>
    </div>
  );
}
