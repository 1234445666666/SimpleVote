"use client";
import { useState } from "react";
import QuestionInput from "./QuestionInput";
import OptionsList from "./OptionList";
import PrivacySettings from "./SurveyPrivacy";
import FormActions from "./FormActions";

export default function SurveyForm() {
  const [options, setOptions] = useState<string[]>(["", "", ""]);
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
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ question, options });
  };

  return (
    <form className="survey-form" onSubmit={handleSubmit}>
      <QuestionInput question={question} setQuestion={setQuestion} />
      <OptionsList
        options={options}
        updateOption={updateOption}
        removeOption={removeOption}
        addOption={addOption}
      />
      <PrivacySettings />
      <FormActions />
    </form>
  );
}
