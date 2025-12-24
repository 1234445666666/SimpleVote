import "./header.css";
import Link from "next/link";
import { useState, useLayoutEffect } from "react";
import { useAuthStore } from "@/lib/store";
import CloseIcon from "@/components/icons/closeIcon";
import { useHeaderActions } from "./header.actions";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useLayoutEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const { login, register, goToProfile } = useHeaderActions();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <div className="container">
        <nav>
          <h1 className="logo">SimpleVote</h1>
          <div className="nav-links">
            <Link href="#features">Возможности</Link>
            <Link href="#how-it-works">Как это работает</Link>
            <Link href="#use-cases">Примеры использования</Link>
          </div>

          <div className="auth-buttons">
            {isAuthenticated ? (
              <button onClick={goToProfile} className="btn btn-profile">
                Мой аккаунт
              </button>
            ) : (
              <>
                <button onClick={login} className="btn btn-login">
                  Войти
                </button>
                <button onClick={register} className="btn btn-register">
                  Регистрация
                </button>
              </>
            )}
          </div>

          <div
            className={`burger-menu ${isMenuOpen ? "active" : ""}`}
            onClick={toggleMenu}
          >
            <CloseIcon />
          </div>
        </nav>

        <div className={`mobile-menu ${isMenuOpen ? "active" : ""}`}>
          <div className="nav-links">
            <Link href="#features" onClick={() => setIsMenuOpen(false)}>
              Возможности
            </Link>
            <Link href="#how-it-works" onClick={() => setIsMenuOpen(false)}>
              Как это работает
            </Link>
            <Link href="#use-cases" onClick={() => setIsMenuOpen(false)}>
              Примеры использования
            </Link>
          </div>
          {isAuthenticated ? (
            <div>
              <button
                className="btn btn-login"
                onClick={() => {
                  setIsMenuOpen(false);
                  router.push("/profile");
                }}
              >
                Мой аккаунт
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <button onClick={login} className="btn btn-login">
                Войти
              </button>
              <button onClick={register} className="btn btn-register">
                Регистрация
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
