import { useRouter } from "next/navigation";
import "./header.css";
import Link from "next/link";
import { useState, useLayoutEffect } from "react";
import { useAuthStore } from "@/lib/store";

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useLayoutEffect(() => {
    checkAuth();
  }, [checkAuth]);

  function login() {
    router.push("/login");
  }

  function register() {
    router.push("/registration");
  }

  function goToProfile() {
    router.push("/profile");
  }

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

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
            <svg
              className="burger-icon"
              width="30"
              height="30"
              viewBox="0 0 30 30"
            >
              <path className="burger-line top" d="M5,8 L25,8" />
              <path className="burger-line middle" d="M5,15 L25,15" />
              <path className="burger-line bottom" d="M5,22 L25,22" />
            </svg>

            <svg
              className="close-icon"
              width="30"
              height="30"
              viewBox="0 0 30 30"
            >
              <path className="close-line line1" d="M8,8 L22,22" />
              <path className="close-line line2" d="M8,22 L22,8" />
            </svg>
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
