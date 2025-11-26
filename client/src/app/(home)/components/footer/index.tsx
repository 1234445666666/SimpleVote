"use client";
import "./footer.css";
import {
  footerInfoSimpleVote,
  footerInfoProduct,
  footerInfoLegal,
} from "./const.footer.info";
import Link from "next/link";
export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <h3>SimpleVote</h3>
            {footerInfoSimpleVote.map((item) => (
              <ul key={item.id}>
                <Link href={item.link}>{item.title}</Link>
              </ul>
            ))}
          </div>
          <div className="footer-column">
            <h3>Продукт</h3>
            {footerInfoProduct.map((item) => (
              <ul key={item.id}>
                <Link href={item.link}>{item.title}</Link>
              </ul>
            ))}
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
            {footerInfoLegal.map((item) => (
              <ul key={item.id}>
                <Link href={item.link}>{item.title}</Link>
              </ul>
            ))}
          </div>
        </div>
        <div className="copyright">
          <p>&copy; 2023 SimpleVote. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
