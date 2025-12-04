interface QuestionInputProps {
  question: string;
  setQuestion: (value: string) => void;
}

export default function QuestionInput({
  question,
  setQuestion,
}: QuestionInputProps) {
  return (
    <div className="form-group">
      <label htmlFor="question" className="form-label">
        Вопрос опроса
      </label>
      <input
        type="text"
        id="question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Введите ваш вопрос..."
        className="form-input"
        required
      />
    </div>
  );
}
