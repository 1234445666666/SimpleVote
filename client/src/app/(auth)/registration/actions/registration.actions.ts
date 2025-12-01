import { toast } from "react-toastify";

export function chekingPasswords(passOne: string, passTwo: string): boolean {
  if (passOne !== passTwo) {
    toast.error("Пароли не совпадают");
    return false;
  }
  return true;
}

export async function register(
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
