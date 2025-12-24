export interface ISteps {
  id: number;
  title: string;
  description: string;
}

export const steps: ISteps[] = [
  {
    id: 1,
    title: "Зарегистрируйтесь",
    description: "Быстрая регистрация за 30 секунд",
  },
  {
    id: 2,
    title: "Создайте опрос",
    description: "Добавьте вопрос и варианты ответов",
  },
  {
    id: 3,
    title: "Настройте доступ",
    description: "Выберите приватный или публичный формат",
  },
  {
    id: 4,
    title: "Поделитесь ссылкой",
    description: "Отправьте приглашение участникам",
  },
];
