"use client";
import { useState } from "react";
import QuestionInput from "./QuestionInput";
import OptionsList from "./OptionList";
import PrivacySettings from "./SurveyPrivacy";
import FormActions from "./FormActions";
import { useRouter } from "next/navigation";

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

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log({ question, options });
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:6700/api/surveys", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ nameSurvey }),
      });
      if (response.ok) {
        router.push("/surveys");
      } else {
        const errorData = await response.json();
        console.error("Failed to create survey:", errorData.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
