"use client";
import { useAuthStore } from "@/lib/store";
import "./cta.css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Cta() {
  const router = useRouter();
  const { isAuthenticated, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <section className="cta">
      <div className="container">
        <h2>Начните использовать VoteEasy уже сегодня</h2>
        <p>
          Присоединяйтесь к тысячам организаций, которые уже упростили процесс
          сбора мнений с помощью нашей платформы
        </p>
        {isAuthenticated ? (
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
      </div>
    </section>
  );
}
