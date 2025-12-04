import { ISurvey } from "@/types/poll";
import { toast } from "react-toastify";

export async function createPoll(data: ISurvey) {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Вы не авторизованы. Войдите в систему.");
      return { success: false, error: "No token" };
    }

    console.log("Создание опроса с данными:", data);

    const response = await fetch("http://localhost:6700/api/polls", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      toast.success("Опрос успешно создан!");
      return { success: true, data: result };
    } else {
      toast.error(result.message || "Ошибка при создании опроса");
      return { success: false, error: result };
    }
  } catch (error: unknown) {
    console.error("Ошибка сети:", error instanceof Error);
    toast.error("Сетевая ошибка");
    return { success: false, error };
  }
}
