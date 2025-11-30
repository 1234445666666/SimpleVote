"use client";
import "./style.css";
import React, { useRef } from "react";
import FormRegister from "./components/FormRegister";
import { chekingPasswords } from "./actions/registration.actions";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";

export default function Page() {
  interface IForm {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }
  const { register, handleSubmit, formState } = useForm<IForm>({
    mode: "onChange",
  });

  const errorEmail = formState.errors["email"]?.message;

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
    />
  );
}
