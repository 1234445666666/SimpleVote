import { ISteps, steps } from "./steps";
import "./work.css";
export default function Work() {
  return (
    <section className="how-it-works" id="how-it-works">
      <div className="container">
        <div className="section-title">
          <h2>Как это работает</h2>
          <p>Создать и провести опрос - проще простого</p>
        </div>
        <div className="steps">
          {steps.map((step: ISteps) => (
            <div className="step" key={step.id}>
              <div className="step-number">{step.id}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
