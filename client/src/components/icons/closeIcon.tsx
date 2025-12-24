export default function CloseIcon() {
  return (
    <>
      <svg className="burger-icon" width="30" height="30" viewBox="0 0 30 30">
        <path className="burger-line top" d="M5,8 L25,8" />
        <path className="burger-line middle" d="M5,15 L25,15" />
        <path className="burger-line bottom" d="M5,22 L25,22" />
      </svg>

      <svg className="close-icon" width="30" height="30" viewBox="0 0 30 30">
        <path className="close-line line1" d="M8,8 L22,22" />
        <path className="close-line line2" d="M8,22 L22,8" />
      </svg>
    </>
  );
}
