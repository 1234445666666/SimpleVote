"use client";
import "./style.css";
import FormRegister from "./components/FormRegister";
import { registerFn } from "./actions/registration.actions";
import { SubmitHandler, useForm } from "react-hook-form";
import { IForm } from "@/types/auth";

export default function Page() {
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
