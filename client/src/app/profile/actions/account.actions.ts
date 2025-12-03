import { toast } from "react-toastify";

interface User {
  id: number;
  name: string;
  email: string;
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No token found");
      return null;
    }

    const response = await fetch("http://localhost:6700/api/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.error("Сессия истекла. Пожалуйста, войдите снова.");
      }
      throw new Error(data.error || "Ошибка получения данных");
    }

    return data.user;
  } catch (error: unknown) {
    console.error("Ошибка получения данных пользователя:", error);

    if (error instanceof Error && error.message.includes("Сессия истекла")) {
    } else {
      toast.error("Не удалось загрузить данные профиля");
    }

    return null;
  }
}
