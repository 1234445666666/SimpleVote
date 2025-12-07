import { toast } from "react-toastify";
export async function login(email: string, password: string): Promise<void> {
  try {
    const response = await fetch("http://localhost:6700/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
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
  } catch (error: unknown) {
    console.error("Ошибка в логине:", error instanceof Error);
    toast.error("Ошибка при входе");
  }
}
