import OptionInput from "./Options";
import { ISurvey } from "@/types/poll";
import { UseFormRegister } from "react-hook-form";

interface IOptionsList {
  options: string[];
  updateOption: (index: number, value: string) => void;
  removeOption: (index: number) => void;
  addOption: () => void;
  register: UseFormRegister<ISurvey>;
}

export default function OptionsList({
  options,
  updateOption,
  removeOption,
  addOption,
}: IOptionsList) {
  return (
    <div className="form-group">
      <label className="form-label">Варианты ответов</label>
      <div className="options-container">
        {options.map((option, index) => (
          <OptionInput
            key={index}
            index={index}
            value={option}
            updateOption={updateOption}
            removeOption={removeOption}
            canRemove={options.length > 1}
          />
        ))}
        <button type="button" onClick={addOption} className="btn-add-option">
          + Добавить вариант
        </button>
      </div>
    </div>
  );
}
