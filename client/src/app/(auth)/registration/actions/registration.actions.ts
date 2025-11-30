import { toast } from "react-toastify";

export function chekingPasswords(passOne: string, passTwo: string): boolean {
  if (passOne !== passTwo) {
    toast.error("Пароли не совпадают");
    return false;
  }
  return true;
}
