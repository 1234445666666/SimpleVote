export default function PrivacySettings() {
  return (
    <div className="form-group">
      <label className="form-label">Настройки доступа</label>
      <div className="checkbox-group">
        <label className="checkbox-label">
          <input
            type="radio"
            name="privacy"
            value="public"
            className="checkbox-input"
            defaultChecked
          />
          <span className="checkbox-custom"></span>
          <span className="checkbox-text">Публичный опрос</span>
        </label>
        <label className="checkbox-label">
          <input
            type="radio"
            name="privacy"
            value="private"
            className="checkbox-input"
          />
          <span className="checkbox-custom"></span>
          <span className="checkbox-text">Приватный опрос</span>
        </label>
      </div>
    </div>
  );
}
