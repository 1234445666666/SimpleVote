import { ISurvey } from "@/types/poll";
import { toast } from "react-toastify";

export async function createPoll(data: ISurvey) {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Вы не авторизованы. Войдите в систему.");
      return { success: false, error: "No token" };
    }

    const backendData = {
      title: data.name_poll,
      description: data.question_text,
      options: data.options,
    };

    console.log("Отправка данных:", backendData);

    const response = await fetch("http://localhost:3000/api/polls", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(backendData),
    });

    const result = await response.json();

    if (response.ok) {
      toast.success("Опрос успешно создан!");
      return { success: true, data: result };
    } else {
      const errorMsg =
        result.error || result.message || "Ошибка при создании опроса";
      toast.error(errorMsg);
      return { success: false, error: result };
    }
  } catch (error: unknown) {
    console.error("Ошибка сети:", error);
    toast.error("Сетевая ошибка");
    return { success: false, error };
  }
}
