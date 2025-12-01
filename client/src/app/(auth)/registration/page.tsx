"use client";
import "./style.css";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import FormRegister from "./components/FormRegister";
import { chekingPasswords } from "./actions/registration.actions";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import { IForm } from "@/types/auth";

export default function Page() {
  const router = useRouter();

  const { register, handleSubmit, formState, watch } = useForm<IForm>({
    mode: "onBlur",
  });

  const errorName = formState.errors["name"]?.message;
  const errorEmail = formState.errors["email"]?.message;
  const errorPassword = formState.errors["password"]?.message;

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const onSubmit: SubmitHandler<IForm> = (data) => {
    console.log(data);
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
      password={password}
      confirmPassword={confirmPassword}
    />
  );
}
