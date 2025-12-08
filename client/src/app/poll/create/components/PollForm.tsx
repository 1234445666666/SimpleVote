"use client";
import { useState } from "react";
import QuestionInput from "./QuestionInput";
import OptionsList from "./OptionList";
import PrivacySettings from "./PollPrivacy";
import FormActions from "./FormActions";
import { useRouter } from "next/navigation";
import { createPoll } from "../actions/poll.actions";
import { ISurvey } from "@/types/poll";
import { SubmitHandler, useForm } from "react-hook-form";

export default function PollForm() {
  const [options, setOptions] = useState<string[]>(["", "", ""]);

  const router = useRouter();

  const { register, handleSubmit } = useForm<ISurvey>({
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<ISurvey> = async (data) => {
    const formData = {
      ...data,
      options: options.filter((option) => option.trim() !== ""),
    };

    const result = await createPoll(formData);

    if (result.success) {
      console.log("Опрос создан:", result.data);
      router.push(`/poll/${result.data.id}`);
    }
  };

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

  return (
    <form className="survey-form" onSubmit={handleSubmit(onSubmit)}>
      <QuestionInput register={register} />
      <OptionsList
        register={register}
        options={options}
        updateOption={updateOption}
        removeOption={removeOption}
        addOption={addOption}
      />
      <PrivacySettings register={register} />
      <FormActions />
    </form>
  );
}
