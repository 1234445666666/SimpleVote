import Image from "next/image";

interface OptionInput {
  index: number;
  value: string;
  updateOption: (index: number, value: string) => void;
  removeOption: (index: number) => void;
  canRemove: boolean;
}

export default function OptionInput({
  index,
  value,
  updateOption,
  removeOption,
  canRemove,
}: OptionInput) {
  return (
    <div className="option-input-group">
      <input
        type="text"
        value={value}
        onChange={(e) => updateOption(index, e.target.value)}
        placeholder={`Вариант ответа ${index + 1}`}
        className="form-input option-input"
        required
      />
      {canRemove && (
        <button
          onClick={() => removeOption(index)}
          className="btn-remove-option"
        >
          <Image
            width={20}
            height={20}
            className="back-icon"
            src="/cross-small-svgrepo-com (1).svg"
            alt=""
          />
        </button>
      )}
    </div>
  );
}
