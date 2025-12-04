"use client";
import { useState } from "react";
import QuestionInput from "./QuestionInput";
import OptionsList from "./OptionList";
import PrivacySettings from "./PollPrivacy";
import FormActions from "./FormActions";
import { useRouter } from "next/navigation";
import { createPoll } from "../actions/poll.actions";
import { ISurvey } from "@/types/poll";

export default function SurveyForm() {
  const [options, setOptions] = useState<string[]>(["", "", ""]);
  const [question, setQuestion] = useState<string>("");
  const [nameSurvey, setNameSurvey] = useState<string>("");
  const router = useRouter();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const surveyData: ISurvey = {
      name_poll: question,
      question_text: question,
      is_public: true,
      options: options
        .filter((opt) => opt.trim() !== "")
        .map((option_text) => ({ option_text })),
    };
    createPoll(surveyData);
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
