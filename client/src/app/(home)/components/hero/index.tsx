"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import "./hero.css";
import { useAuthStore } from "@/lib/store";
export default function Hero() {
  const router = useRouter();
  const { isAuthenticated, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <section className="hero">
      <div className="container">
        <h1>Создавайте опросы за 60 секунд</h1>
        <p>
          Платформа для быстрых и эффективных онлайн-голосований. Собирайте
          мнения коллег, друзей или клиентов в приватных или публичных опросах.
        </p>
        <div className="hero-buttons">
          {isAuthenticated ? (
            <button
              onClick={() => router.push("/poll/create")}
              className="btn btn-light"
            >
              Создать опрос
            </button>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="btn btn-light"
            >
              Создать опрос
            </button>
          )}
          <button className="btn btn-outline">Узнать больше</button>
        </div>
      </div>
    </section>
  );
}
