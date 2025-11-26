import "./footer.css";
export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <h3>SimpleVote</h3>
            <ul>
              <li>
                <a href="#">О нас</a>
              </li>
              <li>
                <a href="#">Блог</a>
              </li>
              <li>
                <a href="#">Вакансии</a>
              </li>
              <li>
                <a href="#">Контакты</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Продукт</h3>
            <ul>
              <li>
                <a href="#">Функции</a>
              </li>
              <li>
                <a href="#">Тарифы</a>
              </li>
              <li>
                <a href="#">Примеры</a>
              </li>
              <li>
                <a href="#">Обновления</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Поддержка</h3>
            <ul>
              <li>
                <a href="#">Помощь</a>
              </li>
              <li>
                <a href="#">Документация</a>
              </li>
              <li>
                <a href="#">API</a>
              </li>
              <li>
                <a href="#">Сообщество</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Правовая информация</h3>
            <ul>
              <li>
                <a href="#">Политика конфиденциальности</a>
              </li>
              <li>
                <a href="#">Условия использования</a>
              </li>
              <li>
                <a href="#">Cookie</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="copyright">
          <p>&copy; 2023 SimpleVote. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
