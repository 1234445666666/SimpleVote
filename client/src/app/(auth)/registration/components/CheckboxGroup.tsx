export default function CheckboxGroup() {
  return (
    <div className="form-section">
      <div className="checkbox-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            className="checkbox-input"
            required
            // {...register("terms", {
            //   required: "Необходимо принять условия",
            // })}
          />
          <span className="checkbox-custom"></span>
          <span className="checkbox-text">
            Я принимаю{" "}
            <a href="#" className="link-inline">
              условия использования
            </a>{" "}
            и{" "}
            <a href="#" className="link-inline">
              политику конфиденциальности
            </a>{" "}
            *
          </span>
        </label>
      </div>
    </div>
  );
}
