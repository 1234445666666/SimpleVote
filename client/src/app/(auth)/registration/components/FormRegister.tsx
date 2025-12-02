"use client";
import { ToastContainer } from "react-toastify";
import ExitButton from "../../../../components/ui/exitButton/button";
import "../../../../components/ui/exitButton/button.css";
import { UseFormRegister } from "react-hook-form";
import NameField from "./NameField";
import EmailField from "./EmailField";
import PasswordField from "./PasswordField";
import PasswordRequirements from "./PasswordRequirements";
import CheckboxGroup from "./CheckboxGroup";
import FormActions from "./FormActions";
import { IForm } from "@/types/auth";

interface IFormRegisterProps {
  handleRegistration: (event: React.FormEvent<HTMLFormElement>) => void;
  handleLogin: () => void;
  register: UseFormRegister<IForm>;
  errorEmail: string | undefined;
  errorName: string | undefined;
  errorPassword: string | undefined;
  errorConfirmPassword: string | undefined;
  errorTerms: string | undefined;
}

export default function FormRegister({
  handleRegistration,
  handleLogin,
  register,
  errorName,
  errorEmail,
  errorPassword,
  errorConfirmPassword,
  errorTerms,
}: IFormRegisterProps) {
  return (
    <div className="registration-page">
      <div className="container">
        <div className="registration-container">
          <ExitButton />
          <h1 className="registration-title">Регистрация</h1>
          <p className="registration-subtitle">Создайте свой аккаунт</p>

          <form onSubmit={handleRegistration} className="registration-form">
            <div className="form-section">
              <h3 className="section-title">Данные для входа</h3>
              <NameField register={register} errorName={errorName} />

              <EmailField register={register} errorEmail={errorEmail} />

              <PasswordField
                register={register}
                errorPassword={errorPassword}
                errorConfirmPassword={errorConfirmPassword}
              />

              <PasswordRequirements />
            </div>
            <CheckboxGroup register={register} errorTerms={errorTerms} />
            <FormActions handleLogin={handleLogin} />
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
