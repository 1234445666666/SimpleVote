"use client";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import ExitButton from "../../../components/ui/exitButton/button";
import "../../../components/ui/exitButton/button.css";

// Исправьте ваш интерфейс пропсов таким образом:
interface IFormRegisterProps {
  handleRegistration: (event: React.FormEvent<HTMLFormElement>) => void;
  handleLogin: () => void;
  inputNameRef: React.RefObject<HTMLInputElement | null>;
  inputEmailRef: React.RefObject<HTMLInputElement | null>;
  inputPasswordRef: React.RefObject<HTMLInputElement | null>;
  inputConfirmPasswordRef: React.RefObject<HTMLInputElement | null>;
}

export default function FormRegister({
  handleRegistration,
  handleLogin,
  inputNameRef,
  inputEmailRef,
  inputPasswordRef,
  inputConfirmPasswordRef,
}: IFormRegisterProps) {
  const router = useRouter();
  return (
    <div className="registration-page">
      <div className="container">
        <div className="registration-container">
          <ExitButton />
          <h1 className="registration-title">Регистрация</h1>
          <p className="registration-subtitle">Создайте свой аккаунт</p>

          <form onSubmit={handleRegistration} className="registration-form">
            <div className="form-section">
              <h3 className="section-title">Данные для входа</h3>

              <div className="form-group">
                <label className="form-label">Имя пользователя </label>
                <input
                  ref={inputNameRef}
                  type="text"
                  placeholder="Придумайте логин"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="">
                  Электронная почта
                </label>
                <input
                  ref={inputEmailRef}
                  type="email"
                  placeholder="Введите электронную почту"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Пароль </label>
                  <input
                    ref={inputPasswordRef}
                    type="password"
                    placeholder="Минимум 8 символов"
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Подтвердите пароль </label>
                  <input
                    ref={inputConfirmPasswordRef}
                    type="password"
                    placeholder="Повторите пароль"
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="password-requirements">
                <p className="requirements-title">Требования к паролю:</p>
                <ul className="requirements-list">
                  <li>Минимум 8 символов</li>
                  <li>Хотя бы одна заглавная буква</li>
                  <li>Хотя бы одна цифра</li>
                  <li>Хотя бы один специальный символ</li>
                </ul>
              </div>
            </div>

            <div className="form-section">
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input type="checkbox" className="checkbox-input" required />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-text">
                    Я принимаю{" "}
                    <a href="#" className="link-inline">
                      условия использования
                    </a>{" "}
                    и{" "}
                    <a href="#" className="link-inline">
                      политику конфиденциальности
                    </a>{" "}
                    *
                  </span>
                </label>

                <label className="checkbox-label">
                  <input type="checkbox" className="checkbox-input" />
                </label>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                Создать аккаунт
              </button>
              <button
                onClick={handleLogin}
                type="button"
                className="btn btn-outline"
              >
                Уже есть аккаунт? Войти
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
