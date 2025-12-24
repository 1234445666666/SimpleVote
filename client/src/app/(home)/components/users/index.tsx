import { cardCases, ICard } from "./casesCard";
import "./users.css";
export default function Users() {
  return (
    <section className="use-cases" id="use-cases">
      <div className="container">
        <div className="section-title">
          <h2>Для кого создан наш сервис</h2>
          <p>VoteEasy подходит для самых разных задач и сфер деятельности</p>
        </div>
        <div className="cases-grid">
          {cardCases.map((item: ICard) => (
            <div className="case-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
