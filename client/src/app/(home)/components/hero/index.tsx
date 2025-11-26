"use client";
import { useRouter } from "next/navigation";
import "./hero.css";
import { useAuthStore } from "@/lib/store";
export default function Hero() {
  const router = useRouter();
  function createPoll() {
    router.push("/survey/create");
  }

  const authUser = useAuthStore(
    (state: { currentUser: any }) => state.currentUser
  );

  return (
    <section className="hero">
      <div className="container">
        <h1>Создавайте опросы за 60 секунд</h1>
        <p>
          Платформа для быстрых и эффективных онлайн-голосований. Собирайте
          мнения коллег, друзей или клиентов в приватных или публичных опросах.
        </p>
        <div className="hero-buttons">
          {authUser ? (
            <button
              onClick={() => router.push("/survey/create")}
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
