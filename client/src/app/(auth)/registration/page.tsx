"use client";
import "./style.css";
import React, { useRef } from "react";
import { useAuthStore } from "@/lib/store";
import FormRegister from "./components/FormRegister";
import { chekingPasswords } from "./actions/registration.actions";
import { toast } from "react-toastify";

export default function Page() {
  const inputNameRef = useRef<HTMLInputElement>(null);
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const inputPasswordRef = useRef<HTMLInputElement>(null);
  const inputConfirmPasswordRef = useRef<HTMLInputElement>(null);

  function handleRegistration(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = inputNameRef.current?.value || "";
    const email = inputEmailRef.current?.value || "";
    const password = inputPasswordRef.current?.value || "";
    const passwordConfirm = inputConfirmPasswordRef.current?.value || "";

    if (chekingPasswords(password, passwordConfirm)) {
      return;
    }

    register(name, email, password);
  }

  async function register(
    name: string,
    email: string,
    password: string
  ): Promise<void> {
    try {
      const response = await fetch("http://localhost:6700/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Ошибка регистрации");
      }
      toast.success("Регистрация прошла успешно!");

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      }
    } catch (error: unknown) {
      console.error("Ошибка регистрации:", error instanceof Error);
      toast.error("Ошибка при регистрации");
    }
  }
  function handleLogin() {
    window.location.href = "/login";
  }

  return (
    <FormRegister
      handleRegistration={handleRegistration}
      handleLogin={handleLogin}
      inputNameRef={inputNameRef}
      inputEmailRef={inputEmailRef}
      inputPasswordRef={inputPasswordRef}
      inputConfirmPasswordRef={inputConfirmPasswordRef}
    />
  );
}
