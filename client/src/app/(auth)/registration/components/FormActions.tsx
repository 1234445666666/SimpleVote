interface IFormActionsProps {
  handleLogin: () => void;
}
export default function FormActions({ handleLogin }: IFormActionsProps) {
  return (
    <div className="form-actions">
      <button type="submit" className="btn btn-primary">
        Создать аккаунт
      </button>
      <button type="button" className="btn btn-outline" onClick={handleLogin}>
        Уже есть аккаунт? Войти
      </button>
    </div>
  );
}
