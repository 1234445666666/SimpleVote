"use client";
import "./style.css";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import FormRegister from "./components/FormRegister";
import { chekingPasswords, registerFn } from "./actions/registration.actions";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import { IForm } from "@/types/auth";

export default function Page() {
  // const router = useRouter();

  const { register, handleSubmit, formState } = useForm<IForm>({
    mode: "onBlur",
  });

  const errorName = formState.errors["name"]?.message;
  const errorEmail = formState.errors["email"]?.message;
  const errorPassword = formState.errors["password"]?.message;
  const errorConfirmPassword = formState.errors["confirmPassword"]?.message;
  const errorTerms = formState.errors["terms"]?.message;

  const onSubmit: SubmitHandler<IForm> = (data) => {
    const { name, email, password } = data;
    registerFn(name, email, password);
  };

  function handleLogin() {
    window.location.href = "/login";
  }

  return (
    <FormRegister
      handleRegistration={handleSubmit(onSubmit)}
      handleLogin={handleLogin}
      register={register}
      errorName={errorName}
      errorEmail={errorEmail}
      errorPassword={errorPassword}
      errorConfirmPassword={errorConfirmPassword}
      errorTerms={errorTerms}
    />
  );
}
