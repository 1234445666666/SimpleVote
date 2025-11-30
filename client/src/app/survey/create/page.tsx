"use client";
import "./style.css";
import { useState } from "react";
import ExitButton from "@/components/ui/exitButton/button";
import "@/components/ui/exitButton/button.css";

export default function Page() {
  const [options, setOptions] = useState<string[]>(["", "", ""]); // Начинаем с 3 вариантов
  const [question, setQuestion] = useState<string>("");

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const removeOption = (index: number) => {
    if (options.length > 1) {
      // Оставляем хотя бы один вариант
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ question, options });
    // Здесь можно добавить логику сохранения опроса
  };

  return (
    <div className="create-survey-page">
      <div className="container">
        <div className="survey-form-container">
          <ExitButton />
          <h1 className="survey-title">Создание опроса</h1>
          <form className="survey-form" onSubmit={handleSubmit}>
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
            <div className="form-group">
              <label className="form-label">Варианты ответов</label>
              <div className="options-container">
                {options.map((option, index) => (
                  <div key={index} className="option-input-group">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => updateOption(index, e.target.value)}
                      placeholder={`Вариант ответа ${index + 1}`}
                      className="form-input option-input"
                      required
                    />
                    {options.length > 1 && (
                      <button
                        onClick={() => removeOption(index)}
                        className="btn-remove-option"
                      >
                        <img
                          className="back-icon"
                          src="/cross-small-svgrepo-com (1).svg"
                          alt=""
                        />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addOption}
                  className="btn-add-option"
                >
                  + Добавить вариант
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Настройки доступа</label>
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="radio"
                    name="privacy"
                    value="public"
                    className="checkbox-input"
                    defaultChecked
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-text">Публичный опрос</span>
                </label>
                <label className="checkbox-label">
                  <input
                    type="radio"
                    name="privacy"
                    value="private"
                    className="checkbox-input"
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-text">Приватный опрос</span>
                </label>
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                Создать опрос
              </button>
              <button type="button" className="btn btn-outline">
                Отмена
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
