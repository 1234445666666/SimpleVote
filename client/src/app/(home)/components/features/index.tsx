import { featureCards, ICard } from "./featureCard";
import "./features.css";
export default function Features() {
  return (
    <section className="features" id="features">
      <div className="container">
        <div className="section-title">
          <h2>Почему выбирают нас</h2>
          <p>
            Все необходимое для создания и проведения голосований любой
            сложности
          </p>
        </div>
        <div className="features-grid">
          {featureCards.map((item: ICard) => (
            <div className="feature-card" key={item.title}>
              <div className="feature-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
