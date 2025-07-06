function LoadingSpinner({ text }) {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "300px" }}
    >
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">{text}</span>
      </div>
      <p className="ms-3 fw-bold text-primary mb-0 ">{text}</p>
    </div>
  );
}

export default LoadingSpinner;
