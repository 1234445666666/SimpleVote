import { ISurvey } from "@/types/poll";
import { UseFormRegister } from "react-hook-form";

interface QuestionInputProps {
  register: UseFormRegister<ISurvey>;
}

export default function QuestionInput({ register }: QuestionInputProps) {
  return (
    <div className="form-group">
      <label className="form-label">Название опроса</label>
      <input
        type="text"
        placeholder="Введите название опроса"
        className="form-input"
        required
        {...register("name_poll")}
      />
      <label htmlFor="question" className="form-label">
        Вопрос опроса
      </label>
      <input
        type="text"
        placeholder="Введите ваш вопрос..."
        className="form-input"
        required
        {...register("question_text")}
      />
    </div>
  );
}
