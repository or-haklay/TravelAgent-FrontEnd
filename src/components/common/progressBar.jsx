export default function ProgressBar({ title, progress, ...rest }) {
  if (!rest.color) {
    switch (true) {
      case progress >= 80:
        rest.color = "success";
        break;
      case progress >= 50:
        rest.color = "warning";
        break;
      case progress >= 20:
        rest.color = "danger";
        break;
      default:
        rest.color = "primary";
        break;
    }
  }
  return (
    <div className="container my-3 ">
      <div className="d-flex justify-content-between align-items-center">
        <h4 onClick={rest.onClick}>{title}</h4>
        {rest.showValue ? (
          <span>{rest.value ? rest.value : progress + "%"}</span>
        ) : null}
      </div>
      <div
        className={`progress ${
          rest.negativeColor ? "bg-" + rest.negativeColor : null
        }`}
        role="progressbar"
        aria-label="Basic example"
        aria-valuenow={`${progress}`}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div
          className={`progress-bar ${
            rest.color ? "bg-" + rest.color : "bg-primary"
          }`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}
