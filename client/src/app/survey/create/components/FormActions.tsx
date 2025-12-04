"use client";

import { useRouter } from "next/navigation";
import createSurvey from "../actions/survey.actions";

export default function FormActions() {
  const router = useRouter();

  // function createPoll() {
  //   // Потом надо логику сюда
  //   const newPollId = 1;
  //   router.push(`/survey/${newPollId}`);
  // }

  return (
    <div className="form-actions">
      <button type="submit" className="btn btn-primary" onClick={createSurvey}>
        Создать опрос
      </button>
      <button type="button" className="btn btn-outline">
        Отмена
      </button>
    </div>
  );
}
