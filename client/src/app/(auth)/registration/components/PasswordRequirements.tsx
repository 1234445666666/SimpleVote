export default function PasswordRequirements() {
  return (
    <div className="password-requirements">
      <p className="requirements-title">Требования к паролю:</p>
      <ul className="requirements-list">
        <li>Минимум 6 символов</li>
        <li>Хотя бы одна заглавная буква</li>
        <li>Хотя бы одна цифра</li>
        <li>Хотя бы один специальный символ</li>
      </ul>
    </div>
  );
}
