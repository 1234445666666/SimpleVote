"use client";
import "./style.css";
import React, { useRef } from "react";
import LoginForm from "./components/LoginForm.tsx";
import { toast } from "react-toastify";

export default function Page() {
  const inputNameRef = useRef<HTMLInputElement>(null);
  const inputPasswordRef = useRef<HTMLInputElement>(null);

  async function handleRegistration(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const loginValue = inputNameRef.current?.value || "";
    const password = inputPasswordRef.current?.value || "";

    const isEmail = loginValue.includes("@");

    await login(loginValue, password, isEmail);
  }

  async function login(loginValue: string, password: string, isEmail: boolean) {
    try {
      // Создаем правильное тело запроса
      const requestBody = isEmail
        ? { email: loginValue, password }
        : { name: loginValue, password };

      const response = await fetch("http://localhost:6700/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Ошибка входа");
      }
      toast.success("Вы успешно залогинились!");

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      }
    } catch (error) {
      console.error("Ошибка в логине:", error);
      toast.error("Ошибка при входе");
    }
  }

  function handleOpenPassword() {
    const passwordInput = inputPasswordRef.current;
    if (passwordInput) {
      passwordInput.type =
        passwordInput.type === "password" ? "text" : "password";
    }
  }

  return (
    <LoginForm
      handleRegistration={handleRegistration}
      handleOpenPassword={handleOpenPassword}
      inputNameRef={inputNameRef}
      inputPasswordRef={inputPasswordRef}
    />
  );
}
