import "./style.css";
import SurveyForm from "@/app/survey/create/components/SurveyForm";
import ExitButton from "@/components/ui/exitButton/button";
import "@/components/ui/exitButton/button.css";

export default function Page() {
  return (
    <div className="create-survey-page">
      <div className="container">
        <div className="survey-form-container">
          <ExitButton />
          <h1 className="survey-title">Создание опроса</h1>
          <SurveyForm />
        </div>
      </div>
    </div>
  );
}
